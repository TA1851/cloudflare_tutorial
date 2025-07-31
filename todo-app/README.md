## プロジェクトの作成
```
git clone <URL>
cd <DIR>
```

## HONO install
```
npm create hono@latest
```

## wrangler install
```
npm i -g wrangler
```

## Cloud Flareにログイン
```
wrangler login
```

## D1 データベースの作成
```
cd /
npx wrangler@latest d1 create prod-d1-tutorial
```

```wrangler.jsonc
# ターミナルに作成したデータベースの情報が出力されるので書き換える
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "prod-d1-tutorial",
      "database_id": "<unique-ID-for-your-database>"
    }
  ]
}
```

## Drizzle Install
```
npm i drizzle-orm  dotenv
npm i -D drizzle-kit tsx
```

## スキーマの作成
```
mkdir src/db
touch schemas.ts
```

## スキーマーの定義

```schemas.ts
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const todos = sqliteTable('todos', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  status: text('status', { enum: ['todo', 'doing', 'done'] }).default('todo'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
});
```

API TestはThunder Client（拡張機能を使用する）

---

