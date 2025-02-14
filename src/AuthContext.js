import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, analytics } from './firebase';
import { logEvent } from 'firebase/analytics';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authState, setAuthState] = useState('initializing'); // 'initializing' | 'authenticated' | 'unauthenticated'

  useEffect(() => {
    setLoading(true);
    setError(null);

    const unsubscribe = onAuthStateChanged(auth,
      (user) => {
        setUser(user);
        setAuthState(user ? 'authenticated' : 'unauthenticated');
        setError(null);
        setLoading(false);

          // Track authentication state changes in analytics
        if (user) {
          logEvent(analytics, 'login', {
            method: user.providerData[0]?.providerId || 'unknown'
          });
        } else {
          logEvent(analytics, 'logout');
        }
      },
      (error) => {
        setError({
          code: error.code,
          message: error.message
        });
        setAuthState('unauthenticated');
        setLoading(false);

        // Track authentication errors
        logEvent(analytics, 'auth_error', {
          error_code: error.code,
          error_message: error.message
        });
      }
    );

    return () => unsubscribe();
  }, []);

  // Provide a loading component or spinner while initializing
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      authState,
      isAuthenticated: authState === 'authenticated',
      clearError: () => setError(null)
    }}>
      {children}
    </AuthContext.Provider>
  );
};
