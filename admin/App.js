import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import AdminNavigator from "./navigation/AdminNavigator";
import AdminLogin from "./screens/AdminLogin";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const parsedData = JSON.parse(userData);
          // Check if user is admin
          if (parsedData.role === "admin") {
            setUser(parsedData);
          }
        }
      } catch (err) {
        console.error("Failed to load user:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ff8a00" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <AdminNavigator setUser={setUser} />
      ) : (
        <AdminLogin setUser={setUser} />
      )}
    </NavigationContainer>
  );
}