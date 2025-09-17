import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";

const API = "https://zumu.onrender.com";

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API}/api/admin/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      Alert.alert("Error", "Failed to load users");
    }
  };

  const suspendUser = async (id) => {
    try {
      const res = await fetch(`${API}/api/admin/users/${id}/suspend`, { method: "PATCH" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to suspend user");
      Alert.alert("✅ Success", "User suspended");
      fetchUsers();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👥 User Management</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.text}>{item.username} ({item.email})</Text>
            <TouchableOpacity onPress={() => suspendUser(item._id)}>
              <Text style={{ color: "red" }}>Suspend</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0c23", padding: 15 },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  userItem: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "#1a1a2e", padding: 10, marginBottom: 5, borderRadius: 5 },
  text: { color: "#fff" },
});
