import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function SecurityTools({ onSecurityAlert }) {
  const { user } = useAuth();
  const [sessionTime, setSessionTime] = useState(0);
  const [securityEvents, setSecurityEvents] = useState([]);
  const [complianceChecks, setComplianceChecks] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
  const [lockReason, setLockReason] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1);
      
      // Alert after 15 minutes
      if (sessionTime === 900) {
        onSecurityAlert({
          type: 'session_warning',
          message: 'Session will expire in 5 minutes',
          severity: 'warning'
        });
      }
      
      // Auto-lock after 20 minutes
      if (sessionTime >= 1200) {
        handleAutoLock();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionTime]);

  useEffect(() => {
    // Initialize compliance checks
    setComplianceChecks([
      {
        id: 1,
        title: 'Customer ID Verification',
        completed: true,
        required: true
      },
      {
        id: 2,
        title: 'Transaction Limits Check',
        completed: false,
        required: true
      },
      {
        id: 3,
        title: 'Audit Trail Logging',
        completed: true,
        required: true
      },
      {
        id: 4,
        title: 'Suspicious Activity Review',
        completed: false,
        required: false
      }
    ]);
  }, []);

  const handleAutoLock = () => {
    setIsLocked(true);
    setLockReason('Session timeout');
    onSecurityAlert({
      type: 'session_lock',
      message: 'Session locked due to inactivity',
      severity: 'error'
    });
  };

  const handleManualLock = () => {
    setIsLocked(true);
    setLockReason('Manual lock');
    onSecurityAlert({
      type: 'manual_lock',
      message: 'Session manually locked',
      severity: 'info'
    });
  };

  const handleUnlock = () => {
    setIsLocked(false);
    setLockReason('');
    setSessionTime(0);
    onSecurityAlert({
      type: 'unlock',
      message: 'Session unlocked',
      severity: 'success'
    });
  };

  const logSecurityEvent = (event) => {
    const securityEvent = {
      id: Date.now(),
      ...event,
      timestamp: new Date().toISOString(),
      user: user?.name
    };
    
    setSecurityEvents(prev => [securityEvent, ...prev.slice(0, 9)]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleComplianceCheck = (id) => {
    setComplianceChecks(prev => 
      prev.map(check => 
        check.id === id ? { ...check, completed: !check.completed } : check
      )
    );
  };

  if (isLocked) {
    return (
      <div className="security-lock">
        <div className="lock-screen">
          <h3>🔒 Session Locked</h3>
          <p>{lockReason}</p>
          <button onClick={handleUnlock} className="unlock-btn">
            Unlock Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="security-tools">
      <div className="security-header">
        <h3>Security & Compliance</h3>
        <div className="session-timer">
          Session Time: {formatTime(sessionTime)}
          <button onClick={handleManualLock} className="lock-btn">
            Lock Session
          </button>
        </div>
      </div>

      <div className="compliance-checks">
        <h4>Compliance Checklist</h4>
        {complianceChecks.map(check => (
          <div key={check.id} className="compliance-item">
            <label>
              <input
                type="checkbox"
                checked={check.completed}
                onChange={() => toggleComplianceCheck(check.id)}
              />
              <span className={check.required ? 'required' : ''}>
                {check.title}
                {check.required && ' *'}
              </span>
            </label>
          </div>
        ))}
      </div>

      <div className="security-events">
        <h4>Security Events</h4>
        {securityEvents.length === 0 ? (
          <p>No security events</p>
        ) : (
          securityEvents.map(event => (
            <div key={event.id} className={`security-event ${event.type}`}>
              <span className="event-time">{new Date(event.timestamp).toLocaleTimeString()}</span>
              <span className="event-message">{event.message}</span>
              <span className="event-user">{event.user}</span>
            </div>
          ))
        )}
      </div>

      <div className="security-actions">
        <button onClick={() => logSecurityEvent({
          type: 'audit',
          message: 'Manual audit log created'
        })}>
          Create Audit Log
        </button>
        <button onClick={() => logSecurityEvent({
          type: 'report',
          message: 'Suspicious activity reported'
        })}>
          Report Suspicious Activity
        </button>
      </div>
    </div>
  );
}
