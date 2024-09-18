import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { SplashScreen, IntroScreen } from './screens'


const Stack = createStackNavigator();

export default function IntroNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="IntroScreen" component={IntroScreen} />
    </Stack.Navigator>
  )
}
