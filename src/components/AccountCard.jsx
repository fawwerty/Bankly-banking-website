export default function AccountCard({ account }) {
  return (
    <div className="card" style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, color: '#333' }}>{account.type}</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{account.accountNumber}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0066cc' }}>
            {account.currency === 'GHS' ? 'GHS ' : '$'}{account.balance.toFixed(2)}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>Available Balance</div>
        </div>
      </div>
    </div>
  );
}
