import React from 'react';
import './Summary.css';

function Summary({ summary }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="summary">
      <div className="summary-card income">
        <div className="card-title">Receitas</div>
        <div className="card-amount">{formatCurrency(summary.income)}</div>
      </div>

      <div className="summary-card expense">
        <div className="card-title">Despesas</div>
        <div className="card-amount">{formatCurrency(summary.expense)}</div>
      </div>

      <div className={`summary-card balance ${summary.balance >= 0 ? 'positive' : 'negative'}`}>
        <div className="card-title">Saldo</div>
        <div className="card-amount">{formatCurrency(summary.balance)}</div>
      </div>
    </div>
  );
}

export default Summary;
