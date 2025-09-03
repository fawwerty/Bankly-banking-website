import { useState, useEffect } from 'react';

export default function CashDrawer({ tellerId, onCashUpdate }) {
  const [cashDrawer, setCashDrawer] = useState({
    balance: 0,
    denominations: {
      100: 0,
      50: 0,
      20: 0,
      10: 0,
      5: 0,
      1: 0,
      0.25: 0,
      0.10: 0,
      0.05: 0,
      0.01: 0
    },
    lastUpdated: new Date().toISOString(),
    status: 'closed'
  });

  const [transactions, setTransactions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const denominations = [100, 50, 20, 10, 5, 1, 0.25, 0.10, 0.05, 0.01];

  useEffect(() => {
    calculateBalance();
  }, [cashDrawer.denominations]);

  const calculateBalance = () => {
    let total = 0;
    Object.entries(cashDrawer.denominations).forEach(([denom, count]) => {
      total += parseFloat(denom) * count;
    });
    
    setCashDrawer(prev => ({
      ...prev,
      balance: total,
      lastUpdated: new Date().toISOString()
    }));
    
    onCashUpdate && onCashUpdate({ balance: total, denominations: cashDrawer.denominations });
  };

  const updateDenomination = (denomination, count) => {
    const newCount = Math.max(0, parseInt(count) || 0);
    
    setCashDrawer(prev => ({
      ...prev,
      denominations: {
        ...prev.denominations,
        [denomination]: newCount
      }
    }));

    // Log transaction
    const change = newCount - cashDrawer.denominations[denomination];
    if (change !== 0) {
      const transaction = {
        id: Date.now(),
        type: change > 0 ? 'add' : 'remove',
        denomination,
        count: Math.abs(change),
        amount: Math.abs(change) * denomination,
        timestamp: new Date().toISOString(),
        tellerId
      };
      
      setTransactions(prev => [transaction, ...prev.slice(0, 9)]);
    }
  };

  const openDrawer = () => {
    setCashDrawer(prev => ({ ...prev, status: 'open' }));
    setAlerts(prev => [...prev, {
      id: Date.now(),
      type: 'info',
      message: 'Cash drawer opened',
      timestamp: new Date().toISOString()
    }]);
  };

  const closeDrawer = () => {
    setCashDrawer(prev => ({ ...prev, status: 'closed' }));
    setAlerts(prev => [...prev, {
      id: Date.now(),
      type: 'info',
      message: 'Cash drawer closed',
      timestamp: new Date().toISOString()
    }]);
  };

  const reconcile = () => {
    // Simulate reconciliation process
    setAlerts(prev => [...prev, {
      id: Date.now(),
      type: 'success',
      message: 'Cash drawer reconciled successfully',
      timestamp: new Date().toISOString()
    }]);
  };

  const getAlertClass = (type) => {
    switch (type) {
      case 'error': return 'alert-error';
      case 'warning': return 'alert-warning';
      case 'success': return 'alert-success';
      default: return 'alert-info';
    }
  };

  return (
    <div className="cash-drawer">
      <div className="drawer-header">
        <h3>Cash Drawer Management</h3>
        <div className="drawer-status">
          Status: <span className={`status-${cashDrawer.status}`}>{cashDrawer.status}</span>
          <button 
            onClick={cashDrawer.status === 'closed' ? openDrawer : closeDrawer}
            className={`btn-${cashDrawer.status === 'closed' ? 'success' : 'danger'}`}
          >
            {cashDrawer.status === 'closed' ? 'Open' : 'Close'} Drawer
          </button>
        </div>
      </div>

      <div className="drawer-balance">
        <h4>Current Balance: ${cashDrawer.balance.toFixed(2)}</h4>
        <p>Last Updated: {new Date(cashDrawer.lastUpdated).toLocaleString()}</p>
      </div>

      <div className="denominations-grid">
        {denominations.map(denom => (
          <div key={denom} className="denomination-item">
            <label>${denom}</label>
            <input
              type="number"
              min="0"
              value={cashDrawer.denominations[denom]}
              onChange={(e) => updateDenomination(denom, e.target.value)}
              disabled={!isEditing}
            />
            <span>= ${(denom * cashDrawer.denominations[denom]).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="drawer-actions">
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Save Count' : 'Edit Count'}
        </button>
        <button onClick={reconcile}>Reconcile</button>
        <button onClick={() => setTransactions([])}>Clear History</button>
      </div>

      <div className="transactions-history">
        <h4>Recent Transactions</h4>
        {transactions.length === 0 ? (
          <p>No recent transactions</p>
        ) : (
          transactions.map(transaction => (
            <div key={transaction.id} className="transaction-item">
              <span className={`transaction-type ${transaction.type}`}>
                {transaction.type}
              </span>
              <span>{transaction.count} x ${transaction.denomination}</span>
              <span>${transaction.amount.toFixed(2)}</span>
              <span>{new Date(transaction.timestamp).toLocaleTimeString()}</span>
            </div>
          ))
        )}
      </div>

      <div className="alerts">
        {alerts.map(alert => (
          <div key={alert.id} className={`alert ${getAlertClass(alert.type)}`}>
            {alert.message}
          </div>
        ))}
      </div>
    </div>
  );
}
