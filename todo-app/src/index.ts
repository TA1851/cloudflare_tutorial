import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { drizzle } from 'drizzle-orm/d1';
import { todos } from './db/schemas';
import { eq, and, sql, gte, desc } from 'drizzle-orm';
import { swaggerUI } from '@hono/swagger-ui'
import { openApiDocument } from './openapi'
import { handleDatabaseError, handleDatabaseConnectionError } from './utils/errorHandler'


/*
推奨は CloudflareBindings です。理由：
・自動生成: wrangler types コマンドで自動的に生成される
・完全性: プロジェクトの設定に基づいて正確な型が生成される
・保守性: wrangler.jsonc を変更した際に自動的に更新される
・型安全性: 完全な型チェックが提供される
・D1Database 型は以下のメソッドを提供します：
prepare(query: string)
batch(statements: D1PreparedStatement[])
exec(query: string)
dump()
*/


type Bindings = CloudflareBindings;

const app = new Hono<{ Bindings: Bindings }>();

// OpenAPIドキュメントを提供するエンドポイント
app.get('/openapi', (c) => c.json(openApiDocument));

// Swagger UI
app.get('/docs', swaggerUI({ url: '/openapi' }))

// CORSの設定
app.use("/todos/*", cors())

/*
ステータスの状態に応じて、それぞれのリストを取得する
*/

// TodoListを全件取得する
app.get("/todos", async (c) => {
  try {
    // DB接続の確認
    const db = drizzle(c.env.DB);
    if (!db) {
      const errorResponse = handleDatabaseConnectionError();
      errorResponse.endpoint = "/todos";
      return c.json(errorResponse, 500);
    }

    // クエリ実行（削除されていないもののみ）
    const result = await db.select().from(todos).where(eq(todos.isDeleted, false)).all();
    return c.json(result);
  } catch (error) {
    const errorResponse = handleDatabaseError(error, "/todos");
    return c.json(errorResponse, 500);
  }
});

// DoingListを全件取得する
app.get("/doing", async (c) => {
  try {
    // DB接続の確認
    const db = drizzle(c.env.DB);
    if (!db) {
      const errorResponse = handleDatabaseConnectionError();
      errorResponse.endpoint = "/doing";
      return c.json(errorResponse, 500);
    }

    // クエリ実行（削除されていないもののみ）
    const result = await db.select().from(todos).where(and(eq(todos.status, 'doing'), eq(todos.isDeleted, false))).all();
    return c.json(result);
  } catch (error) {
    const errorResponse = handleDatabaseError(error, "/doing");
    return c.json(errorResponse, 500);
  }
});

// DoneListを全件取得する
app.get("/done", async (c) => {
  try {
    // DB接続の確認
    const db = drizzle(c.env.DB);
    if (!db) {
      const errorResponse = handleDatabaseConnectionError();
      errorResponse.endpoint = "/done";
      return c.json(errorResponse, 500);
    }

    // クエリ実行（削除されていないもののみ）
    const result = await db.select().from(todos).where(and(eq(todos.status, 'done'), eq(todos.isDeleted, false))).all();
    return c.json(result);
  } catch (error) {
    const errorResponse = handleDatabaseError(error, "/done");
    return c.json(errorResponse, 500);
  }
});

/*
更新したTodoListを取得する
*/

