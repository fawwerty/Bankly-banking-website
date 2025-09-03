import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api/laravelClient';

// Define constants
const AUTH_METHODS = {
  EMAIL_PASSWORD: 'email_password'
};

const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  NETWORK_ERROR: 'Network error occurred'
};

const ROLES = {
  ADMIN: 'admin',
  TELLER: 'teller',
  CUSTOMER: 'customer'
};

const EnhancedAuthContext = createContext();

export const useEnhancedAuth = () => {
  const context = useContext(EnhancedAuthContext);
  if (!context) {
    throw new Error('useEnhancedAuth must be used within an EnhancedAuthProvider');
  }
  return context;
};

export const EnhancedAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authMethod, setAuthMethod] = useState(AUTH_METHODS.EMAIL_PASSWORD);

  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = () => {
    const token = localStorage.getItem('laravel_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        clearAuthData();
      }
    }
    setLoading(false);
  };

  const clearAuthData = () => {
    localStorage.removeItem('laravel_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  const loginWithEmailPassword = async (email, password) => {
    try {
      setLoading(true);
      
      const response = await authAPI.login(email, password);
      console.log('Login response:', response);
      const user = response.user;

      const enhancedUser = {
        id: user.id,
        email: user.email,
        name: user.name || email.split('@')[0],
        role: user.role || ROLES.CUSTOMER,
        authMethod: AUTH_METHODS.EMAIL_PASSWORD,
        lastLogin: new Date().toISOString()
      };

      localStorage.setItem('laravel_token', response.token);
      localStorage.setItem('user_data', JSON.stringify(enhancedUser));
      
      setUser(enhancedUser);
      setAuthMethod(AUTH_METHODS.EMAIL_PASSWORD);
      
      return { success: true, user: enhancedUser };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: AUTH_ERRORS.INVALID_CREDENTIALS };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      
      const response = await authAPI.register({
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.confirmPassword,
      });
      const user = response.user;

      const enhancedUser = {
        id: user.id,
        email: user.email,
        name: `${userData.firstName} ${userData.lastName}`,
        role: user.role || ROLES.CUSTOMER,
        authMethod: AUTH_METHODS.EMAIL_PASSWORD,
        lastLogin: new Date().toISOString()
      };

      localStorage.setItem('laravel_token', response.token);
      localStorage.setItem('user_data', JSON.stringify(enhancedUser));
      
      setUser(enhancedUser);
      setAuthMethod(AUTH_METHODS.EMAIL_PASSWORD);
      
      return { success: true, user: enhancedUser };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuthData();
    setAuthMethod(AUTH_METHODS.EMAIL_PASSWORD);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user_data', JSON.stringify(updatedUser));
  };

  const hasRole = (requiredRole) => {
    return user?.role === requiredRole;
  };

  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  const isAdmin = () => hasRole(ROLES.ADMIN);
  const isTeller = () => hasRole(ROLES.TELLER);
  const isCustomer = () => hasRole(ROLES.CUSTOMER);

  const value = {
    user,
    loading,
    authMethod,
    loginWithEmailPassword,
    register,
    logout,
    updateUser,
    hasRole,
    hasAnyRole,
    isAdmin,
    isTeller,
    isCustomer,
    ROLES,
    AUTH_METHODS
  };

  return (
    <EnhancedAuthContext.Provider value={value}>
      {children}
    </EnhancedAuthContext.Provider>
  );
};
