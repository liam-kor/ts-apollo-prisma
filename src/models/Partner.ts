import { objectType } from '@nexus/schema';

export const Partner = objectType({
  name: 'Partner',
  definition(t) {
    t.model.id();
    t.model.code();
    t.model.name();
    t.model.users();
    t.model.malls();
    t.model.created_at();
    t.model.updated_at();
  },
});
