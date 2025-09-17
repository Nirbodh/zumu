import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";

const API = "https://zumu.onrender.com";

export default function ResultManagement() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await fetch(`${API}/api/admin/results`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      Alert.alert("Error", "Failed to load results");
    }
  };

  const approveResult = async (id) => {
    try {
      const res = await fetch(`${API}/api/admin/results/${id}/approve`, { method: "PATCH" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to approve");
      Alert.alert("✅ Success", "Result approved");
      fetchResults();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  const rejectResult = async (id) => {
    try {
      const res = await fetch(`${API}/api/admin/results/${id}/reject`, { method: "PATCH" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to reject");
      Alert.alert("❌ Rejected", "Result rejected");
      fetchResults();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Result Management</Text>
      <FlatList
        data={results}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.user?.username} → {item.match?.title}</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => approveResult(item._id)} style={{ marginRight: 10 }}>
                <Text style={{ color: "lime" }}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => rejectResult(item._id)}>
                <Text style={{ color: "red" }}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0c23", padding: 15 },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  item: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "#1a1a2e", padding: 10, marginBottom: 5, borderRadius: 5 },
  text: { color: "#fff" },
});