// Todoアイテムを更新する（POST）
app.post("/todos/:id", async (c) => {
  try {
    // URLパラメータからIDを取得
    const id = c.req.param('id');
    
    // リクエストボディから更新データを取得
    let body;
    try {
      // リクエストボディの生データを取得してログ出力
      const rawBody = await c.req.text();
      console.log('Raw request body:', {
        body: rawBody,
        length: rawBody.length,
        timestamp: new Date().toISOString()
      });
      
      body = JSON.parse(rawBody);
    } catch (jsonError) {
      console.error('JSON parsing error:', {
        error: jsonError,
        message: jsonError instanceof Error ? jsonError.message : 'Unknown JSON error',
        timestamp: new Date().toISOString()
      });
      
      return c.json({
        error: "Invalid JSON format",
        details: jsonError instanceof Error ? jsonError.message : "Failed to parse request body as JSON. Please check your JSON syntax.",
        timestamp: new Date().toISOString(),
        endpoint: "/todos/:id"
      }, 400);
    }
    
    const { title, status, completed } = body;
    
    // パラメータの検証
    if (!id) {
      return c.json({
        error: "Missing required parameter",
        details: "Todo ID is required",
        timestamp: new Date().toISOString(),
        endpoint: "/todos/:id"
      }, 400);
    }
    
    // IDが数値であることを確認
    const todoId = parseInt(id);
    if (isNaN(todoId)) {
      return c.json({
        error: "Invalid ID format",
        details: "Todo ID must be a valid number",
        timestamp: new Date().toISOString(),
        endpoint: "/todos/:id"
      }, 400);
    }
    
    // リクエストボディの型検証
    if (title !== undefined && typeof title !== 'string') {
      return c.json({
        error: "Invalid title format",
        details: "Title must be a string",
        timestamp: new Date().toISOString(),
        endpoint: "/todos/:id"
      }, 400);
    }
    
    if (status !== undefined && !['todo', 'doing', 'done'].includes(status)) {
      return c.json({
        error: "Invalid status value",
        details: "Status must be one of: 'todo', 'doing', 'done'",
        timestamp: new Date().toISOString(),
        endpoint: "/todos/:id"
      }, 400);
    }
    
    if (completed !== undefined && typeof completed !== 'boolean') {
      return c.json({
        error: "Invalid completed format",
        details: "Completed must be a boolean",
        timestamp: new Date().toISOString(),
        endpoint: "/todos/:id"
      }, 400);
    }
    
    if (!title && status === undefined && completed === undefined) {
      return c.json({
        error: "Missing update data",
        details: "Either title or status must be provided for update",
        timestamp: new Date().toISOString(),
        endpoint: "/todos/:id"
      }, 400);
    }

    // DB接続の確認
    const db = drizzle(c.env.DB);
    if (!db) {
      const errorResponse = handleDatabaseConnectionError();
      errorResponse.endpoint = "/todos/:id";
      return c.json(errorResponse, 500);
    }
    // 更新データの構築
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (status !== undefined) updateData.status = status;
    if (completed !== undefined) updateData.completed = completed;
    // データベース更新処理
    const result = await db.update(todos)
      .set(updateData)
      .where(eq(todos.id, todoId))
      .returning();
    if (result.length === 0) {
      return c.json({
        error: "Todo not found",
        details: `Todo with ID ${id} does not exist`,
        timestamp: new Date().toISOString(),
        endpoint: "/todos/:id"
      }, 404);
    }
    return c.json({
      message: "Todo updated successfully",
      data: result[0],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    // 詳細なエラーログを出力
    console.error('Update todo error:', {
      error: error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    // エラーハンドリング
    const errorResponse = handleDatabaseError(error, "/todos/:id");
    return c.json(errorResponse, 500);
  }
});

// Todoアイテムを削除する
app.delete("/todos/:id", async (c) => {
  try {
    // URLパラメータからIDを取得
    const id = c.req.param('id');
    
    // パラメータの検証
    if (!id) {
      return c.json({
        error: "Missing required parameter",
        details: "Todo ID is required",
        timestamp: new Date().toISOString(),
        endpoint: "/todos/:id"
      }, 400);
    }
    
    // IDが数値であることを確認
    const todoId = parseInt(id);
    if (isNaN(todoId)) {
      return c.json({
        error: "Invalid ID format",
        details: "Todo ID must be a valid number",
        timestamp: new Date().toISOString(),
        endpoint: "/todos/:id"
      }, 400);
    }

    // DB接続の確認
    const db = drizzle(c.env.DB);
    if (!db) {
      const errorResponse = handleDatabaseConnectionError();
      errorResponse.endpoint = "/todos/:id";
      return c.json(errorResponse, 500);
    }
    
    // 削除前にTodoの存在確認（削除されていないもののみ）
    const existingTodo = await db.select().from(todos).where(eq(todos.id, todoId)).limit(1);
    if (existingTodo.length === 0) {
      return c.json({
        error: "Todo not found",
        details: `Todo with ID ${todoId} does not exist`,
        timestamp: new Date().toISOString(),
        endpoint: "/todos/:id"
      }, 404);
    }
    
    // 既に削除されているかチェック
    if (existingTodo[0].isDeleted) {
      return c.json({
        error: "Todo already deleted",
        details: `Todo with ID ${todoId} has already been deleted`,
        timestamp: new Date().toISOString(),
        endpoint: "/todos/:id"
      }, 400);
    }
    
    // 論理削除処理（isDeletedフラグをtrueに設定）
    const result = await db.update(todos)
      .set({ 
        isDeleted: true, 
        deletedAt: new Date() 
      })
      .where(eq(todos.id, todoId))
      .returning();
    
    return c.json({
      message: "Todo deleted successfully",
      data: result[0],
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    // 詳細なエラーログを出力
    console.error('Delete todo error:', {
      error: error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    
    // エラーハンドリング
    const errorResponse = handleDatabaseError(error, "/todos/:id");
    return c.json(errorResponse, 500);
  }
});

// 削除されたTodoアイテムを取得する
app.get("/todos/deleted", async (c) => {
  try {
    // DB接続の確認
    const db = drizzle(c.env.DB);
    if (!db) {
      const errorResponse = handleDatabaseConnectionError();
      errorResponse.endpoint = "/todos/deleted";
      return c.json(errorResponse, 500);
    }

    // 削除されたアイテムのみを取得
    const result = await db.select().from(todos).where(eq(todos.isDeleted, true)).all();
    return c.json({
      message: "Deleted todos retrieved successfully",
      data: result,
      count: result.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    const errorResponse = handleDatabaseError(error, "/todos/deleted");
    return c.json(errorResponse, 500);
  }
});

// 削除されたTodoアイテムを復元する
app.post("/todos/:id/restore", async (c) => {
  try {
    // URLパラメータからIDを取得
    const id = c.req.param('id');
    
    // パラメータの検証
    if (!id) {
      return c.json({
        error: "Missing required parameter",
        details: "Todo ID is required",
        timestamp: new Date().toISOString(),
        endpoint: "/todos/:id/restore"
      }, 400);
    }
    
    // IDが数値であることを確認
    const todoId = parseInt(id);
    if (isNaN(todoId)) {
      return c.json({
        error: "Invalid ID format",
        details: "Todo ID must be a valid number",
        timestamp: new Date().toISOString(),
        endpoint: "/todos/:id/restore"
      }, 400);
    }

    // DB接続の確認
    const db = drizzle(c.env.DB);
    if (!db) {
      const errorResponse = handleDatabaseConnectionError();
      errorResponse.endpoint = "/todos/:id/restore";
      return c.json(errorResponse, 500);
    }
    
    // 復元前にTodoの存在確認
    const existingTodo = await db.select().from(todos).where(eq(todos.id, todoId)).limit(1);
    if (existingTodo.length === 0) {
      return c.json({
        error: "Todo not found",
        details: `Todo with ID ${todoId} does not exist`,
        timestamp: new Date().toISOString(),
        endpoint: "/todos/:id/restore"
      }, 404);
    }
    
    // 既に復元されているかチェック
    if (!existingTodo[0].isDeleted) {
      return c.json({
        error: "Todo already restored",
        details: `Todo with ID ${todoId} has already been restored`,
        timestamp: new Date().toISOString(),
        endpoint: "/todos/:id/restore"
      }, 400);
    }
    
    // 復元処理（isDeletedフラグをfalseに設定、deletedAtをnullに設定）
    const result = await db.update(todos)
      .set({ 
        isDeleted: false, 
        deletedAt: null,
        updatedAt: new Date()
      })
      .where(eq(todos.id, todoId))
      .returning();
    
    return c.json({
      message: "Todo restored successfully",
      data: result[0],
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    // 詳細なエラーログを出力
    console.error('Restore todo error:', {
      error: error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    
    // エラーハンドリング
    const errorResponse = handleDatabaseError(error, "/todos/:id/restore");
    return c.json(errorResponse, 500);
  }
});

// 最近更新されたTodoアイテムを取得する
app.get("/todos/recent-updates", async (c) => {
  try {
    // DB接続の確認
    const db = drizzle(c.env.DB);
    if (!db) {
      const errorResponse = handleDatabaseConnectionError();
      errorResponse.endpoint = "/todos/recent-updates";
      return c.json(errorResponse, 500);
    }

    // クエリパラメータから取得件数を取得（デフォルト10件）
    const limit = parseInt(c.req.query('limit') || '10');
    const days = parseInt(c.req.query('days') || '7'); // デフォルト7日以内

    // 削除されていないアイテムで、指定日数以内に更新されたものを取得
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const result = await db.select().from(todos)
      .where(and(
        eq(todos.isDeleted, false),
        gte(todos.updatedAt, cutoffDate)
      ))
      .orderBy(desc(todos.updatedAt))
      .limit(limit)
      .all();

    return c.json({
      message: "Recent updated todos retrieved successfully",
      data: result,
      count: result.length,
      limit: limit,
      days: days,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    const errorResponse = handleDatabaseError(error, "/todos/recent-updates");
    return c.json(errorResponse, 500);
  }
});

// 404ページ
app.notFound((c) => {
  return c.text('Custom 404 Message', 404);
});

export default app;