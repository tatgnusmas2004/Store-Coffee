import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Dimensions, Image, StyleSheet, Text } from "react-native";
import BottomNav from '@/components/BottomTabNavigator/BottomNav';
import TableScreen from '@/components/TableScreen/TableScreen';
const Stack = createStackNavigator();

import InvoiceScreen from '@/components/InvoiceScreen/InvoiceScreen';
import LoginScreen from '@/components/LoginScreen/LoginScreen';

export default function Page() {
  return (
    <NavigationContainer
      independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TableScreen"
          component={TableScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={BottomNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='InvoiceScreen'
          component={InvoiceScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Style cho thanh tab dưới
const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: Dimensions.get('screen').width,
    height: 250,
  }
});
