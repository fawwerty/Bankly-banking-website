import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define user roles
  const ROLES = {
    ADMIN: 'admin',
    TELLER: 'teller',
    CUSTOMER: 'customer'
  };

  // Role checking utilities
  const hasRole = (requiredRole) => {
    if (!user || !user.role) return false;
    return user.role === requiredRole;
  };

  const hasAnyRole = (roles) => {
    if (!user || !user.role) return false;
    return roles.includes(user.role);
  };

  const isAdmin = () => hasRole(ROLES.ADMIN);
  const isTeller = () => hasRole(ROLES.TELLER);
  const isCustomer = () => hasRole(ROLES.CUSTOMER);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call with role-based response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data with roles
      const mockUsers = {
        'admin@bank.com': {
          id: 1,
          email,
          name: 'Admin User',
          role: ROLES.ADMIN,
          permissions: ['all']
        },
        'teller@bank.com': {
          id: 2,
          email,
          name: 'Teller User',
          role: ROLES.TELLER,
          permissions: ['accounts', 'transactions']
        },
        'customer@bank.com': {
          id: 3,
          email,
          name: 'Customer User',
          role: ROLES.CUSTOMER,
          permissions: ['own_accounts', 'own_transactions']
        }
      };

      const mockUser = mockUsers[email] || {
        id: 4,
        email,
        name: 'Demo Customer',
        role: ROLES.CUSTOMER,
        permissions: ['own_accounts', 'own_transactions']
      };

      // Add additional user data
      const enhancedUser = {
        ...mockUser,
        accountNumber: '****1234',
        balance: 12500.50,
        accounts: [
          {
            id: 1,
            type: 'checking',
            balance: 5234.56,
            accountNumber: '****1234',
            currency: 'USD'
          },
          {
            id: 2,
            type: 'savings',
            balance: 7250.94,
            accountNumber: '****5678',
            currency: 'USD'
          }
        ]
      };

      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(enhancedUser));
      setUser(enhancedUser);
      
      return { success: true, user: enhancedUser };
    } catch (error) {
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const register = async (userData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Date.now(),
        ...userData,
        role: ROLES.CUSTOMER,
        permissions: ['own_accounts', 'own_transactions'],
        accountNumber: '****' + Math.floor(Math.random() * 10000),
        balance: 0,
        accounts: []
      };

      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    logout,
    register,
    updateUser,
    loading,
    // Role checking utilities
    hasRole,
    hasAnyRole,
    isAdmin,
    isTeller,
    isCustomer,
    ROLES
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
