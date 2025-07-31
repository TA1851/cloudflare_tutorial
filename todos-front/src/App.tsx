import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Docs from './components/Docs';
import TodoList from './components/TodoList';
import Navigation from './components/Navigation';
import './App.css';



function Home() {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-icon">📝</div>
          <h1 className="hero-title">
            シンプルで美しい
            <span className="gradient-text">タスク管理</span>
          </h1>
          <p className="hero-subtitle">
            あなたの生産性を向上させる、直感的で使いやすいタスク管理アプリです。
            複雑な機能は不要。シンプルに、効率的に。
          </p>
          <div className="hero-buttons">
            <Link to="/todos" className="cta-button primary">
              タスク管理を始める
            </Link>
            <Link to="/docs" className="cta-button secondary">
              API ドキュメント
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card">
            <div className="card-header">
              <span className="card-title">今日のタスク</span>
              <span className="card-count">3/5 完了</span>
            </div>
            <div className="card-tasks">
              <div className="task-item completed">
                <span className="task-checkbox">✓</span>
                <span className="task-text">朝の運動</span>
              </div>
              <div className="task-item completed">
                <span className="task-checkbox">✓</span>
                <span className="task-text">メールチェック</span>
              </div>
              <div className="task-item completed">
                <span className="task-checkbox">✓</span>
                <span className="task-text">プロジェクト計画</span>
              </div>
              <div className="task-item">
                <span className="task-checkbox"></span>
                <span className="task-text">会議の準備</span>
              </div>
              <div className="task-item">
                <span className="task-checkbox"></span>
                <span className="task-text">レポート作成</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">主な機能</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">高速で軽量</h3>
            <p className="feature-description">
              React と Vite で構築された高速なアプリケーション。
              ページの読み込みも操作も瞬時に完了します。
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3 className="feature-title">美しいデザイン</h3>
            <p className="feature-description">
              モダンなUIデザインで、使いやすさと美しさを両立。
              グラデーションとガラスモーフィズム効果で洗練された見た目。
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3 className="feature-title">レスポンシブ対応</h3>
            <p className="feature-description">
              デスクトップ、タブレット、スマートフォン。
              どのデバイスでも最適な体験を提供します。
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔧</div>
            <h3 className="feature-title">API統合</h3>
            <p className="feature-description">
              RESTful API との完全な統合。
              バックエンドとの連携も簡単に実装できます。
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">レスポンシブ</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">⚡</div>
            <div className="stat-label">高速</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">🎯</div>
            <div className="stat-label">直感的</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">🔒</div>
            <div className="stat-label">安全</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">今すぐ始めましょう</h2>
          <p className="cta-subtitle">
            シンプルで効率的なタスク管理で、あなたの生産性を向上させます。
          </p>
          <div className="cta-buttons">
            <Link to="/todos" className="cta-button primary large">
              無料で始める
            </Link>
            <Link to="/docs" className="cta-button secondary large">
              詳細を見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<TodoList />} />
            <Route path="/docs" element={<Docs />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
