import type { FastifyReply, FastifyRequest } from "fastify";

export async function checkAccessToken(request: FastifyRequest, reply: FastifyReply) {
    const { accessToken } = request.cookies

    if(!accessToken) {
        return reply.status(403).send('Unauthorized.')
    }
}