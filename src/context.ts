import { prisma } from './db';
import { PrismaClient } from '@prisma/client';
import express from 'express';
import { verify } from 'jsonwebtoken';
import { InvalidToken } from './errors';

const JWT_SECRET = process.env.JWT_SECRET;

interface Token {
  userId: string;
}

type User = {
  id: number;
  partner_id: number;
};

export interface Context {
  request: {
    req: express.Request;
  };
  prisma: PrismaClient;
  appSecret: string;
  user: User;
}

function getUserId(request: { req: express.Request }): string {
  const Authorization = request.req.get('Authorization');
  if (Authorization) {
    try {
      const token = Authorization.replace('Bearer ', '');
      const verifiedToken = verify(token, JWT_SECRET) as Token;
      return verifiedToken && verifiedToken.userId;
    } catch (e) {
      throw new InvalidToken();
    }
  } else {
    return '';
  }
}

async function getUser(request: { req: express.Request }) {
  const user_id = getUserId(request);
  const user = await prisma.user.findOne({
    where: {
      id: Number(user_id),
    },
  });
  return user;
}

export const createContext = async (request: { req: express.Request }) => ({
  request,
  prisma,
  appSecret: JWT_SECRET,
  user: await getUser(request),
});
