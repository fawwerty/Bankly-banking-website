// Firebase configuration
// Replace with your actual Firebase project configuration
export const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_ACTUAL_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_ACTUAL_PROJECT_ID",
  storageBucket: "YOUR_ACTUAL_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_ACTUAL_SENDER_ID",
  appId: "YOUR_ACTUAL_APP_ID",
  measurementId: "YOUR_ACTUAL_MEASUREMENT_ID"
};

// Firebase authentication methods
export const AUTH_METHODS = {
  EMAIL_PASSWORD: 'email_password',
  FINGERPRINT: 'fingerprint',
  FACIAL_RECOGNITION: 'facial_recognition',
  GOOGLE: 'google',
  PHONE: 'phone'
};

// Biometric authentication constants
export const BIOMETRIC_TYPES = {
  FINGERPRINT: 'fingerprint',
  FACE: 'face',
  IRIS: 'iris',
  VOICE: 'voice'
};

// Error messages
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_IN_USE: 'Email already in use',
  WEAK_PASSWORD: 'Password should be at least 6 characters',
  NETWORK_ERROR: 'Network error occurred',
  BIOMETRIC_NOT_SUPPORTED: 'Biometric authentication not supported',
  BIOMETRIC_NOT_ENROLLED: 'Biometric not enrolled',
  BIOMETRIC_AUTH_FAILED: 'Biometric authentication failed'
};

// Authentication providers
export const AUTH_PROVIDERS = {
  PASSWORD: 'password',
  GOOGLE: 'google.com',
  PHONE: 'phone',
  FACEBOOK: 'facebook.com',
  TWITTER: 'twitter.com'
};
