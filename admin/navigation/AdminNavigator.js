// navigation/AdminNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AdminLogin from "../screens/AdminLogin";
import AdminDashboard from "../screens/AdminDashboard";
import MatchManagement from "../screens/MatchManagement";
import UserManagement from "../screens/UserManagement";
import WalletManagement from "../screens/WalletManagement";
import ResultManagement from "../screens/ResultManagement";

const Stack = createNativeStackNavigator();

export default function AdminNavigator({ setUser }) {
  return (
    <Stack.Navigator
      initialRouteName="AdminLogin"
      screenOptions={{
        headerShown: false, // আমরা custom header ব্যবহার করব
      }}
    >
      <Stack.Screen name="AdminLogin">
        {(props) => <AdminLogin {...props} setUser={setUser} />}
      </Stack.Screen>
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      <Stack.Screen name="Matches" component={MatchManagement} />
      <Stack.Screen name="Users" component={UserManagement} />
      <Stack.Screen name="Wallet" component={WalletManagement} />
      <Stack.Screen name="Results" component={ResultManagement} />
    </Stack.Navigator>
  );
}
