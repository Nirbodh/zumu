// screens/MatchDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = "https://zumu.onrender.com";

const MatchDetailsScreen = ({ route }) => {
  const { matchId } = route.params;
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatchDetails();
  }, []);

  const fetchMatchDetails = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');

      const res = await fetch(`${API}/api/matches/${matchId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch match');
      setMatch(data);
    } catch (err) {
      console.error("❌ Match Details Error:", err);
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ff8a00" />
        <Text style={{ color: '#ccc', marginTop: 10 }}>Loading match...</Text>
      </View>
    );
  }

  if (!match) {
    return (
      <View style={styles.center}>
        <Text style={{ color: '#fff' }}>Match not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{match.title}</Text>
      <Text style={styles.info}>Game: {match.game}</Text>
      <Text style={styles.info}>Status: {match.status}</Text>
      <Text style={styles.info}>Entry Fee: {match.entryFee}</Text>
      <Text style={styles.info}>Participants: {match.participants?.length}</Text>

      {/* ✅ Room Info শুধুমাত্র যদি API allow করে */}
      {match.roomCode ? (
        <View style={styles.roomBox}>
          <Text style={styles.roomLabel}>Room Code: <Text style={styles.roomValue}>{match.roomCode}</Text></Text>
          <Text style={styles.roomLabel}>Password: <Text style={styles.roomValue}>{match.roomPassword}</Text></Text>
        </View>
      ) : (
        <Text style={{ color: '#ff6666', marginTop: 10 }}>
          Join first to see Room details!
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0c23', padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a0c23' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  info: { fontSize: 16, color: '#ccc', marginVertical: 4 },
  roomBox: {
    marginTop: 20,
    backgroundColor: '#1c1e3c',
    padding: 15,
    borderRadius: 10,
  },
  roomLabel: { fontSize: 16, color: '#ccc', marginBottom: 5 },
  roomValue: { fontSize: 16, color: '#ff8a00', fontWeight: 'bold' },
});

export default MatchDetailsScreen;
