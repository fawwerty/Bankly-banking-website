import { useState } from 'react';

export default function AccountForm({ onSubmit, initialData = {}, isEdit = false }) {
  const [formData, setFormData] = useState({
    type: initialData.type || 'checking',
    currency: initialData.currency || 'USD',
    initialDeposit: initialData.initialDeposit || 0,
    accountHolder: initialData.accountHolder || '',
    status: initialData.status || 'active'
  });

  const accountTypes = [
    { value: 'checking', label: 'Checking Account' },
    { value: 'savings', label: 'Savings Account' },
    { value: 'business', label: 'Business Account' },
    { value: 'investment', label: 'Investment Account' }
  ];

  const currencies = [
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'GHS', label: 'Ghana Cedi (GHS)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' }
  ];

  const statuses = [
    { value: 'active', label: 'Active' },
    { value: 'frozen', label: 'Frozen' },
    { value: 'closed', label: 'Closed' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'initialDeposit' ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="account-form">
      <div className="form-group">
        <label className="form-label">Account Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="form-control"
          required
        >
          {accountTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Currency</label>
        <select
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          className="form-control"
          required
        >
          {currencies.map(currency => (
            <option key={currency.value} value={currency.value}>{currency.label}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Initial Deposit</label>
        <input
          type="number"
          name="initialDeposit"
          value={formData.initialDeposit}
          onChange={handleChange}
          className="form-control"
          min="0"
          step="0.01"
          required
        />
      </div>

      {isEdit && (
        <>
          <div className="form-group">
            <label className="form-label">Account Holder</label>
            <input
              type="text"
              name="accountHolder"
              value={formData.accountHolder}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-control"
              required
            >
              {statuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>
        </>
      )}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Update Account' : 'Create Account'}
        </button>
      </div>
    </form>
  );
}
