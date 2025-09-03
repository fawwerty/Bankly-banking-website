import { useState, useEffect } from 'react';

export default function Reports({ tellerId }) {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    // Simulate report data
    const mockReports = [
      {
        id: 1,
        title: 'Daily Transaction Summary',
        description: 'Summary of all transactions for the day',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        data: {
          totalTransactions: 150,
          totalAmount: 125000.00,
          averageTransaction: 833.33,
          deposits: 100,
          withdrawals: 50,
          transfers: 0
        }
      },
      {
        id: 2,
        title: 'Weekly Transaction Summary',
        description: 'Summary of all transactions for the week',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        data: {
          totalTransactions: 1050,
          totalAmount: 875000.00,
          averageTransaction: 833.33,
          deposits: 700,
          withdrawals: 350,
          transfers: 0
        }
      },
      {
        id: 3,
        title: 'Monthly Transaction Summary',
        description: 'Summary of all transactions for the month',
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        data: {
          totalTransactions: 4500,
          totalAmount: 3750000.00,
          averageTransaction: 833.33,
          deposits: 3000,
          withdrawals: 1500,
          transfers: 0
        }
      },
      {
        id: 4,
        title: 'Quarterly Transaction Summary',
        description: 'Summary of all transactions for the quarter',
        date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        data: {
          totalTransactions: 13500,
          totalAmount: 11250000.00,
          averageTransaction: 833.33,
          deposits: 9000,
          withdrawals: 4500,
          transfers: 0
        }
      },
      {
        id: 5,
        title: 'Annual Transaction Summary',
        description: 'Summary of all transactions for the year',
        date: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        data: {
          totalTransactions: 54000,
          totalAmount: 45000000.00,
          averageTransaction: 833.33,
          deposits: 36000,
          withdrawals: 18000,
          transfers: 0
        }
      }
    ];

    setReports(mockReports);
  }, []);

  const handleReportSelect = (report) => {
    setSelectedReport(report);
  };

  const handleDateRangeChange = (start, end) => {
    setDateRange({ start, end });
  };

  return (
    <div className="reports-container">
      <h2>Reports & Analytics</h2>
      
      <div className="reports-header">
        <div className="date-range-selector">
          <label>Date Range:</label>
          <input 
            type="date" 
            value={dateRange.start} 
            onChange={(e) => handleDateRangeChange(e.target.value, dateRange.end)}
          />
          <input 
            type="date" 
            value={dateRange.end} 
            onChange={(e) => handleDateRangeChange(dateRange.start, e.target.value)}
          />
        </div>
      </div>

      <div className="reports-list">
        {reports.map(report => (
          <div key={report.id} className="report-card">
            <h3>{report.title}</h3>
            <p>{report.description}</p>
            <p>Date: {report.date}</p>
            <button onClick={() => handleReportSelect(report)}>View Details</button>
          </div>
        ))}
      </div>

      {selectedReport && (
        <div className="report-details">
          <h3>{selectedReport.title}</h3>
          <p>{selectedReport.description}</p>
          <p>Date: {selectedReport.date}</p>
          <div className="report-data">
            <h4>Report Data</h4>
            <ul>
              <li>Total Transactions: {selectedReport.data.totalTransactions}</li>
              <li>Total Amount: ${selectedReport.data.totalAmount}</li>
              <li>Average Transaction: ${selectedReport.data.averageTransaction}</li>
              <li>Deposits: {selectedReport.data.deposits}</li>
              <li>Withdrawals: {selectedReport.data.withdrawals}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
