import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductSave from './src/pages/ProductSave';
import LoginPage from './src/pages/LoginPage';
import TabBar from './src/components/NavigationBar';
import { Provider } from "react-redux";
import { store } from "./src/providers/redux.provider";
import { MD3LightTheme as DefaultTheme, Icon, PaperProvider, Provider as PaperUiProvider, adaptNavigationTheme } from 'react-native-paper';
import UserSave from './src/pages/UserSave';
import { IconTypes } from './icon-list';
import { ProductList } from './src/pages/ProductList';

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
                name="ProductSave"
                component={ProductSave}
                options={{
                  title: 'Product Save',
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => {
                    return <Icon source={IconTypes['content-save-settings']} size={size} color={color} />;
                  },
                }}
              />
              <Tab.Screen
                name="ProductList"
                component={ProductList}
                options={{
                  title: 'Product List',
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => {
                    return <Icon source={IconTypes['view-list']} size={size} color={color} />;
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
              <Tab.Screen
                name="User Save"
                component={UserSave}
                options={{
                  title: 'User Save',
                  tabBarIcon: ({ color, size }) => {
                    return <Icon source="react" size={size} color={color} />;
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