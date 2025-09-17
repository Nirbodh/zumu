// screens/AdminScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = "https://zumu.onrender.com";

const AdminScreen = () => {
  const [matches, setMatches] = useState([]);
  const [users, setUsers] = useState([]);
  const [newMatch, setNewMatch] = useState({
    game: "",
    entryFee: "",
    prize: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMatches();
    fetchUsers();
  }, []);

  // 🔹 Get Token
  const getToken = async () => {
    return await AsyncStorage.getItem("adminToken");
  };

  // 🔹 Fetch Matches
  const fetchMatches = async () => {
    try {
      const res = await fetch(`${API}/api/matches`);
      const data = await res.json();
      setMatches(data);
    } catch (err) {
      console.error("Fetch matches error:", err);
    }
  };

  // 🔹 Fetch Users
  const fetchUsers = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${API}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Fetch users error:", err);
    }
  };

  // 🔹 Create Match
  const handleCreateMatch = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${API}/api/admin/matches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newMatch),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create match");

      Alert.alert("✅ Success", "Match created");
      setNewMatch({ game: "", entryFee: "", prize: "", time: "" });
      fetchMatches();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  // 🔹 Update Match (e.g. set room code, make live/completed)
  const handleUpdateMatch = async (id, updates) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API}/api/admin/matches/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      Alert.alert("✅ Success", "Match updated");
      fetchMatches();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  // 🔹 Suspend/Activate User
  const handleUserStatus = async (id, status) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API}/api/admin/users/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update user");

      Alert.alert("✅ Success", `User ${status}`);
      fetchUsers();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>⚙️ Admin Panel</Text>

      {/* Create Match Form */}
      <Text style={styles.subheading}>➕ Create Match</Text>
      <TextInput
        style={styles.input}
        placeholder="Game (e.g. pubg)"
        placeholderTextColor="#aaa"
        value={newMatch.game}
        onChangeText={(t) => setNewMatch({ ...newMatch, game: t })}
      />
      <TextInput
        style={styles.input}
        placeholder="Entry Fee"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={newMatch.entryFee}
        onChangeText={(t) => setNewMatch({ ...newMatch, entryFee: t })}
      />
      <TextInput
        style={styles.input}
        placeholder="Prize"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={newMatch.prize}
        onChangeText={(t) => setNewMatch({ ...newMatch, prize: t })}
      />
      <TextInput
        style={styles.input}
        placeholder="Time (YYYY-MM-DD HH:mm)"
        placeholderTextColor="#aaa"
        value={newMatch.time}
        onChangeText={(t) => setNewMatch({ ...newMatch, time: t })}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateMatch}>
        <Text style={styles.buttonText}>Create Match</Text>
      </TouchableOpacity>

      {/* Matches */}
      <Text style={styles.subheading}>🎮 Matches</Text>
      {matches.map((m) => (
        <View key={m._id} style={styles.card}>
          <Text style={styles.cardText}>
            {m.game} | Fee: {m.entryFee} | Prize: {m.prize} | Status: {m.status}
          </Text>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() =>
              handleUpdateMatch(m._id, { status: "live", roomCode: "ROOM123", roomPassword: "PASS" })
            }
          >
            <Text style={styles.buttonText}>Make Live</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Users */}
      <Text style={styles.subheading}>👥 Users</Text>
      {users.map((u) => (
        <View key={u._id} style={styles.card}>
          <Text style={styles.cardText}>
            {u.username} | {u.email} | {u.status || "active"}
          </Text>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() =>
              handleUserStatus(u._id, u.status === "suspended" ? "active" : "suspended")
            }
          >
            <Text style={styles.buttonText}>
              {u.status === "suspended" ? "Activate" : "Suspend"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0c23", padding: 15 },
  heading: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  subheading: { fontSize: 18, fontWeight: "bold", color: "#ff8a00", marginVertical: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    color: "#fff",
  },
  button: {
    backgroundColor: "#ff8a00",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  cardText: { color: "#fff", marginBottom: 5 },
  smallButton: {
    backgroundColor: "#ff8a00",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 5,
  },
});

export default AdminScreen;
