// navigation/AdminNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AdminLogin from "../screens/AdminLogin";
import AdminDashboard from "../screens/AdminDashboard";
import AdminMatches from "../screens/MatchManagement";
import AdminUsers from "../screens/UserManagement";
import WalletManagement from "../screens/WalletManagement";
import ResultManagement from "../screens/ResultManagement";

const Stack = createNativeStackNavigator();

export default function AdminNavigator({ setUser }) {
  return (
    <Stack.Navigator
      initialRouteName="AdminLogin"
      screenOptions={{
        headerStyle: { backgroundColor: "#0a0c23" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="AdminLogin"
        options={{ title: "Admin Login", headerShown: false }}
      >
        {(props) => <AdminLogin {...props} setUser={setUser} />}
      </Stack.Screen>

      {/* ✅ এখানে নাম Dashboard রাখা হয়েছে */}
      <Stack.Screen name="Dashboard" component={AdminDashboard} />
      <Stack.Screen name="Matches" component={AdminMatches} />
      <Stack.Screen name="Users" component={AdminUsers} />
      <Stack.Screen name="Wallet" component={WalletManagement} />
      <Stack.Screen name="Results" component={ResultManagement} />
    </Stack.Navigator>
  );
}
