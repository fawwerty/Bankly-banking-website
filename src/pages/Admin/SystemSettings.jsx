import { useState } from 'react';
import { 
  SaveOutlined, 
  SettingOutlined, 
  SecurityScanOutlined,
  TransactionOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    systemName: 'Bankly Banking System',
    maintenanceMode: false,
    maxLoginAttempts: 5,
    sessionTimeout: 30,
    passwordMinLength: 8,
    requireEmailVerification: true,
    enableTwoFactorAuth: false,
    transactionLimit: 10000,
    dailyWithdrawalLimit: 5000,
    autoLogoutEnabled: true,
    auditLogRetention: 90,
    smsNotifications: true,
    emailNotifications: true
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const settingGroups = [
    {
      title: 'System Configuration',
      icon: <SettingOutlined />,
      settings: [
        { key: 'systemName', label: 'System Name', type: 'text', placeholder: 'Enter system name' },
        { key: 'maintenanceMode', label: 'Maintenance Mode', type: 'toggle', description: 'Enable to put system in maintenance mode' }
      ]
    },
    {
      title: 'Security Settings',
      icon: <SecurityScanOutlined />,
      settings: [
        { key: 'maxLoginAttempts', label: 'Max Login Attempts', type: 'number', min: 3, max: 10, step: 1 },
        { key: 'sessionTimeout', label: 'Session Timeout (minutes)', type: 'number', min: 5, max: 120, step: 5 },
        { key: 'passwordMinLength', label: 'Minimum Password Length', type: 'number', min: 6, max: 20, step: 1 },
        { key: 'requireEmailVerification', label: 'Require Email Verification', type: 'toggle' },
        { key: 'enableTwoFactorAuth', label: 'Enable Two-Factor Authentication', type: 'toggle' },
        { key: 'autoLogoutEnabled', label: 'Auto Logout', type: 'toggle', description: 'Automatically log out inactive users' },
        { key: 'auditLogRetention', label: 'Audit Log Retention (days)', type: 'number', min: 30, max: 365, step: 30 }
      ]
    },
    {
      title: 'Transaction Limits',
      icon: <TransactionOutlined />,
      settings: [
        { key: 'transactionLimit', label: 'Maximum Transaction Amount ($)', type: 'number', min: 100, max: 50000, step: 100 },
        { key: 'dailyWithdrawalLimit', label: 'Daily Withdrawal Limit ($)', type: 'number', min: 100, max: 10000, step: 50 }
      ]
    },
    {
      title: 'Notifications',
      icon: <ExclamationCircleOutlined />,
      settings: [
        { key: 'smsNotifications', label: 'SMS Notifications', type: 'toggle', description: 'Enable SMS alerts for transactions' },
        { key: 'emailNotifications', label: 'Email Notifications', type: 'toggle', description: 'Enable email alerts for transactions' }
      ]
    }
  ];

  const ToggleSwitch = ({ checked, onChange, disabled = false }) => (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className="toggle-slider"></span>
    </label>
  );

  return (
    <div className="system-settings-modern">
      {/* Header */}
      <div className="settings-header">
        <div className="header-content">
          <h1 className="settings-title">
            <SettingOutlined className="title-icon" />
            System Settings
          </h1>
          <p className="settings-subtitle">
            Configure system-wide settings and security policies for your banking platform
          </p>
        </div>
        
        <div className="header-actions">
          <button
            onClick={handleSave}
            className={`save-btn ${isSaving ? 'saving' : ''} ${saveStatus ? saveStatus : ''}`}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <div className="spinner"></div>
                Saving...
              </>
            ) : (
              <>
                <SaveOutlined />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status Message */}
      {saveStatus && (
        <div className={`status-message ${saveStatus}`}>
          {saveStatus === 'success' ? (
            <>
              <CheckCircleOutlined />
              Settings saved successfully!
            </>
          ) : (
            <>
              <ExclamationCircleOutlined />
              Failed to save settings. Please try again.
            </>
          )}
        </div>
      )}

      {/* Settings Grid */}
      <div className="settings-grid">
        {settingGroups.map((group) => (
          <div key={group.title} className="settings-card">
            <div className="card-header">
              <div className="card-icon">
                {group.icon}
              </div>
              <h3 className="card-title">{group.title}</h3>
            </div>
            
            <div className="card-content">
              {group.settings.map((setting) => (
                <div key={setting.key} className="setting-item">
                  <div className="setting-info">
                    <label className="setting-label">
                      {setting.label}
                      {setting.description && (
                        <span className="setting-description">{setting.description}</span>
                      )}
                    </label>
                  </div>
                  
                  <div className="setting-control">
                    {setting.type === 'toggle' ? (
                      <ToggleSwitch
                        checked={settings[setting.key]}
                        onChange={(e) => handleSettingChange(setting.key, e.target.checked)}
                      />
                    ) : (
                      <input
                        type={setting.type}
                        value={settings[setting.key]}
                        onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                        className="setting-input"
                        placeholder={setting.placeholder}
                        min={setting.min}
                        max={setting.max}
                        step={setting.step}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Save Button at Bottom */}
      <div className="settings-footer">
        <button
          onClick={handleSave}
          className={`save-btn large ${isSaving ? 'saving' : ''}`}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <div className="spinner"></div>
              Saving Changes...
            </>
          ) : (
            <>
              <SaveOutlined />
              Save All Settings
            </>
          )}
        </button>
      </div>
    </div>
  );
}
