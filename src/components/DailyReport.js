import React, { useMemo, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './DailyReport.css';

function DailyReport({ transactions }) {
  const today = new Date().toISOString().split('T')[0];
  const [periodType, setPeriodType] = useState('today'); // today, month, custom
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  // Filtrar transações pelo período selecionado
  const filteredTransactions = useMemo(() => {
    let start = startDate;
    let end = endDate;

    if (periodType === 'today') {
      start = today;
      end = today;
    } else if (periodType === 'month') {
      const now = new Date();
      start = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
      end = today;
    }

    return transactions.filter(t => t.date >= start && t.date <= end);
  }, [transactions, periodType, startDate, endDate, today]);

  // Calcular totais
  const totals = useMemo(() => {
    let income = 0;
    let expense = 0;

    filteredTransactions.forEach(t => {
      if (t.type === 'receita') income += t.amount;
      else expense += t.amount;
    });

    return {
      income,
      expense,
      balance: income - expense
    };
  }, [filteredTransactions]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('pt-BR');
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

  const getReportTitle = () => {
    if (periodType === 'today') {
      return `Relatório de ${formatDate(today)}`;
    } else if (periodType === 'month') {
      const now = new Date();
      return `Relatório de ${now.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`;
    } else {
      return `Relatório de ${formatDate(startDate)} a ${formatDate(endDate)}`;
    }
  };

  const exportPDF = async () => {
    const element = document.getElementById('report-content');
    
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
      });

      const img = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(img, 'PNG', 0, 0, imgWidth, imgHeight);
      
      let fileName = 'Relatorio-Financeiro.pdf';
      if (periodType === 'today') {
        fileName = `Relatorio-${today}.pdf`;
      } else if (periodType === 'custom') {
        fileName = `Relatorio-${startDate}_ate_${endDate}.pdf`;
      }
      
      pdf.save(fileName);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF');
    }
  };

  return (
    <div className="daily-report">
      <div className="report-controls">
        <div className="period-selector">
          <label>Período:</label>
          <select value={periodType} onChange={(e) => setPeriodType(e.target.value)}>
            <option value="today">Hoje</option>
            <option value="month">Este Mês</option>
            <option value="custom">Personalizado</option>
          </select>
        </div>

        {periodType === 'custom' && (
          <div className="date-range">
            <div className="date-input">
              <label>De:</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="date-input">
              <label>Até:</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
        )}

        <button className="export-btn" onClick={exportPDF}>
          📥 Exportar PDF
        </button>
      </div>

      <div id="report-content" className="report-content">
        <div className="report-header">
          <h2>📊 {getReportTitle()}</h2>
          <p>{formatDate(startDate)} a {formatDate(endDate)}</p>
        </div>

        <div className="report-summary">
          <div className="report-card income">
            <span className="report-label">Total de Receitas</span>
            <span className="report-value">{formatCurrency(totals.income)}</span>
          </div>
          <div className="report-card expense">
            <span className="report-label">Total de Despesas</span>
            <span className="report-value">{formatCurrency(totals.expense)}</span>
          </div>
          <div className={`report-card balance ${totals.balance >= 0 ? 'positive' : 'negative'}`}>
            <span className="report-label">Saldo</span>
            <span className="report-value">{formatCurrency(totals.balance)}</span>
          </div>
        </div>

        {filteredTransactions.length > 0 ? (
          <div className="report-transactions">
            <h3>Detalhamento das Transações ({filteredTransactions.length})</h3>
            <div className="transactions-list">
              {filteredTransactions.map(t => (
                <div key={t.id} className={`transaction-row ${t.type}`}>
                  <span className="emoji">{getCategoryEmoji(t.category)}</span>
                  <div className="transaction-details">
                    <span className="category">{t.category}</span>
                    {t.description && <span className="description">{t.description}</span>}
                    <span className="date">{formatDate(t.date)}</span>
                  </div>
                  <span className={`amount ${t.type}`}>
                    {t.type === 'receita' ? '+' : '-'} {formatCurrency(t.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-report">
            <p>Nenhuma transação neste período</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DailyReport;
