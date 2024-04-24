import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useMemo } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { Badge, BottomNavigation } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';

interface ITabBarProps extends BottomTabBarProps {

}
export default function TabBar({ state, descriptors, navigation }: ITabBarProps) {
  return (
    <BottomNavigation.Bar
      navigationState={state}
      onTabPress={({ route, preventDefault }) => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (event.defaultPrevented) {
          preventDefault();
        } else {
          navigation.dispatch({
            ...CommonActions.navigate(route.name, route.params),
            target: state.key,
          });
        }
      }}
      renderIcon={({ route, focused, color }) => {
        const { options } = descriptors[route.key];
        if (options.tabBarIcon) {
          return options.tabBarIcon({ focused, color, size: 24 });
        }

        return null;
      }}
    // onIndexChange={setIndex}
    // renderScene={navigation}
    /> 
  );
}
