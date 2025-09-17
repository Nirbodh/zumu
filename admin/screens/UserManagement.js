import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = "https://zumu.onrender.com";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = await AsyncStorage.getItem("adminToken");
      const res = await fetch(`${API}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Fetch users error:", err);
    }
  };

  const suspendUser = async (userId) => {
    try {
      const token = await AsyncStorage.getItem("adminToken");
      const res = await fetch(`${API}/api/admin/users/${userId}/suspend`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to suspend user");

      Alert.alert("🚫 User suspended");
      fetchUsers();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>👥 User Management</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={{ color: "#fff" }}>{item.username} - {item.email}</Text>
            <Button title="Suspend" onPress={() => suspendUser(item._id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0a0c23" },
  heading: { color: "#fff", fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  userItem: { flexDirection: "row", justifyContent: "space-between", padding: 10, backgroundColor: "#222", marginVertical: 5, borderRadius: 5 },
});

export default UserManagement;
