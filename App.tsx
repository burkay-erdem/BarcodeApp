import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductSave from './pages/ProductSave';
import LoginPage from './pages/LoginPage';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();

// interface IProfileScreen {

// }
// const ProfileScreen = ({navigation, route}) => {
//   return <Text>This is {route.params.name}'s profile</Text>;
// };

const App = () => {
  return (
    <NavigationContainer>
      {/* Rest of your app code */}
      <Stack.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }: { color: string, size: string }) => {
            const icons = {
              Home: 'home',
              Profile: 'account',
            };

            return (
              <Text >Home</Text>
            );
          },
        })}
      >
        <Stack.Screen
          name="Home"
          component={ProductSave}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ title: 'Login' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;