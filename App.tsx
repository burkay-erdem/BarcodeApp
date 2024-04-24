import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductSave from './src/pages/ProductSave';
import LoginPage from './src/pages/LoginPage';
import TabBar from './src/components/NavigationBar';
import { Provider } from "react-redux";
import { store } from "./src/providers/redux.provider";
import { MD3LightTheme as DefaultTheme, Icon, PaperProvider, Provider as PaperUiProvider, adaptNavigationTheme } from 'react-native-paper';

// const { LightTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme });

const Tab = createBottomTabNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};


const App = () => {
  return (
    <Provider store={store}> 
      <PaperUiProvider>

        <PaperProvider theme={theme}>
          <NavigationContainer>
            {/* Rest of your app code */}
            <Tab.Navigator
              tabBar={props => <TabBar {...props} />}
              initialRouteName='Home'
              screenOptions={{
                tabBarStyle: { position: 'absolute', marginBottom: 20, bottom: 20 },
              }}>
              <Tab.Screen
                name="Home"
                component={ProductSave}
                options={{
                  title: 'Welcome',
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => {
                    return <Icon source="camera" size={size} color={color} />;
                  },
                }}
              />
              <Tab.Screen
                name="Login"
                component={LoginPage}
                options={{
                  title: 'Login',
                  tabBarIcon: ({ color, size }) => {
                    return <Icon source="home" size={size} color={color} />;
                  },
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PaperUiProvider>
    </Provider>

  );
};

export default App;