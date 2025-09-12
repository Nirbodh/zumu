import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = 'https://zumu.onrender.com';

export default function TournamentsScreen() {
  const [matches, setMatches] = useState([]);

  const loadMatches = async () => {
    try {
      const res = await fetch(`${API}/api/matches`);
      const data = await res.json();
      setMatches(data);
    } catch (err) {
      Alert.alert('Error', 'Could not load matches');
    }
  };

  const joinMatch = async (matchId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const res = await fetch(`${API}/api/matches/${matchId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ playerId: 'Player123' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Join failed');
      Alert.alert('Joined', 'You have joined the match!');
      loadMatches();
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  useEffect(() => {
    loadMatches();
  }, []);

  return (
    <FlatList
      data={matches}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>Entry Fee: ৳{item.entryFee}</Text>
          <Text>Prize: ৳{item.totalPrize}</Text>
          <TouchableOpacity style={styles.btn} onPress={() => joinMatch(item._id)}>
            <Text style={styles.btnText}>Join</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  card: { backgroundColor: '#222', padding: 15, marginBottom: 10, borderRadius: 8 },
  title: { color: '#ff8a00', fontSize: 18, marginBottom: 5 },
  btn: { marginTop: 10, backgroundColor: '#ff8a00', padding: 10, borderRadius: 5 },
  btnText: { color: '#fff', textAlign: 'center' },
});
