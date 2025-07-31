import React, { useState } from 'react';
import './TodoList.css';
import { useTodos, useDeletedTodos, useCreateTodo, useUpdateTodo, useDeleteTodo, useRestoreTodo } from '../hooks/useTodos';

const TodoList: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [showDeletedTodos, setShowDeletedTodos] = useState(false);

  // React Query hooks
  const { data: todos = [], isLoading, error } = useTodos();
  const { data: deletedTodos = [], isLoading: deletedTodosLoading } = useDeletedTodos();
  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();
  const restoreTodoMutation = useRestoreTodo();

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      await createTodoMutation.mutateAsync({ title: newTodo.trim() });
      setNewTodo('');
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  const handleToggleTodo = async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      await updateTodoMutation.mutateAsync({
        id,
        completed: !todo.completed
      });
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodoMutation.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const handleRestoreTodo = async (id: string) => {
    try {
      await restoreTodoMutation.mutateAsync(id);
    } catch (error) {
      console.error('Failed to restore todo:', error);
    }
  };

  const handleEditTodo = (todo: { id: string; title: string }) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  };

  const handleSaveEdit = async () => {
    console.log('handleSaveEdit called', { editingId, editingTitle });
    if (!editingId || !editingTitle.trim()) {
      console.log('Invalid edit data, canceling...');
      setEditingId(null);
      return;
    }

    try {
      console.log('Updating todo...', { id: editingId, title: editingTitle.trim() });
      await updateTodoMutation.mutateAsync({
        id: editingId,
        title: editingTitle.trim()
      });
      console.log('Todo updated successfully');
      setEditingId(null);
      setEditingTitle('');
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('Enter key pressed, saving edit...');
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      console.log('Escape key pressed, canceling edit...');
      handleCancelEdit();
    }
  };

  if (isLoading) {
    return (
      <div className="todo-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>タスクを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-container">
      <header className="todo-header">
        <h1 className="todo-title">タスク管理</h1>
        <p className="todo-subtitle">あなたのタスクを整理しましょう</p>
      </header>

      <main className="todo-main">
        {/* 新しいタスク追加フォーム */}
        <div className="add-todo-section">
          <form onSubmit={handleAddTodo} className="add-todo-form">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="新しいタスクを入力..."
              className="todo-input"
              maxLength={100}
              disabled={createTodoMutation.isPending}
            />
            <button 
              type="submit" 
              className="add-todo-btn"
              disabled={createTodoMutation.isPending}
            >
              {createTodoMutation.isPending ? '追加中...' : '追加'}
            </button>
          </form>
          
          {/* 削除されたタスクを表示するボタン */}
          <div className="deleted-todos-section">
            <button
              className="show-deleted-btn"
              onClick={() => setShowDeletedTodos(!showDeletedTodos)}
            >
              {showDeletedTodos ? '削除されたタスクを隠す' : '削除されたタスクを表示'}
              {deletedTodos.length > 0 && (
                <span className="deleted-count">({deletedTodos.length})</span>
              )}
            </button>
          </div>
        </div>

        {/* 削除されたタスク一覧 */}
        {showDeletedTodos && (
          <div className="deleted-todos-section">
            <div className="deleted-todos-header">
              <h3>削除されたタスク</h3>
              <div className="deleted-todos-header-actions">
                {deletedTodosLoading && <span className="loading-text">読み込み中...</span>}
                <button
                  className="close-deleted-btn"
                  onClick={() => setShowDeletedTodos(false)}
                  aria-label="削除されたタスク一覧を閉じる"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="deleted-todos-list">
              {deletedTodos.length === 0 ? (
                <div className="empty-deleted-state">
                  <p>削除されたタスクはありません</p>
                </div>
              ) : (
                deletedTodos.map(todo => (
                  <div key={todo.id} className="deleted-todo-item">
                    <div className="deleted-todo-content">
                      <span className="deleted-todo-title">{todo.title}</span>
                      <span className="deleted-todo-date">
                        削除日: {todo.deletedAt ? new Date(todo.deletedAt).toLocaleDateString('ja-JP') : '不明'}
                      </span>
                    </div>
                    <div className="deleted-todo-actions">
                      <button
                        className="restore-btn"
                        onClick={() => handleRestoreTodo(todo.id)}
                        aria-label="タスクを復元"
                        disabled={restoreTodoMutation.isPending}
                      >
                        ↩️
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteTodo(todo.id)}
                        aria-label="タスクを完全に削除"
                        disabled={deleteTodoMutation.isPending}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* エラー表示 */}
        {error && (
          <div className="error-message">
            <p>エラーが発生しました: {error.message}</p>
          </div>
        )}

        {/* タスクリスト */}
        <div className="todo-list">
          {todos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>タスクがありません</h3>
              <p>新しいタスクを追加してみましょう！</p>
            </div>
          ) : (
            todos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <div className="todo-content">
                  <button
                    className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
                    onClick={() => handleToggleTodo(todo.id)}
                    aria-label={todo.completed ? 'タスクを未完了にする' : 'タスクを完了にする'}
                    disabled={updateTodoMutation.isPending}
                  >
                    {todo.completed && <span className="checkmark">✓</span>}
                  </button>
                  <div className="todo-text">
                    {editingId === todo.id ? (
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onKeyDown={handleEditKeyDown}
                        onBlur={handleSaveEdit}
                        onSubmit={(e) => e.preventDefault()}
                        className="edit-todo-input"
                        autoFocus
                        maxLength={100}
                      />
                    ) : (
                      <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
                        {todo.title}
                      </span>
                    )}
                    <span className="todo-date">
                      {new Date(todo.createdAt).toLocaleDateString('ja-JP')}
                    </span>
                  </div>
                </div>
                <div className="todo-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditTodo(todo)}
                    aria-label="タスクを編集"
                    disabled={updateTodoMutation.isPending || editingId === todo.id}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteTodo(todo.id)}
                    aria-label="タスクを削除"
                    disabled={deleteTodoMutation.isPending}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 統計情報 */}
        {todos.length > 0 && (
          <div className="todo-stats">
            <div className="stat-item">
              <span className="stat-label">総タスク数:</span>
              <span className="stat-value">{todos.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">完了済み:</span>
              <span className="stat-value completed">{todos.filter(todo => todo.completed).length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">未完了:</span>
              <span className="stat-value active">{todos.filter(todo => !todo.completed).length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">完了率:</span>
              <span className="stat-value">
                {todos.length > 0 ? Math.round((todos.filter(todo => todo.completed).length / todos.length) * 100) : 0}%
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TodoList; 