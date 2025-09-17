import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";

const API = "https://zumu.onrender.com";

export default function WalletManagement() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`${API}/api/admin/transactions`);
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      Alert.alert("Error", "Failed to load transactions");
    }
  };

  const approveTransaction = async (id) => {
    try {
      const res = await fetch(`${API}/api/admin/transactions/${id}/approve`, { method: "PATCH" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to approve");
      Alert.alert("✅ Success", "Transaction approved");
      fetchTransactions();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💰 Wallet Management</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.user?.username} → {item.amount} ({item.type})</Text>
            <TouchableOpacity onPress={() => approveTransaction(item._id)}>
              <Text style={{ color: "lime" }}>Approve</Text>
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
  item: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "#1a1a2e", padding: 10, marginBottom: 5, borderRadius: 5 },
  text: { color: "#fff" },
});
