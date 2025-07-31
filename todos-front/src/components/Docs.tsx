import React from 'react';
import './Docs.css';

const Docs: React.FC = () => {
  return (
    <div className="docs-container">
      <header className="docs-header">
        <div className="docs-header-content">
          <h1 className="docs-title">API ドキュメント</h1>
          <p className="docs-subtitle">
            Todos API ドキュメントへようこそ。サービスとの統合に必要なすべての情報がここにあります。
          </p>
        </div>
      </header>

      <main className="docs-main">
        <div className="docs-sidebar">
          <nav className="docs-nav">
            <h3 className="nav-title">クイックナビゲーション</h3>
            <ul className="nav-list">
              <li><a href="#overview" className="nav-link">概要</a></li>
              <li><a href="#authentication" className="nav-link">認証</a></li>
              <li><a href="#endpoints" className="nav-link">エンドポイント</a></li>
              <li><a href="#examples" className="nav-link">使用例</a></li>
              <li><a href="#error-codes" className="nav-link">エラーコード</a></li>
            </ul>
          </nav>
        </div>

        <div className="docs-content">
          <section id="overview" className="docs-section">
            <h2>概要</h2>
            <p>
              Todos API は、タスクアイテムを管理するためのシンプルで効率的な方法を提供します。
              モダンなWeb標準で構築され、すべてのCRUD操作に対してRESTfulエンドポイントを提供します。
              論理削除機能も含まれており、削除されたタスクの復元も可能です。
            </p>
            <div className="info-card">
              <h4>ベースURL</h4>
              <code className="code-block">http://localhost:8787</code>
            </div>
          </section>

          <section id="authentication" className="docs-section">
            <h2>認証</h2>
            <p>
              現在、APIは開発目的で認証なしで動作しています。
              すべてのエンドポイントが公開されています。
            </p>
            <div className="warning-card">
              <h4>⚠️ 開発モード</h4>
              <p>このAPIは開発モードで動作しています。本番環境では認証が必要になります。</p>
            </div>
          </section>

          <section id="endpoints" className="docs-section">
            <h2>エンドポイント</h2>
            
            <div className="endpoint-card">
              <div className="endpoint-header">
                <span className="method get">GET</span>
                <code className="endpoint-path">/todos</code>
              </div>
              <p>すべてのアクティブなタスクを取得</p>
              <div className="endpoint-details">
                <h5>レスポンス</h5>
                <pre className="code-block">
{`{
  "message": "Todos retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "買い物に行く",
      "status": "todo",
      "completed": false,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z",
      "deletedAt": null,
      "isDeleted": false
    }
  ],
  "count": 1,
  "timestamp": "2024-01-01T00:00:00Z"
}`}
                </pre>
              </div>
            </div>

            <div className="endpoint-card">
              <div className="endpoint-header">
                <span className="method post">POST</span>
                <code className="endpoint-path">/todos</code>
              </div>
              <p>新しいタスクを作成</p>
              <div className="endpoint-details">
                <h5>リクエストボディ</h5>
                <pre className="code-block">
{`{
  "title": "新しいタスク"
}`}
                </pre>
                <h5>レスポンス</h5>
                <pre className="code-block">
{`{
  "message": "Todo created successfully",
  "data": {
    "id": 1,
    "title": "新しいタスク",
    "status": "todo",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  },
  "timestamp": "2024-01-01T00:00:00Z"
}`}
                </pre>
              </div>
            </div>

            <div className="endpoint-card">
              <div className="endpoint-header">
                <span className="method post">POST</span>
                <code className="endpoint-path">/todos/:id</code>
              </div>
              <p>タスクを更新</p>
              <div className="endpoint-details">
                <h5>リクエストボディ</h5>
                <pre className="code-block">
{`{
  "title": "更新されたタスク",
  "completed": true,
  "status": "done"
}`}
                </pre>
                <h5>レスポンス</h5>
                <pre className="code-block">
{`{
  "message": "Todo updated successfully",
  "data": {
    "id": 1,
    "title": "更新されたタスク",
    "status": "done",
    "completed": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T12:00:00Z"
  },
  "timestamp": "2024-01-01T12:00:00Z"
}`}
                </pre>
              </div>
            </div>

            <div className="endpoint-card">
              <div className="endpoint-header">
                <span className="method delete">DELETE</span>
                <code className="endpoint-path">/todos/:id</code>
              </div>
              <p>タスクを論理削除（復元可能）</p>
              <div className="endpoint-details">
                <h5>レスポンス</h5>
                <pre className="code-block">
{`{
  "message": "Todo deleted successfully",
  "data": {
    "id": 1,
    "title": "削除されたタスク",
    "status": "todo",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z",
    "deletedAt": "2024-01-01T12:00:00Z",
    "isDeleted": true
  },
  "timestamp": "2024-01-01T12:00:00Z"
}`}
                </pre>
              </div>
            </div>

            <div className="endpoint-card">
              <div className="endpoint-header">
                <span className="method get">GET</span>
                <code className="endpoint-path">/todos/deleted</code>
              </div>
              <p>削除されたタスク一覧を取得</p>
              <div className="endpoint-details">
                <h5>レスポンス</h5>
                <pre className="code-block">
{`{
  "message": "Deleted todos retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "削除されたタスク",
      "status": "todo",
      "completed": false,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z",
      "deletedAt": "2024-01-01T12:00:00Z",
      "isDeleted": true
    }
  ],
  "count": 1,
  "timestamp": "2024-01-01T12:00:00Z"
}`}
                </pre>
              </div>
            </div>

            <div className="endpoint-card">
              <div className="endpoint-header">
                <span className="method post">POST</span>
                <code className="endpoint-path">/todos/:id/restore</code>
              </div>
              <p>削除されたタスクを復元</p>
              <div className="endpoint-details">
                <h5>レスポンス</h5>
                <pre className="code-block">
{`{
  "message": "Todo restored successfully",
  "data": {
    "id": 1,
    "title": "復元されたタスク",
    "status": "todo",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T12:00:00Z",
    "deletedAt": null,
    "isDeleted": false
  },
  "timestamp": "2024-01-01T12:00:00Z"
}`}
                </pre>
              </div>
            </div>

            <div className="endpoint-card">
              <div className="endpoint-header">
                <span className="method get">GET</span>
                <code className="endpoint-path">/todos/recent-updates</code>
              </div>
              <p>最近更新されたタスクを取得</p>
              <div className="endpoint-details">
                <h5>クエリパラメータ</h5>
                <ul>
                  <li><code>limit</code> - 取得件数（デフォルト: 10）</li>
                  <li><code>days</code> - 何日以内の更新を対象とするか（デフォルト: 7）</li>
                </ul>
                <h5>レスポンス</h5>
                <pre className="code-block">
{`{
  "message": "Recent todos retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "最近更新されたタスク",
      "status": "done",
      "completed": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T12:00:00Z"
    }
  ],
  "count": 1,
  "timestamp": "2024-01-01T12:00:00Z"
}`}
                </pre>
              </div>
            </div>
          </section>

          <section id="examples" className="docs-section">
            <h2>使用例</h2>
            <div className="example-card">
              <h4>JavaScript (Fetch API)</h4>
              <pre className="code-block">
{`// すべてのタスクを取得
fetch('http://localhost:8787/todos')
  .then(response => response.json())
  .then(data => console.log(data));

// 新しいタスクを作成
fetch('http://localhost:8787/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Reactを学ぶ'
  })
})
.then(response => response.json())
.then(data => console.log(data));

// タスクを更新
fetch('http://localhost:8787/todos/1', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: '更新されたタスク',
    completed: true
  })
})
.then(response => response.json())
.then(data => console.log(data));

// タスクを削除
fetch('http://localhost:8787/todos/1', {
  method: 'DELETE'
})
.then(response => response.json())
.then(data => console.log(data));

// 削除されたタスクを取得
fetch('http://localhost:8787/todos/deleted')
  .then(response => response.json())
  .then(data => console.log(data));

// タスクを復元
fetch('http://localhost:8787/todos/1/restore', {
  method: 'POST'
})
.then(response => response.json())
.then(data => console.log(data));`}
              </pre>
            </div>

            <div className="example-card">
              <h4>cURL</h4>
              <pre className="code-block">
{`# すべてのタスクを取得
curl -X GET http://localhost:8787/todos

# 新しいタスクを作成
curl -X POST http://localhost:8787/todos \\
  -H "Content-Type: application/json" \\
  -d '{"title": "Reactを学ぶ"}'

# タスクを更新
curl -X POST http://localhost:8787/todos/1 \\
  -H "Content-Type: application/json" \\
  -d '{"title": "更新されたタスク", "completed": true}'

# タスクを削除
curl -X DELETE http://localhost:8787/todos/1

# 削除されたタスクを取得
curl -X GET http://localhost:8787/todos/deleted

# タスクを復元
curl -X POST http://localhost:8787/todos/1/restore`}
              </pre>
            </div>
          </section>

          <section id="error-codes" className="docs-section">
            <h2>エラーコード</h2>
            <div className="error-table">
              <table>
                <thead>
                  <tr>
                    <th>ステータスコード</th>
                    <th>説明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>200</code></td>
                    <td>成功</td>
                  </tr>
                  <tr>
                    <td><code>201</code></td>
                    <td>作成完了</td>
                  </tr>
                  <tr>
                    <td><code>400</code></td>
                    <td>不正なリクエスト（パラメータ不足、形式エラーなど）</td>
                  </tr>
                  <tr>
                    <td><code>404</code></td>
                    <td>リソースが見つかりません</td>
                  </tr>
                  <tr>
                    <td><code>500</code></td>
                    <td>サーバー内部エラー</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Docs; 