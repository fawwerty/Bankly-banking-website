export default function AuditLogs() {
  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-01-15 14:30:00',
      user: 'admin@example.com',
      action: 'USER_CREATED',
      details: 'Created new user: john.doe@example.com',
      ip: '192.168.1.100'
    },
    {
      id: 2,
      timestamp: '2024-01-15 14:25:00',
      user: 'teller@example.com',
      action: 'TRANSACTION_PROCESSED',
      details: 'Processed deposit of GHS 500.00 for account ****1234',
      ip: '192.168.1.101'
    },
    {
      id: 3,
      timestamp: '2024-01-15 14:20:00',
      user: 'customer@example.com',
      action: 'LOGIN_SUCCESS',
      details: 'Successful login from new device',
      ip: '192.168.1.102'
    }
  ];

  return (
    <div>
      <h1>Audit Logs</h1>
      <p>Track all system activities and user actions</p>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Timestamp</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>User</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Details</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log) => (
              <tr key={log.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px', fontSize: '12px' }}>{log.timestamp}</td>
                <td style={{ padding: '12px' }}>{log.user}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    backgroundColor: '#e3f2fd',
                    color: '#1976d2'
                  }}>
                    {log.action}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>{log.details}</td>
                <td style={{ padding: '12px', fontSize: '12px' }}>{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
