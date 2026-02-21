import React, { useMemo } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Chart.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

function Chart({ transactions }) {
  const chartData = useMemo(() => {
    // Dados por categoria
    const categoryData = {};

    transactions.forEach((transaction) => {
      const key = `${transaction.type}-${transaction.category}`;
      if (!categoryData[key]) {
        categoryData[key] = { category: transaction.category, type: transaction.type, total: 0 };
      }
      categoryData[key].total += transaction.amount;
    });

    const categories = Object.values(categoryData);
    const expenseCategories = categories
      .filter((c) => c.type === 'despesa')
      .map((c) => c.category);
    const expenseAmounts = categories
      .filter((c) => c.type === 'despesa')
      .map((c) => c.total);

    return {
      expenseCategories,
      expenseAmounts,
    };
  }, [transactions]);

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Despesas por Categoria',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
  };

  const pieChartData = {
    labels: chartData.expenseCategories.map(
      (cat) => cat.charAt(0).toUpperCase() + cat.slice(1)
    ),
    datasets: [
      {
        data: chartData.expenseAmounts,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  if (chartData.expenseAmounts.length === 0) {
    return (
      <div className="chart-container">
        <div className="empty-chart">
          <p>Adicione despesas para visualizar o gráfico</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <Pie data={pieChartData} options={pieChartOptions} />
    </div>
  );
}

export default Chart;
