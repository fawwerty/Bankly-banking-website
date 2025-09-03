import { useState, useEffect } from 'react';

export default function Notifications({ tellerId }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    // Simulate real-time notifications
    const mockNotifications = [
      {
        id: 1,
        type: 'transaction',
        title: 'Large Transaction Alert',
        message: 'Customer withdrawal of GHS 5,000 requires manager approval',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        priority: 'high',
        read: false
      },
      {
        id: 2,
        type: 'system',
        title: 'System Maintenance',
        message: 'Scheduled maintenance tonight at 11:00 PM',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        priority: 'medium',
        read: false
      },
      {
        id: 3,
        type: 'customer',
        title: 'Customer Alert',
        message: 'Customer account flagged for suspicious activity',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        priority: 'high',
        read: false
      },
      {
        id: 4,
        type: 'compliance',
        title: 'Compliance Reminder',
        message: 'Daily compliance report due by 5:00 PM',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        priority: 'low',
        read: false
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  const handleNotificationRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const handleNotificationSelect = (notification) => {
    setSelectedNotification(notification);
    if (!notification.read) {
      handleNotificationRead(notification.id);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4d4f';
      case 'medium': return '#faad14';
      case 'low': return '#52c41a';
      default: return '#d9d9d9';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'transaction': return '💰';
      case 'system': return '⚙️';
      case 'customer': return '👤';
      case 'compliance': return '📋';
      default: return '📢';
    }
  };

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      
      <div className="notifications-header">
        <div className="unread-count">
          {unreadCount > 0 && (
            <span className="badge">{unreadCount} unread</span>
          )}
        </div>
      </div>

      <div className="notifications-list">
        {notifications.map(notification => (
          <div 
            key={notification.id} 
            className={`notification-card ${notification.read ? 'read' : 'unread'}`}
            onClick={() => handleNotificationSelect(notification)}
          >
            <div className="notification-icon">
              {getTypeIcon(notification.type)}
            </div>
            <div className="notification-content">
              <h3>{notification.title}</h3>
              <p>{notification.message}</p>
              <div className="notification-meta">
                <span className="timestamp">{notification.timestamp}</span>
                <span 
                  className="priority-badge" 
                  style={{ backgroundColor: getPriorityColor(notification.priority) }}
                >
                  {notification.priority}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedNotification && (
        <div className="notification-details">
          <h3>{selectedNotification.title}</h3>
          <p>{selectedNotification.message}</p>
          <div className="notification-meta">
            <p>Type: {selectedNotification.type}</p>
            <p>Priority: {selectedNotification.priority}</p>
            <p>Time: {selectedNotification.timestamp}</p>
          </div>
        </div>
      )}
    </div>
  );
}
