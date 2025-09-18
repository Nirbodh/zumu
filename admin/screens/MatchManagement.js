import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = "https://zumu.onrender.com";

const MatchManagement = () => {
  const [matches, setMatches] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [prizePool, setPrizePool] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [roomPassword, setRoomPassword] = useState("");

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const token = await AsyncStorage.getItem("adminToken");
      const res = await fetch(`${API}/api/admin/matches`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMatches(data);
    } catch (err) {
      console.error("Fetch matches error:", err);
    }
  };

  const createMatch = async () => {
    try {
      const token = await AsyncStorage.getItem("adminToken");
      const res = await fetch(`${API}/api/admin/matches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          game: "freefire",
          title,
          date,
          entryFee: Number(entryFee),
          prizePool: Number(prizePool),
          roomCode,
          roomPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create match");

      Alert.alert("✅ Match created");
      fetchMatches();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>➕ Create Free Fire Match</Text>

      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Date (YYYY-MM-DD HH:mm)" value={date} onChangeText={setDate} style={styles.input} />
      <TextInput placeholder="Entry Fee" value={entryFee} onChangeText={setEntryFee} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Prize Pool" value={prizePool} onChangeText={setPrizePool} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Room Code" value={roomCode} onChangeText={setRoomCode} style={styles.input} />
      <TextInput placeholder="Room Password" value={roomPassword} onChangeText={setRoomPassword} style={styles.input} />

      <Button title="Create Match" onPress={createMatch} />

      <Text style={styles.heading}>📋 Matches</Text>
      <FlatList
        data={matches}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.matchItem}>
            <Text>{item.title} - {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0a0c23" },
  heading: { color: "#fff", fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  input: { backgroundColor: "#fff", padding: 10, marginVertical: 5, borderRadius: 5 },
  matchItem: { padding: 10, backgroundColor: "#222", marginVertical: 5, borderRadius: 5 },
});

export default MatchManagement;