import * as React from 'react';

import { Provider as ReduxProvider } from "react-redux";

import { store } from './src/providers/redux.provider';
import { Navigation } from './src/components/Navigation';
import { AuthProvider } from './src/providers/auth.provider';
const App = () => {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </ReduxProvider >

  );
};


export default App;