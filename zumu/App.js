// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './screens/HomeScreen';
import TournamentsScreen from './screens/TournamentsScreen';
import MyGameScreen from './screens/MyGameScreen';
import WalletScreen from './screens/WalletScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import SubmitResultScreen from './screens/SubmitResultScreen';
import TopUpScreen from './screens/TopUpScreen';

=======
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Screens
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import TournamentsScreen from "./screens/TournamentsScreen";
import MyGameScreen from "./screens/MyGameScreen";
import WalletScreen from "./screens/WalletScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SubmitResultScreen from "./screens/SubmitResultScreen";
import TopUpScreen from "./screens/TopUpScreen";
import MatchDetailsScreen from "./screens/MatchDetailsScreen";

// Navigators
>>>>>>> f8b3ac3 (Initial commit)
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
<<<<<<< HEAD
    <Tab.Navigator screenOptions={{ headerShown: false }}>
=======
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: "#0a0c23", borderTopColor: "#222" },
        tabBarActiveTintColor: "#ff8a00",
        tabBarInactiveTintColor: "#ccc",
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Tournaments") iconName = "trophy";
          else if (route.name === "MyGame") iconName = "game-controller";
          else if (route.name === "Wallet") iconName = "wallet";
          else if (route.name === "Profile") iconName = "person";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
>>>>>>> f8b3ac3 (Initial commit)
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tournaments" component={TournamentsScreen} />
      <Tab.Screen name="MyGame" component={MyGameScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
<<<<<<< HEAD
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = await AsyncStorage.getItem('userToken');
      setToken(savedToken);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) return null; // or a splash screen

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="SubmitResult" component={SubmitResultScreen} />
            <Stack.Screen name="TopUp" component={TopUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
=======
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Auth Screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* Main Tabs */}
        <Stack.Screen name="Main" component={MainTabs} />

        {/* Extra Screens */}
        <Stack.Screen name="SubmitResult" component={SubmitResultScreen} />
        <Stack.Screen name="TopUp" component={TopUpScreen} />
        <Stack.Screen name="MatchDetails" component={MatchDetailsScreen} />
>>>>>>> f8b3ac3 (Initial commit)
      </Stack.Navigator>
    </NavigationContainer>
  );
}
