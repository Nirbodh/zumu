import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Admin flow
import AdminNavigator from "./AdminNavigator";
import AdminLogin from "./screens/AdminLogin";

// User flow
import MatchListScreen from "../screens/MatchListScreen";
import MatchDetailsScreen from "../screens/MatchDetailsScreen";
import JoinMatchScreen from "../screens/JoinMatchScreen";
import LoginScreen from "../zumu/screens/LoginScreen";

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

  if (loading) return null; // 🔄 can show loader/spinner here

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#0a0c23" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        {/* Admin flow */}
        {isAdmin ? (
          <Stack.Screen
            name="AdminPanel"
            component={AdminNavigator}
            options={{ headerShown: false }}
          />
        ) : isLoggedIn ? (
          <>
            <Stack.Screen
              name="MatchList"
              component={MatchListScreen}
              options={{ title: "Classic Matches" }}
            />
            <Stack.Screen
              name="MatchDetails"
              component={MatchDetailsScreen}
              options={{ title: "Match Details" }}
            />
            <Stack.Screen
              name="JoinMatch"
              component={JoinMatchScreen}
              options={{ title: "Join Match" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AdminLogin"
              component={AdminLogin}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
