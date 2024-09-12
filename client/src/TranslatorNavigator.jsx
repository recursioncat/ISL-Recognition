import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {SignToText,EngToSign} from './screens/index.js';

const Stack = createStackNavigator();

export default function TranslatorNavigator() {

  return (
    <Stack.Navigator
      initialRouteName="EngToSign"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="EngToSign" component={EngToSign} />
      <Stack.Screen name="SignToText" component={SignToText} />
    </Stack.Navigator>
  )
}
