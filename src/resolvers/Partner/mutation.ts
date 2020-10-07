import { inputObjectType, intArg, mutationField, stringArg } from '@nexus/schema';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export const PartnerCreateInputType = inputObjectType({
    name: 'PartnerCreateInput',
    definition(t) {
        t.string('name', {
            required: true
        });
        t.string('code');
        t.string('email', {
            required: true,
        });
        t.string('password', {
            required: true
        });
        t.string('nickname');
    }
})

export const createPartner = mutationField('createPartner', {
    type: 'Partner',
    nullable: false,
    args: {
        partner: 'PartnerCreateInput'
    },
    resolve: async (_root, { partner }, ctx) => {
        const exists = await ctx.prisma.partner.findMany({ where: { name: partner.name }})
        if (exists.length > 0) {
            throw Error("중복되는 파트너명 입니다.")
        }

        const cryptedPassword = await hash(partner.password, 10)

        const user = {
            email: partner.email,
            password: cryptedPassword,
            nickname: partner.nickname
        }
        console.log(user)
        return ctx.prisma.partner.create({
            data: {
                name: partner.name,
                code: partner.code,
                users: {
                    create: user
                }
            }
        })
    }
})