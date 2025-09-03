import { useState } from 'react';

export default function UserManagement() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'customer',
      status: 'active',
      accounts: 2,
      lastLogin: '2024-01-15 10:30:00',
      balance: 12500.50
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'teller',
      status: 'active',
      accounts: 0,
      lastLogin: '2024-01-15 09:15:00',
      balance: 0
    },
    {
      id: 3,
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active',
      accounts: 0,
      lastLogin: '2024-01-15 08:00:00',
      balance: 0
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  return (
    <div>
      <h1>User Management</h1>
      
      {/* Filters */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px',
            border: '1px solid var(--border-color)',
            borderRadius: '4px',
            width: '300px',
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)'
          }}
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          style={{
            padding: '8px',
            border: '1px solid var(--border-color)',
            borderRadius: '4px',
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)'
          }}
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="teller">Teller</option>
          <option value="customer">Customer</option>
        </select>
      </div>

      {/* Users Table */}
      <div style={{
        backgroundColor: 'var(--surface)',
        borderRadius: '8px',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-primary)' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-primary)' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-primary)' }}>Role</th>
              <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-primary)' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-primary)' }}>Accounts</th>
              <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-primary)' }}>Balance</th>
              <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-primary)' }}>Last Login</th>
              <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-primary)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px', color: 'var(--text-primary)' }}>{user.name}</td>
                <td style={{ padding: '12px', color: 'var(--text-primary)' }}>{user.email}</td>
                <td style={{ padding: '12px' }}>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    style={{
                      padding: '4px 8px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '4px',
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <option value="admin">Admin</option>
                    <option value="teller">Teller</option>
                    <option value="customer">Customer</option>
                  </select>
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    backgroundColor: user.status === 'active' ? 'var(--success-color)' : 'var(--error-bg)',
                    color: user.status === 'active' ? 'white' : 'var(--error-text)'
                  }}>
                    {user.status}
                  </span>
                </td>
                <td style={{ padding: '12px', color: 'var(--text-primary)' }}>{user.accounts}</td>
                <td style={{ padding: '12px', color: 'var(--text-primary)' }}>GHS{user.balance.toFixed(2)}</td>
                <td style={{ padding: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>{user.lastLogin}</td>
                <td style={{ padding: '12px' }}>
                  <button
                    onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active')}
                    style={{
                      padding: '4px 8px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '4px',
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      cursor: 'pointer'
                    }}
                  >
                    {user.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
