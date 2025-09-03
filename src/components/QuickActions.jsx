import { Link } from 'react-router-dom';

export default function QuickActions() {
  const actions = [
    { title: 'Transfer Money', icon: '💸', path: '/dashboard?tab=transfer' },
    { title: 'Pay Bills', icon: '📄', path: '/dashboard?tab=bills' },
    { title: 'Deposit Check', icon: '📱', path: '/dashboard?tab=deposit' },
    { title: 'View Statements', icon: '📊', path: '/dashboard?tab=statements' }
  ];

  return (
    <div style={{ marginTop: '30px' }}>
      <h3>Quick Actions</h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px',
        marginTop: '20px'
      }}>
        {actions.map((action, index) => (
      <Link 
        key={index}
        to={action.path}
        style={{
          textDecoration: 'none',
          color: 'inherit'
        }}
      >
        <div className="card" style={{ 
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0066cc' }}>
            {action.icon}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>{action.title}</div>
        </div>
      </Link>
    ))}
      </div>
    </div>
  );
}
