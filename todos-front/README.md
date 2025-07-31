# Todos Frontend

シンプルで美しいタスク管理アプリケーションです。

## 機能

- 📝 タスクの作成、編集、削除
- ✅ タスクの完了/未完了切り替え
- 🔍 タスクのフィルタリング（すべて、未完了、完了）
- 📊 タスク統計情報の表示
- ⚡ 高速でレスポンシブなUI

## 技術スタック

- **React 19** - 最新のReactフレームワーク
- **TypeScript** - 型安全性
- **Vite** - 高速なビルドツール
- **@tanstack/react-query** - データフェッチングとキャッシュ管理
- **React Router** - クライアントサイドルーティング

## React Query セットアップ

このプロジェクトでは @tanstack/react-query を使用してデータフェッチングを管理しています。

### セットアップ内容

1. **QueryClient の設定** (`src/main.tsx`)
   - デフォルトの設定（staleTime: 5分、gcTime: 10分）
   - ReactQueryDevtools の統合

2. **カスタムフック** (`src/hooks/useTodos.ts`)
   - `useTodos()` - タスク一覧の取得
   - `useCreateTodo()` - タスクの作成
   - `useUpdateTodo()` - タスクの更新
   - `useDeleteTodo()` - タスクの削除

### 使用方法

```typescript
import { useTodos, useCreateTodo } from '../hooks/useTodos';

function MyComponent() {
  // タスク一覧の取得
  const { data: todos, isLoading, error } = useTodos();
  
  // タスクの作成
  const createTodo = useCreateTodo();
  
  const handleAddTodo = async (title: string) => {
    await createTodo.mutateAsync({ title });
  };
  
  if (isLoading) return <div>読み込み中...</div>;
  if (error) return <div>エラー: {error.message}</div>;
  
  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}
```

### API設定

デフォルトでは `http://localhost:8787` をAPIエンドポイントとして使用しています。
`src/hooks/useTodos.ts` の `API_BASE_URL` を変更して、実際のAPIエンドポイントに合わせてください。

## 開発

### 依存関係のインストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

### ビルド

```bash
npm run build
```

### リント

```bash
npm run lint
```

## プロジェクト構造

```
src/
├── components/          # React コンポーネント
│   ├── TodoList.tsx    # メインのタスク管理コンポーネント
│   ├── Navigation.tsx  # ナビゲーション
│   └── Docs.tsx        # API ドキュメント
├── hooks/              # カスタムフック
│   └── useTodos.ts     # React Query フック
├── App.tsx             # メインアプリケーション
└── main.tsx            # エントリーポイント
```

## ライセンス

MIT
