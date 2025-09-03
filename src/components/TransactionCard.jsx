import { formatCurrency } from '../utils/validation';
import { autoCategorize, getCategoryColor } from '../utils/transactionUtils';

export default function TransactionCard({ transaction }) {
  const category = transaction.category || autoCategorize(transaction.description, transaction.amount);
  const categoryColor = getCategoryColor(category);
  
  const getTransactionType = () => {
    if (transaction.amount > 0) return 'deposit';
    if (transaction.type === 'transfer') return 'transfer';
    return 'withdrawal';
  };

  const transactionType = getTransactionType();
  
  return (
    <tr>
      <td style={{ textAlign: 'left', padding: '12px' }}>
        {new Date(transaction.date).toLocaleDateString()}
      </td>
      <td style={{ textAlign: 'left', padding: '12px' }}>
        <span style={{
          display: 'inline-block',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          backgroundColor: categoryColor + '20',
          color: categoryColor
        }}>
          {transactionType}
        </span>
      </td>
      <td style={{ textAlign: 'left', padding: '12px' }}>
        <div style={{ fontWeight: 'bold' }}>{transaction.description}</div>
        <div style={{ fontSize: '12px', color: '#666' }}>{category}</div>
      </td>
      <td style={{ textAlign: 'left', padding: '12px' }}>
        {transaction.accountNumber || '****' + transaction.account?.slice(-4)}
      </td>
      <td style={{ textAlign: 'right', padding: '12px' }}>
        <span style={{ 
          color: transaction.amount >= 0 ? '#28a745' : '#dc3545',
          fontWeight: 'bold'
        }}>
          {transaction.amount >= 0 ? '+' : ''}{formatCurrency(transaction.amount)}
        </span>
      </td>
      <td style={{ textAlign: 'right', padding: '12px' }}>
        {formatCurrency(transaction.balanceAfter)}
      </td>
      <td style={{ textAlign: 'center', padding: '12px' }}>
        <span style={{
          display: 'inline-block',
          padding: '2px 6px',
          borderRadius: '4px',
          fontSize: '11px',
          fontWeight: 'bold',
          backgroundColor: transaction.status === 'completed' ? '#d4edda' : '#fff3cd',
          color: transaction.status === 'completed' ? '#155724' : '#856404'
        }}>
          {transaction.status}
        </span>
      </td>
    </tr>
  );
}
