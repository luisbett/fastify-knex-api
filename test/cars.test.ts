import { execSync } from 'node:child_process'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app.js'

describe('Cars routes', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    beforeEach(() => {
        execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')
    })

    it('should be able to create a new car', async () => {
        const response = await request(app.server)
            .post('/cars')
            .send({
                make: 'Volkswagen',
                model: 'Tiguan',
                year: 2023,
                color: 'Black',
                price: 30000
            })

        expect(response.statusCode).toEqual(201)
    })

    it('should be able to list all cars', async () => {
        const createSessionResponse = await request(app.server)
            .post('/sessions')
            .send({
                email: 'luis@email.com',
                model: '123456',
            })

        const cookies = createSessionResponse.get('Set-Cookie') || []

        await request(app.server)
            .post('/cars')
            .set('Cookie', cookies)
            .send({
                make: 'Volkswagen',
                model: 'Tiguan',
                year: 2023,
                color: 'Black',
                price: 30000
            })

        const listCarsReponse = await request(app.server)
            .get('/cars')
            .set('Cookie', cookies)

        expect(listCarsReponse.body.cars).toEqual([
            expect.objectContaining({
                make: 'Volkswagen',
                model: 'Tiguan'
            })
        ])
    })

    it('should be able to get a specific car', async () => {
        const createSessionResponse = await request(app.server)
            .post('/sessions')
            .send({
                email: 'luis@email.com',
                model: '123456',
            })

        const cookies = createSessionResponse.get('Set-Cookie') || []

        await request(app.server)
            .post('/cars')
            .set('Cookie', cookies)
            .send({
                make: 'Volkswagen',
                model: 'Tiguan',
                year: 2023,
                color: 'Black',
                price: 30000
            })

        const listCarsReponse = await request(app.server)
            .get('/cars')
            .set('Cookie', cookies)

        const carId = listCarsReponse.body.cars[0].id

        const getCarResponse = await request(app.server)
            .get(`/cars/${carId}`)
            .set('Cookie', cookies)

        expect(getCarResponse.body.car).toEqual([
            expect.objectContaining({
                make: 'Volkswagen',
                model: 'Tiguan'
            })
        ])
    })
})