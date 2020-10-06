import { prisma } from './db'
import { PrismaClient } from '@prisma/client'
import express from 'express'

export interface Context {
    request: {
        req: express.Request,
    };
    prisma: PrismaClient,
    appSecret: String
}

export const createContext = (request: { req: express.Request }): Context => ({
    request,
    prisma,
    appSecret: 'lunasoft'
})