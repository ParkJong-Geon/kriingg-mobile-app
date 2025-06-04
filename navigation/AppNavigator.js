import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MenuListScreen from '../screens/MenuListScreen';
import MenuFormScreen from '../screens/MenuFormScreen';
import MenuDetailScreen from '../screens/MenuDetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MenuList" component={MenuListScreen} />
        <Stack.Screen name="MenuForm" component={MenuFormScreen} />
        <Stack.Screen name="MenuDetail" component={MenuDetailScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
