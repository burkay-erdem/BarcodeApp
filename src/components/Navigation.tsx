import React, { useContext } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginPage from '../pages/LoginPage';
import ProductSave from '../pages/ProductSave';

import Ionicons from '@expo/vector-icons/Ionicons';


import UserSave from '../pages/UserSave';
import { ProductList } from '../pages/ProductList'; 
import * as ScreenOrientation from 'expo-screen-orientation';

import 'react-native-gesture-handler';
import { AuthContext } from '../providers/auth.provider';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export const Navigation = () => {
  const [orientationIsLandscape, setOrientationIsLandscape] = React.useState(0);
  const authContext = useContext(AuthContext);

  React.useEffect(() => {
    // changeScreenOrientation()
    changeScreenOrientation()
  }, [])
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);

    // if (orientationIsLandscape) {
    //   await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    // } else {
    //   await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    // }
  }
  return (
    <NavigationContainer> 
        {/* Rest of your app code */}
        {/* <Tab.Navigator

        // tabBar={props =>  />}

        initialRouteName='Home'

      // screenOptions={{
      //   tabBarStyle: { marginBottom: 0, bottom: 0 },
      // }}
      >
        <Tab.Screen
          name="ProductSave"
          component={ProductSave}
          options={{
            title: 'Product Save',
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              return <FontAwesomeIcon icon={"save"} />;
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
              return <FontAwesomeIcon icon={"list"} />;
            },
          }}
        />
        <Tab.Screen
          name="User"
          component={LoginPage}
          options={{
            title: 'User',
            tabBarIcon: ({ color, size }) => {
              return <FontAwesomeIcon icon={"user"} />;
            },
          }}
        />
        <Tab.Screen
          name="User Save"
          component={UserSave}
          options={{
            title: 'User Save',
            tabBarIcon: ({ color, size }) => {
              return <FontAwesomeIcon icon={"user-plus"} />;
            },
          }}
        />
      </Tab.Navigator> */}
        <Drawer.Navigator>
          {
            authContext?.session ? (
              <>
                <Drawer.Screen name="Listeler " component={ProductList} />
                <Drawer.Screen name="Kullanıcı Oluştur" component={UserSave} />
                <Drawer.Screen name="Ürün Girişi" component={ProductSave} />
                <Drawer.Screen name="Çıkış" component={LoginPage} />
              </>
            ) : (
              <Drawer.Screen name="Giriş Yap" component={LoginPage} />
            )
          }

        </Drawer.Navigator> 

    </NavigationContainer>
  )
}
