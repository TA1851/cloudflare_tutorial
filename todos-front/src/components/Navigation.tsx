import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            タスク管理アプリ
          </Link>
        </div>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            ホーム
          </Link>
          <Link 
            to="/todos" 
            className={`nav-link ${location.pathname === '/todos' ? 'active' : ''}`}
          >
            タスク一覧
          </Link>
          <Link 
            to="/docs" 
            className={`nav-link ${location.pathname === '/docs' ? 'active' : ''}`}
          >
            API ドキュメント
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 