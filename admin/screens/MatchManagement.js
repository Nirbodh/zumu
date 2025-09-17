import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";

const API = "https://zumu.onrender.com";

export default function MatchManagement() {
  const [matches, setMatches] = useState([]);
  const [title, setTitle] = useState("");
  const [entryFee, setEntryFee] = useState("");

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await fetch(`${API}/api/matches`);
      const data = await res.json();
      setMatches(data);
    } catch (err) {
      Alert.alert("Error", "Failed to load matches");
    }
  };

  const createMatch = async () => {
    try {
      const res = await fetch(`${API}/api/admin/matches`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, entryFee }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create match");
      Alert.alert("✅ Success", "Match created");
      fetchMatches();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  const deleteMatch = async (id) => {
    try {
      const res = await fetch(`${API}/api/admin/matches/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete match");
      fetchMatches();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Match Management</Text>

      <TextInput style={styles.input} placeholder="Match Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Entry Fee" value={entryFee} onChangeText={setEntryFee} keyboardType="numeric" />

      <TouchableOpacity style={styles.button} onPress={createMatch}>
        <Text style={styles.buttonText}>Create Match</Text>
      </TouchableOpacity>

      <FlatList
        data={matches}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.matchItem}>
            <Text style={styles.text}>{item.title} - 💰 {item.entryFee}</Text>
            <TouchableOpacity onPress={() => deleteMatch(item._id)}>
              <Text style={{ color: "red" }}>Delete</Text>
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
  input: { backgroundColor: "#fff", padding: 10, borderRadius: 5, marginBottom: 10 },
  button: { backgroundColor: "#ff8a00", padding: 12, borderRadius: 5, alignItems: "center", marginBottom: 15 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  matchItem: { flexDirection: "row", justifyContent: "space-between", padding: 10, backgroundColor: "#1a1a2e", marginBottom: 5, borderRadius: 5 },
  text: { color: "#fff" },
});
