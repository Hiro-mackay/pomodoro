import React from 'react'
import { AuthProvider, TimerProvider, TodoProvider, UserProvider } from '@/context';
  
  function App({ Component, pageProps }) {
    return (
      <AuthProvider>
        <UserProvider>
          <TimerProvider>
            <TodoProvider>
              <Component {...pageProps} />
            </TodoProvider>
          </TimerProvider>
        </UserProvider>
      </AuthProvider>
    );
};

export default App;
