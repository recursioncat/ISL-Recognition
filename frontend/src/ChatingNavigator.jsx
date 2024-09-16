import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ContactsScreen,ChatScreen } from './screens/index'

const Stack = createStackNavigator()

export default function ChatingNavigator() {
  return (
    <Stack.Navigator
    initialRouteName="ContactsScreen"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="ContactsScreen" component={ContactsScreen} />
    <Stack.Screen name="ChatScreen" component={ChatScreen} />

  </Stack.Navigator>
  )
}