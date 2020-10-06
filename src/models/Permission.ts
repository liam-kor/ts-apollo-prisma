import { objectType } from '@nexus/schema'

export const Permission = objectType({
    name: 'Permission',
    definition(t) {
        t.model.id();
        t.model.name();
        t.model.code();
    },
});