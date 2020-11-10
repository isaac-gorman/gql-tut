# Migration `20201110231747-init3`

This migration has been generated at 11/10/2020, 5:17:47 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "User.password_unique"

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201110154346-init2..20201110231747-init3
--- datamodel.dml
+++ datamodel.dml
@@ -1,8 +1,8 @@
 // 1
 datasource db {
   provider = "sqlite" 
-  url = "***"
+  url = "***"
 }
 // 2
 generator client {
@@ -14,15 +14,15 @@
   id          Int      @id @default(autoincrement())
   createdAt   DateTime @default(now())
   description String
   url         String
-  postedBy    User?   @relation(fields: [postedById], references: [id])
-  postedById Int?
+  postedBy    User?    @relation(fields: [postedById], references: [id])
+  postedById  Int?
 }
 model User {
-  id Int @id @default(autoincrement())
-  name  String 
-  email String 
-  password String @unique
-  links Link[]
-}
+  id        Int      @id @default(autoincrement())
+  name      String
+  email     String   @unique
+  password  String
+  links     Link[]
+}
```


