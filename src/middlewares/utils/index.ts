import { Context } from '../../context';
import { verify } from 'jsonwebtoken';
export const APP_SECRET = 'lunasoft';

interface Token {
    userId: string;
}

export function getUserId(context: Context): string {
    const Authorization = context.request.req.get('Authorization');
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const verifiedToken = verify(token, APP_SECRET) as Token;
        return verifiedToken && verifiedToken.userId;
    } else {
        return ''
    }
}