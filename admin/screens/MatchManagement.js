import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = "https://zumu.onrender.com";

const MatchManagement = () => {
  const [matches, setMatches] = useState([]);
  const [title, setTitle] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [prizePool, setPrizePool] = useState("");
  const [perKill, setPerKill] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [roomCode, setRoomCode] = useState("");

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const token = await AsyncStorage.getItem("adminToken");
      const res = await fetch(`${API}/api/admin/matches`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) throw new Error("Failed to fetch matches");
      
      const data = await res.json();
      setMatches(data);
    } catch (err) {
      console.error("Fetch matches error:", err);
      Alert.alert("Error", "Failed to fetch matches");
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
          title,
          entryFee: Number(entryFee),
          totalPrize: Number(prizePool),
          perKill: Number(perKill),
          maxParticipants: Number(maxParticipants) || 100,
          roomCode,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create match");

      Alert.alert("✅ Match created");
      // Reset form
      setTitle("");
      setEntryFee("");
      setPrizePool("");
      setPerKill("");
      setMaxParticipants("");
      setRoomCode("");
      
      // Refresh matches list
      fetchMatches();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>➕ Create Free Fire Match</Text>

      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Entry Fee" value={entryFee} onChangeText={setEntryFee} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Prize Pool" value={prizePool} onChangeText={setPrizePool} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Per Kill Prize" value={perKill} onChangeText={setPerKill} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Max Participants" value={maxParticipants} onChangeText={setMaxParticipants} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Room Code" value={roomCode} onChangeText={setRoomCode} style={styles.input} />

      <Button title="Create Match" onPress={createMatch} />

      <Text style={styles.heading}>📋 Matches</Text>
      <FlatList
        data={matches}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.matchItem}>
            <Text style={styles.matchText}>{item.title} - {item.status}</Text>
            <Text style={styles.matchText}>Entry: {item.entryFee} | Prize: {item.totalPrize}</Text>
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
  matchText: { color: "#fff" }
});

export default MatchManagement;