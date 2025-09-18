import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = "https://zumu.onrender.com";

const WalletManagement = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = await AsyncStorage.getItem("adminToken");
      const res = await fetch(`${API}/api/admin/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Fetch transactions error:", err);
    }
  };

  const approveTransaction = async (id) => {
    try {
      const token = await AsyncStorage.getItem("adminToken");
      const res = await fetch(`${API}/api/admin/transactions/${id}/approve`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to approve transaction");

      Alert.alert("✅ Transaction approved");
      fetchTransactions();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>💳 Wallet Management</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={{ color: "#fff" }}>
              User: {item.userId} - {item.type} - ${item.amount} - {item.status}
            </Text>
            {item.status === "pending" && (
              <Button title="Approve" onPress={() => approveTransaction(item._id)} />
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0a0c23" },
  heading: { color: "#fff", fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  transactionItem: { flexDirection: "row", justifyContent: "space-between", padding: 10, backgroundColor: "#222", marginVertical: 5, borderRadius: 5 },
});

export default WalletManagement;