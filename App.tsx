import * as React from 'react';

import { Provider as ReduxProvider } from "react-redux";

import { store } from './src/provider/redux.provider';  
import { AppNavigation } from './src/navigation/App.navigation';
const App = () => {
  return (
    <ReduxProvider store={store}> 
        <AppNavigation /> 
    </ReduxProvider >

  );
};


export default App;