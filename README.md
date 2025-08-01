# Cloudflare Tutorial - Todo Application

Cloudflare Workersを使用したフルスタックTodoアプリケーションの学習プロジェクトです。バックエンドはHonoフレームワークとCloudflare D1データベースを使用し、フロントエンドはReact + Viteで構築されています。

## 🚀 プロジェクト概要

このプロジェクトは、Cloudflare Workersの学習を目的として作成されたTodoアプリケーションです。モダンなWeb技術スタックを使用し、実用的な機能を実装しています。

### 主な機能
- ✅ タスクの作成、編集、削除
- ✅ タスクの完了/未完了の切り替え
- ✅ 論理削除機能（削除されたタスクの復元可能）
- ✅ 削除されたタスク一覧の表示
- ✅ 統計情報の表示（完了率など）
- ✅ レスポンシブデザイン

### 技術スタック

#### バックエンド (Cloudflare Workers)
- **フレームワーク**: [Hono](https://hono.dev/) - 軽量で高速なWebフレームワーク
- **データベース**: [Cloudflare D1](https://developers.cloudflare.com/d1/) - SQLiteベースのエッジデータベース
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) - TypeScriptファーストのORM
- **デプロイ**: [Wrangler](https://developers.cloudflare.com/workers/wrangler/) - Cloudflare Workers CLI
- **API ドキュメント**: Swagger UI + OpenAPI

#### フロントエンド (React)
- **フレームワーク**: [React 19](https://react.dev/) - 最新のReact
- **ビルドツール**: [Vite](https://vitejs.dev/) - 高速な開発サーバーとビルドツール
- **状態管理**: [TanStack Query](https://tanstack.com/query) - サーバー状態管理
- **ルーティング**: [React Router](https://reactrouter.com/) - クライアントサイドルーティング
- **言語**: TypeScript

## 📁 プロジェクト構造

```
cloudflare_tutorial/
├── todo-app/                 # バックエンド (Cloudflare Workers)
│   ├── src/
│   │   ├── index.ts         # メインエントリーポイント
│   │   ├── openapi.ts       # OpenAPI仕様
│   │   ├── db/
│   │   │   ├── schemas.ts   # データベーススキーマ
│   │   │   └── dummy-data.sql
│   │   └── utils/
│   │       └── errorHandler.ts
│   ├── migrations/          # データベースマイグレーション
│   ├── drizzle.config.ts    # Drizzle設定
│   ├── wrangler.jsonc       # Wrangler設定
│   └── package.json
├── todos-front/             # フロントエンド (React)
│   ├── src/
│   │   ├── components/      # Reactコンポーネント
│   │   ├── hooks/          # カスタムフック
│   │   ├── App.tsx         # メインアプリケーション
│   │   └── main.tsx        # エントリーポイント
│   ├── vite.config.ts      # Vite設定
│   └── package.json
└── README.md
```

## 🛠️ セットアップと実行

### 前提条件
- Node.js 18以上
- npm または yarn
- Cloudflareアカウント

### 1. リポジトリのクローン
```bash
git clone https://github.com/TA1851/cloudflare_tutorial.git
cd cloudflare_tutorial
```

### 2. バックエンドのセットアップ

```bash
cd todo-app

# 依存関係のインストール
npm install

# データベースのセットアップ
npx wrangler d1 create todo-d1
# 表示されたdatabase_idをwrangler.jsoncに設定

# マイグレーションの実行
npx drizzle-kit push

# 開発サーバーの起動
npm run dev
```

### 3. フロントエンドのセットアップ

```bash
cd todos-front

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

### 4. 本番デプロイ

```bash
# バックエンドのデプロイ
cd todo-app
npm run deploy

# フロントエンドのビルド
cd todos-front
npm run build
```

## 📚 API エンドポイント

### 基本エンドポイント
- `GET /todos` - すべてのアクティブなタスクを取得
- `POST /todos` - 新しいタスクを作成
- `POST /todos/:id` - タスクを更新
- `DELETE /todos/:id` - タスクを論理削除

### 削除されたタスク関連
- `GET /todos/deleted` - 削除されたタスク一覧を取得
- `POST /todos/:id/restore` - 削除されたタスクを復元

### その他
- `GET /todos/recent-updates` - 最近更新されたタスクを取得
- `GET /docs` - Swagger UI ドキュメント
- `GET /openapi` - OpenAPI仕様

## 🗄️ データベーススキーマ

```sql
CREATE TABLE todos (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'todo',
  completed INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at INTEGER,
  is_deleted INTEGER DEFAULT 0
);
```

## 🎨 フロントエンド機能

### コンポーネント構成
- **TodoList**: メインのタスク管理コンポーネント
- **Navigation**: ナビゲーションバー
- **Docs**: APIドキュメント表示

### 主要機能
- リアルタイムなタスク管理
- 削除されたタスクの表示と復元
- 統計情報の表示
- レスポンシブデザイン
- エラーハンドリング

## 🔧 開発コマンド

### バックエンド (todo-app)
```bash
npm run dev          # 開発サーバー起動
npm run deploy       # Cloudflare Workersにデプロイ
npm run cf-typegen   # Cloudflare型定義の生成
```

### フロントエンド (todos-front)
```bash
npm run dev          # 開発サーバー起動
npm run build        # 本番ビルド
npm run preview      # ビルド結果のプレビュー
npm run lint         # ESLint実行
```

## 🌐 デプロイ

### Cloudflare Workers
```bash
cd todo-app
npm run deploy
```

### フロントエンド
フロントエンドは任意の静的ホスティングサービス（Vercel、Netlify、Cloudflare Pages等）にデプロイできます。

## 📖 学習ポイント

このプロジェクトを通じて以下の技術を学習できます：

1. **Cloudflare Workers**: エッジコンピューティング
2. **Hono**: モダンなWebフレームワーク
3. **D1 Database**: エッジデータベース
4. **Drizzle ORM**: TypeScriptファーストのORM
5. **React 19**: 最新のReact機能
6. **TanStack Query**: サーバー状態管理
7. **Vite**: 高速なビルドツール

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは学習目的で作成されています。

## 🔗 リンク

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Hono Documentation](https://hono.dev/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)# Force new deployment
