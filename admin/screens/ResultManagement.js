import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = "https://zumu.onrender.com";

const ResultManagement = () => {
  const [matchId, setMatchId] = useState("");
  const [winnerId, setWinnerId] = useState("");

  const submitResult = async () => {
    try {
      const token = await AsyncStorage.getItem("adminToken");
      const res = await fetch(`${API}/api/admin/matches/${matchId}/result`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ winnerId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit result");

      Alert.alert("✅ Result submitted successfully");
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🏆 Submit Match Result</Text>
      <TextInput placeholder="Match ID" value={matchId} onChangeText={setMatchId} style={styles.input} />
      <TextInput placeholder="Winner User ID" value={winnerId} onChangeText={setWinnerId} style={styles.input} />
      <Button title="Submit Result" onPress={submitResult} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0a0c23" },
  heading: { color: "#fff", fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  input: { backgroundColor: "#fff", padding: 10, marginVertical: 5, borderRadius: 5 },
});

export default ResultManagement;