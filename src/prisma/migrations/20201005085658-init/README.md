# Migration `20201005085658-init`

This migration has been generated at 10/5/2020, 5:56:58 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `liam_test`.`_UserToPermission` (
`A` int  NOT NULL ,
`B` int  NOT NULL ,
UNIQUE Index `_UserToPermission_AB_unique`(`A`,
`B`),
Index `_UserToPermission_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

ALTER TABLE `liam_test`.`_UserToPermission` ADD FOREIGN KEY (`A`) REFERENCES `liam_test`.`permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `liam_test`.`_UserToPermission` ADD FOREIGN KEY (`B`) REFERENCES `liam_test`.`user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

DROP TABLE `liam_test`.`_migration`

ALTER TABLE `liam_test`.`permissions` RENAME INDEX `code_UNIQUE` TO `permissions.code_unique`

ALTER TABLE `liam_test`.`user` RENAME INDEX `email_UNIQUE` TO `user.email_unique`
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201005085658-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,47 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "mysql"
+  url = "***"
+}
+
+model Post {
+  id        Int     @id @default(autoincrement())
+  title     String
+  body      String
+  published Boolean
+
+  @@map(name: "post")
+}
+
+model User {
+  id                 Int                  @id @default(autoincrement())
+  email              String               @unique
+  password           String
+  nickname           String?
+  permissions        Permission[]         @relation("UserToPermission")
+
+  @@map(name: "user")
+}
+
+model Permission {
+  id                 Int                  @id @default(autoincrement())
+  name               String
+  code               String               @unique
+  users              User[]               @relation("UserToPermission")
+
+  @@map(name: "permissions")
+}
+
+model UserToPermission {
+  user_id       Int
+  permission_id Int
+  created_at    DateTime?
+  Permission    Permission  @relation(fields: [permission_id], references: [id])
+  User          User        @relation(fields: [user_id], references: [id])
+
+  @@map(name: "_usertopermission")
+  @@id([user_id, permission_id])
+}
```


