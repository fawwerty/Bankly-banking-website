import { createBrowserRouter } from 'react-router-dom';
import GuestLayout from '../layouts/GuestLayout';
import AuthLayout from '../layouts/AuthLayout';
import AdminLayout from '../layouts/AdminLayout';
import TellerLayout from '../layouts/TellerLayout';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Register from '../pages/Register';
import Services from '../pages/Services';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Help from '../pages/Help';
import Security from '../pages/Security';
import Policy from '../pages/Policy';
import Accounts from '../pages/Accounts';
import ErrorBoundary from '../components/ErrorBoundary';

// Transaction pages
import Transactions from '../pages/Transactions';
import EnhancedTransfer from '../pages/EnhancedTransfer';
import Withdrawal from '../pages/Withdrawal';
import Deposit from '../pages/Deposit';

// Admin pages
import AdminDashboard from '../pages/Admin/Dashboard';
import UserManagement from '../pages/Admin/UserManagement';
import AdminAccounts from '../pages/Admin/Accounts';
import AuditLogs from '../pages/Admin/AuditLogs';
import SystemSettings from '../pages/Admin/SystemSettings';
import AdminTransactions from '../pages/Admin/Transactions';

// Teller pages
import TellerDashboard from '../pages/Teller/Dashboard';
import AccountManagement from '../pages/Teller/AccountManagement';
import TransactionProcessing from '../pages/Teller/TransactionProcessing';
import CustomerService from '../pages/Teller/CustomerService';
import DailyReports from '../pages/Teller/Reports';



const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/services', element: <Services /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/help', element: <Help /> },
      { path: '/security', element: <Security /> },
      { path: '/policy', element: <Policy /> },
    ]
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/accounts', element: <Accounts /> },
      { path: '/transactions', element: <Transactions /> },
      { path: '/transfer', element: <EnhancedTransfer /> },
      { path: '/withdraw', element: <Withdrawal /> },
      { path: '/deposit', element: <Deposit /> }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: '/admin/dashboard', element: <AdminDashboard /> },
      { path: '/admin/users', element: <UserManagement /> },
      { path: '/admin/accounts', element: <AdminAccounts /> },
      { path: '/admin/transactions', element: <AdminTransactions /> },
      { path: '/admin/audit', element: <AuditLogs /> },
      { path: '/admin/settings', element: <SystemSettings /> }
    ]
  },
  {
    path: '/teller',
    element: <TellerLayout />,
    children: [
      { path: '/teller/dashboard', element: <TellerDashboard /> },
      { path: '/teller/accounts', element: <AccountManagement /> },
      { path: '/teller/transactions', element: <TransactionProcessing /> },
      { path: '/teller/customers', element: <CustomerService /> },
      { path: '/teller/Reports', element: <DailyReports /> }
    ]
  }
]);

export default router;
