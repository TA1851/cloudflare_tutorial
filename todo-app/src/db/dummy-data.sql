-- ダミーデータの挿入
INSERT INTO todos (title, status, created_at, updated_at) VALUES
('プロジェクトの企画書を作成する', 'todo', strftime('%s', 'now', '-7 days'), strftime('%s', 'now', '-7 days')),
('デザインモックアップを作成する', 'doing', strftime('%s', 'now', '-5 days'), strftime('%s', 'now', '-2 days')),
('データベース設計を完了する', 'done', strftime('%s', 'now', '-6 days'), strftime('%s', 'now', '-4 days')),
('API仕様書を作成する', 'todo', strftime('%s', 'now', '-3 days'), strftime('%s', 'now', '-3 days')),
('フロントエンド画面を実装する', 'doing', strftime('%s', 'now', '-4 days'), strftime('%s', 'now', '-1 days')),
('ユーザー認証機能を実装する', 'todo', strftime('%s', 'now', '-2 days'), strftime('%s', 'now', '-2 days')),
('テストケースを作成する', 'done', strftime('%s', 'now', '-8 days'), strftime('%s', 'now', '-6 days')),
('デプロイメント環境を構築する', 'todo', strftime('%s', 'now', '-1 days'), strftime('%s', 'now', '-1 days')),
('バグ修正: ログイン画面のレイアウト', 'done', strftime('%s', 'now', '-9 days'), strftime('%s', 'now', '-8 days')),
('パフォーマンス最適化を実施する', 'doing', strftime('%s', 'now', '-3 days'), strftime('%s', 'now'));