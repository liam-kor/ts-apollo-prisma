import { prisma } from './db'
import { PrismaClient } from '@prisma/client'

export interface Context {
    prisma: PrismaClient,
    appSecret: String
}

export const createContext = () => ({
    prisma,
    appSecret: 'lunasoft'
})