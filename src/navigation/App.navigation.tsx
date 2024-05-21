import React, { useCallback } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import 'react-native-gesture-handler'; 
import { BaseNavigation } from './Base.navigation';
import { AuthNavigation } from './Auth.navigation'; 
import { RootState } from '../provider/redux.provider';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../hook/useContextProvider';

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
}
export const AppNavigation = () => {
  const session = useAppSelector(state => state.auth.session)

  React.useEffect(() => {
    changeScreenOrientation()
  }, [])
  const Navigation = useCallback(() => {
    if (session) return <AuthNavigation session={session} />
    return <BaseNavigation />
  }, [session])
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  )
}
