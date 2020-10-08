import { prisma } from './db'
import { PrismaClient } from '@prisma/client'
import express from 'express'
import { verify } from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-express'

interface Token {
    userId: string;
}

export interface Context {
    request: {
        req : express.Request,
    },
    prisma: PrismaClient,
    appSecret: String,
    user_id: String
}

const APP_SECRET = 'lunasoft'

function getUserId(request : {req: express.Request}): string {
    const Authorization = request.req.get('Authorization');
    if (Authorization) {
        try {
            const token = Authorization.replace('Bearer ', '');
            const verifiedToken = verify(token, APP_SECRET) as Token;
            return verifiedToken && verifiedToken.userId;
        } catch(e) {
            throw new ApolloError('Received invalid token, please check auth token', 'INVALID_TOKEN')
        }
    } else {
        return ""
    }
}

async function getUser(request : {req: express.Request}) {
    const user_id = getUserId(request)
    console.log(user_id)
    const user = await prisma.user.findOne({
        where: {
            id: Number(user_id)
        }
    })
    return user
}

export const createContext = async (request: {req: express.Request}) => ({
    request,
    prisma,
    appSecret: 'lunasoft',
    user: await getUser(request)
})