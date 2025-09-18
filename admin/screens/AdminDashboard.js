import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert, Button, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

const API = "https://zumu.onrender.com";

export default function AdminDashboard({ navigation }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = await AsyncStorage.getItem("adminToken");
      if (!token) {
        Alert.alert("Unauthorized", "Admin token not found. Please login first.");
        setLoading(false);
        return;
      }

      const res = await fetch(`${API}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Server returned ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load stats");
      
      setStats(data);
      setError(null);
    } catch (err) {
      console.error("Stats Error:", err);
      setError(err.message);
      
      // Try the test endpoint to see if admin routes are working at all
      try {
        const token = await AsyncStorage.getItem("adminToken");
        const testRes = await fetch(`${API}/api/admin/test`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const testData = await testRes.json();
        console.log("Test endpoint response:", testData);
      } catch (testErr) {
        console.error("Test endpoint error:", testErr);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("adminToken");
    navigation.replace("AdminLogin");
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#ff8a00" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <AdminHeader
        title="Admin Dashboard"
        onLogout={handleLogout}
        onMenuPress={() => setSidebarVisible(true)}
      />

      {/* Sidebar */}
      <AdminSidebar
        isVisible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onNavigate={(screen) => {
          setSidebarVisible(false);
          navigation.navigate(screen);
        }}
      />

      {/* Content */}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📊 Admin Dashboard</Text>
        
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error: {error}</Text>
            <Button title="Retry" onPress={fetchStats} />
          </View>
        ) : stats ? (
          <>
            <Text style={styles.text}>👥 Users: {stats.users || 0}</Text>
            <Text style={styles.text}>🎮 Matches: {stats.matches || 0}</Text>
            <Text style={styles.text}>💰 Revenue: {stats.revenue || 0}</Text>
          </>
        ) : (
          <Text style={styles.text}>No stats available</Text>
        )}

        <View style={styles.buttons}>
          <Button title="⚔️ Match Management" onPress={() => navigation.navigate("Matches")} />
          <Button title="👥 User Management" onPress={() => navigation.navigate("Users")} />
          <Button title="🏆 Result Management" onPress={() => navigation.navigate("Results")} />
          <Button title="💳 Wallet Management" onPress={() => navigation.navigate("Wallet")} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#0a0c23", justifyContent: "center", alignItems: "center", padding: 20 },
  loading: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0a0c23" },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  text: { fontSize: 18, color: "#ccc", marginVertical: 5 },
  buttons: { marginTop: 30, width: "100%", gap: 15 },
  errorContainer: { marginBottom: 20, alignItems: "center" },
  errorText: { color: "red", marginBottom: 10, textAlign: "center" },
});