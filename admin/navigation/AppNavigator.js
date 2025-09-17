// admin/AppNavigator.js
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AdminNavigator from "./AdminNavigator";   // 👉 Admin panel
import ZumuNavigator from "../zumu/ZumuNavigator"; // 👉 Main user app
import AdminLogin from "./screens/AdminLogin";   // 👉 Admin login screen
import LoginScreen from "../zumu/screens/LoginScreen"; // 👉 Normal user login

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const parsed = JSON.parse(userData);
          setIsLoggedIn(true);
          // ✅ এখন role-check হবে
          setIsAdmin(parsed.role === "admin");
        }
      } catch (err) {
        console.error("Auth check error:", err);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return null; // 🔄 চাইলে Loader বসাতে পারো

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Admin flow */}
        {isAdmin ? (
          <Stack.Screen name="AdminPanel" component={AdminNavigator} />
        ) : isLoggedIn ? (
          // Normal user flow
          <Stack.Screen name="ZumuApp" component={ZumuNavigator} />
        ) : (
          // Not logged in → login options
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="AdminLogin" component={AdminLogin} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
