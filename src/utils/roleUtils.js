// Role-based access control utilities

export const ROLES = {
  ADMIN: 'admin',
  TELLER: 'teller',
  CUSTOMER: 'customer'
};

// Role checking functions
export const hasRole = (user, requiredRole) => {
  if (!user || !user.role) return false;
  return user.role === requiredRole;
};

export const hasAnyRole = (user, roles) => {
  if (!user || !user.role) return false;
  return roles.includes(user.role);
};

export const isAdmin = (user) => hasRole(user, ROLES.ADMIN);
export const isTeller = (user) => hasRole(user, ROLES.TELLER);
export const isCustomer = (user) => hasRole(user, ROLES.CUSTOMER);

// Route guards
export const canAccessRoute = (user, requiredRoles) => {
  if (!requiredRoles || requiredRoles.length === 0) return true;
  return requiredRoles.some(role => hasRole(user, role));
};

// Navigation items based on roles
export const getNavigationItems = (user) => {
  const baseItems = [
    { path: '/', label: 'Home', roles: [ROLES.ADMIN, ROLES.TELLER, ROLES.CUSTOMER] },
    { path: '/dashboard', label: 'Dashboard', roles: [ROLES.ADMIN, ROLES.TELLER, ROLES.CUSTOMER] }
  ];

  const adminItems = [
    { path: '/admin/users', label: 'User Management', roles: [ROLES.ADMIN] },
    { path: '/admin/audit', label: 'Audit Logs', roles: [ROLES.ADMIN] },
    { path: '/admin/system', label: 'System Settings', roles: [ROLES.ADMIN] }
  ];

  const tellerItems = [
    { path: '/teller/accounts', label: 'Manage Accounts', roles: [ROLES.TELLER] },
    { path: '/teller/transactions', label: 'Process Transactions', roles: [ROLES.TELLER] },
    { path: '/teller/customers', label: 'Customer Service', roles: [ROLES.TELLER] }
  ];

  const customerItems = [
    { path: '/accounts', label: 'My Accounts', roles: [ROLES.CUSTOMER] },
    { path: '/transactions', label: 'Transactions', roles: [ROLES.CUSTOMER] },
    { path: '/transfer', label: 'Transfer', roles: [ROLES.CUSTOMER] }
  ];

  let items = [...baseItems];
  
  if (isAdmin(user)) items.push(...adminItems);
  if (isTeller(user)) items.push(...tellerItems);
  if (isCustomer(user)) items.push(...customerItems);

  return items;
};

// Permission-based actions
export const canPerformAction = (user, action) => {
  const permissions = {
    [ROLES.ADMIN]: ['create_account', 'delete_account', 'view_all_transactions', 'manage_users', 'view_audit_logs'],
    [ROLES.TELLER]: ['create_account', 'view_transactions', 'process_deposits', 'process_withdrawals', 'transfer_money'],
    [ROLES.CUSTOMER]: ['view_own_accounts', 'transfer_own_money', 'view_own_transactions']
  };

  return permissions[user.role]?.includes(action) || false;
};

// Route configuration
export const routeConfig = {
  public: ['/', '/login', '/register', '/about', '/contact', '/help', '/security', '/policy'],
  protected: {
    [ROLES.ADMIN]: ['/admin/*', '/dashboard', '/accounts', '/transactions'],
    [ROLES.TELLER]: ['/teller/*', '/dashboard', '/accounts', '/transactions'],
    [ROLES.CUSTOMER]: ['/dashboard', '/accounts', '/transactions', '/transfer', '/profile']
  }
};

// Navigation guards
export const NavigationGuard = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  const canAccess = allowedRoles.some(role => hasRole(user, role));
  
  return canAccess ? children : null;
};
