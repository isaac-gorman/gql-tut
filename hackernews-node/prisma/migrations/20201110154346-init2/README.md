# Migration `20201110154346-init2`

This migration has been generated at 11/10/2020, 9:43:46 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
)

PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "postedById" INTEGER,

    FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Link" ("id", "createdAt", "description", "url") SELECT "id", "createdAt", "description", "url" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON

CREATE UNIQUE INDEX "User.password_unique" ON "User"("password")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201110015049-init..20201110154346-init2
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
@@ -14,5 +14,15 @@
   id          Int      @id @default(autoincrement())
   createdAt   DateTime @default(now())
   description String
   url         String
+  postedBy    User?   @relation(fields: [postedById], references: [id])
+  postedById Int?
 }
+
+model User {
+  id Int @id @default(autoincrement())
+  name  String 
+  email String 
+  password String @unique
+  links Link[]
+}
```


