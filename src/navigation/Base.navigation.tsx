import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import LoginPage from '../page/LoginPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
 
const Tab = createBottomTabNavigator();

export const BaseNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="LoginPage"
                component={LoginPage}

                options={{
                    title: '',
                    headerShown: false,
                    
                    tabBarIcon: ({ color, size }) => {
                        return <AntDesign name="user" size={24} color="black" />
                    },
                }}
            />
        </Tab.Navigator> 
    )
}
