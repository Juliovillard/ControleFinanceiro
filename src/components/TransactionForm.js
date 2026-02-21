import React, { useState } from 'react';
import './TransactionForm.css';

function TransactionForm({ onAddTransaction }) {
  const [formData, setFormData] = useState({
    type: 'despesa',
    category: 'alimentação',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
  });

  const categories = {
    despesa: ['alimentação', 'transporte', 'saúde', 'educação', 'lazer', 'moradia', 'outros'],
    receita: ['salário', 'freelance', 'investimentos', 'outros'],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'type' && { category: categories[value][0] }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert('Por favor, insira um valor válido');
      return;
    }

    onAddTransaction({
      ...formData,
      amount: parseFloat(formData.amount),
    });

    setFormData({
      type: 'despesa',
      category: 'alimentação',
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="transaction-form">
      <h2>➕ Nova Transação</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tipo</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="despesa">Despesa</option>
            <option value="receita">Receita</option>
          </select>
        </div>

        <div className="form-group">
          <label>Categoria</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            {categories[formData.type].map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Descrição (opcional)</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ex: Compras no supermercado"
          />
        </div>

        <div className="form-group">
          <label>Valor</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label>Data</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Adicionar Transação
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
