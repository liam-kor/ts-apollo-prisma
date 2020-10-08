import { objectType } from '@nexus/schema'

export const User = objectType({
    name: 'User',
    definition(t) {
        t.model.id()
        t.model.email()
        t.model.password()
        t.model.nickname()
        t.model.is_admin()
        t.model.partner()
        t.model.created_at()
        t.model.updated_at()
        t.list.field('permissions', {
            type: 'Permission',
            resolve: async (_root, args, ctx) => {
                const relations = await ctx.prisma.user.findOne({where: {id: _root.id}}).userToPermissions()
                function getPermissionIdList(r:any) {
                    return {id: r.permission_id}
                }
                
                return await ctx.prisma.permission.findMany({where: {OR: relations.map(getPermissionIdList)}})
            }
        })
    }
})