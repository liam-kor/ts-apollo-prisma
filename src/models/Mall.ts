import { objectType } from '@nexus/schema'

export const Mall = objectType({
    name: 'Mall',
    definition(t) {
        t.model.id();
        t.model.mall_no();
        t.model.mall_name();
        t.model.partner();
    },
});