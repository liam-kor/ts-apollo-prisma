import { prisma } from './db'
import { PrismaClient } from '@prisma/client'
import express from 'express'
import { verify } from 'jsonwebtoken';

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
        const token = Authorization.replace('Bearer ', '');
        const verifiedToken = verify(token, APP_SECRET) as Token;
        return verifiedToken && verifiedToken.userId;
    } else {
        return ''
    }
}

export const createContext = (request: {req: express.Request}): Context => ({
    request,
    prisma,
    appSecret: 'lunasoft',
    user_id: getUserId(request)
})