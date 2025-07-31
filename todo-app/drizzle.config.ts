import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schemas.ts',
  out: './migrations',
  dialect: 'sqlite',
});