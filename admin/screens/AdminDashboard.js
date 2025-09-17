import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";

const API = "https://zumu.onrender.com";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API}/api/admin/stats`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load stats");
      setStats(data);
    } catch (err) {
      console.error("Stats Error:", err);
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#ff8a00" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Admin Dashboard</Text>
      <Text style={styles.text}>👥 Users: {stats?.users || 0}</Text>
      <Text style={styles.text}>🎮 Matches: {stats?.matches || 0}</Text>
      <Text style={styles.text}>💰 Revenue: {stats?.revenue || 0}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0c23", justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  text: { fontSize: 18, color: "#ccc", marginVertical: 5 }
});
