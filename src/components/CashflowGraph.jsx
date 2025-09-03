import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function CashflowGraph() {
  const { user } = useAuth();
  const [cashflowData, setCashflowData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCashflowData = async () => {
      try {
        const mockData = [
          { month: 'Jan', income: 45000, expenses: 32000, net: 13000, date: '2024-01-31' },
          { month: 'Feb', income: 52000, expenses: 35000, net: 17000, date: '2024-02-29' },
          { month: 'Mar', income: 48000, expenses: 38000, net: 10000, date: '2024-03-31' },
          { month: 'Apr', income: 55000, expenses: 40000, net: 15000, date: '2024-04-30' },
          { month: 'May', income: 60000, expenses: 42000, net: 18000, date: '2024-05-31' },
          { month: 'Jun', income: 58000, expenses: 39000, net: 19000, date: '2024-06-30' },
          { month: 'Jul', income: 62000, expenses: 41000, net: 21000, date: '2024-07-31' },
          { month: 'Aug', income: 59000, expenses: 40000, net: 19000, date: '2024-08-31' },
          { month: 'Sep', income: 56000, expenses: 38000, net: 18000, date: '2024-09-30' },
          { month: 'Oct', income: 61000, expenses: 42000, net: 19000, date: '2024-10-31' },
          { month: 'Nov', income: 63000, expenses: 43000, net: 20000, date: '2024-11-30' },
          { month: 'Dec', income: 65000, expenses: 45000, net: 20000, date: '2024-12-31' },
        ];
        setCashflowData(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading cashflow data:', error);
        setLoading(false);
      }
    };

    loadCashflowData();
  }, []);

  if (loading) {
    return (
      <div className="card" style={{ marginBottom: '30px', padding: '20px' }}>
        <h3>Cashflow Overview</h3>
        <div className="text-center">
          <div
            style={{
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #3498db',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 10px'
            }}
          />
          <p>Loading cashflow data...</p>
        </div>
      </div>
    );
  }

  // Prepare data for the line chart
  const chartData = {
    labels: cashflowData.map(data => data.month),
    datasets: [
      {
        label: 'Income',
        data: cashflowData.map(data => data.income),
        borderColor: '#2ecc71',
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        borderWidth: 3,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: '#2ecc71',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
      {
        label: 'Expenses',
        data: cashflowData.map(data => data.expenses),
        borderColor: '#e74c3c',
        backgroundColor: 'rgba(231, 76, 60, 0.1)',
        borderWidth: 3,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: '#e74c3c',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
      {
        label: 'Net Cashflow',
        data: cashflowData.map(data => data.net),
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        borderWidth: 3,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: '#3498db',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { size: 12 }
        }
      },
      title: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Month (2024)',
          font: { size: 14, weight: 'bold' }
        },
        grid: { display: false }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Amount ($)',
          font: { size: 14, weight: 'bold' }
        },
        ticks: {
          callback: function (value) {
            return '$' + value.toLocaleString();
          }
        },
        grid: { color: 'rgba(0, 0, 0, 0.1)' }
      }
    },
    interaction: { mode: 'nearest', axis: 'x', intersect: false }
  };

  const totalIncome = cashflowData.reduce((sum, data) => sum + data.income, 0);
  const totalExpenses = cashflowData.reduce((sum, data) => sum + data.expenses, 0);
  const totalNet = cashflowData.reduce((sum, data) => sum + data.net, 0);

  return (
    <div className="card" style={{ marginBottom: '30px', padding: '20px' }}>
      <h3>Cashflow Overview</h3>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Monthly cashflow analysis from January to December 2024
      </p>

      <div style={{ height: '400px', position: 'relative', marginTop: '20px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginTop: '30px'
      }}>
        <div style={{ textAlign: 'center', padding: '15px', backgroundColor: 'rgba(46, 204, 113, 0.1)', borderRadius: '8px' }}>
          <h4 style={{ color: '#2ecc71', margin: '0 0 5px 0', fontSize: '18px' }}>
            ${totalIncome.toLocaleString()}
          </h4>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Total Annual Income</p>
        </div>

        <div style={{ textAlign: 'center', padding: '15px', backgroundColor: 'rgba(231, 76, 60, 0.1)', borderRadius: '8px' }}>
          <h4 style={{ color: '#e74c3c', margin: '0 0 5px 0', fontSize: '18px' }}>
            ${totalExpenses.toLocaleString()}
          </h4>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Total Annual Expenses</p>
        </div>

        <div style={{ textAlign: 'center', padding: '15px', backgroundColor: 'rgba(52, 152, 219, 0.1)', borderRadius: '8px' }}>
          <h4 style={{
            color: totalNet >= 0 ? '#3498db' : '#f39c12',
            margin: '0 0 5px 0',
            fontSize: '18px'
          }}>
            ${totalNet.toLocaleString()}
          </h4>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Annual Net Cashflow</p>
        </div>
      </div>

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
        <p>Data shown for 2024 fiscal year — Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
