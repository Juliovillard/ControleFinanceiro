import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import Chart from './components/Chart';
import DailyReport from './components/DailyReport';

// URL da API - usa o mesmo hostname de onde está sendo acessado
const API_URL = `http://${window.location.hostname}:5000/api`;

function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [loading, setLoading] = useState(false);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/transactions`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
      alert('Erro ao carregar transações. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const loadSummary = async () => {
    try {
      const response = await axios.get(`${API_URL}/summary`);
      setSummary(response.data);
    } catch (error) {
      console.error('Erro ao carregar resumo:', error);
    }
  };

  const handleAddTransaction = async (transaction) => {
    try {
      await axios.post(`${API_URL}/transactions`, transaction);
      await loadTransactions();
      await loadSummary();
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      alert('Erro ao adicionar transação');
    }
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta transação?')) {
      try {
        await axios.delete(`${API_URL}/transactions/${id}`);
        await loadTransactions();
        await loadSummary();
      } catch (error) {
        console.error('Erro ao deletar transação:', error);
        alert('Erro ao deletar transação');
      }
    }
  };

  useEffect(() => {
    loadTransactions();
    loadSummary();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1><span className="title-icon">💰</span> Controle Financeiro</h1>
        <p>Julio Villard</p>
      </header>

      <div className="app-container">
        <div className="left-panel">
          <Summary summary={summary} />
          <TransactionForm onAddTransaction={handleAddTransaction} />
        </div>

        <div className="right-panel">
          <DailyReport transactions={transactions} />
          <Chart transactions={transactions} />
          <TransactionList
            transactions={transactions}
            onDelete={handleDeleteTransaction}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
