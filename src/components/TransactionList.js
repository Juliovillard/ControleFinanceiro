import React from 'react';
import './TransactionList.css';

function TransactionList({ transactions, onDelete, loading }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      alimentação: '🍔',
      transporte: '🚗',
      saúde: '🏥',
      educação: '📚',
      lazer: '🎉',
      moradia: '🏠',
      salário: '💼',
      freelance: '💻',
      investimentos: '📈',
      outros: '📌',
    };
    return emojis[category] || '💰';
  };

  if (loading) {
    return <div className="loading">Carregando transações...</div>;
  }

  return (
    <div className="transaction-list">
      <h2>📋 Transações Recentes</h2>
      {transactions.length === 0 ? (
        <div className="empty-state">
          <p>Nenhuma transação registrada</p>
          <p className="empty-hint">Comece adicionando uma receita ou despesa</p>
        </div>
      ) : (
        <div className="transactions-container">
          {transactions.map((transaction) => (
            <div key={transaction.id} className={`transaction-item ${transaction.type}`}>
              <div className="transaction-left">
                <span className="category-emoji">{getCategoryEmoji(transaction.category)}</span>
                <div className="transaction-info">
                  <div className="transaction-category">
                    {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}
                  </div>
                  {transaction.description && (
                    <div className="transaction-description">{transaction.description}</div>
                  )}
                  <div className="transaction-date">{formatDate(transaction.date)}</div>
                </div>
              </div>
              <div className="transaction-right">
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'receita' ? '+' : '-'} {formatCurrency(transaction.amount)}
                </div>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(transaction.id)}
                  title="Deletar"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TransactionList;
