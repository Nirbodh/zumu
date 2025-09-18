import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { api } from '../utils/api';
import Header from '../components/Header';
import StatusBar from '../components/StatusBar';

const JoinMatchScreen = ({ route, navigation }) => {
  const { match } = route.params;
  const [gameName, setGameName] = useState('');
  const [gameId, setGameId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!gameName.trim() || !gameId.trim()) {
      Alert.alert('Error', 'Please enter your game name and ID');
      return;
    }

    try {
      setLoading(true);
      
      // First check if user has enough balance
      const userData = await api('/users/me');
      
      if (userData.walletBalance < match.entryFee) {
        Alert.alert(
          'Insufficient Balance', 
          `You need ${match.entryFee} coins to join this match. Your current balance is ${userData.walletBalance} coins.`
        );
        return;
      }

      // Join the match
      await api(`/matches/${match._id}/join`, {
        method: 'POST',
        body: {
          playerId: gameId,
          playerName: gameName,
        },
      });

      Alert.alert(
        'Success', 
        `You have successfully joined the match! ${match.entryFee} coins deducted from your wallet.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={`Register for ${match.type || 'SOLO'}`} />
      
      <StatusBar 
        username="Player123" 
        balance={500} 
      />

      <View style={styles.matchInfo}>
        <Text style={styles.matchInfoText}>
          Mode: {match.type || 'Solo'} | Entry: ₹{match.entryFee}
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Your FreeFire In-Game Name:</Text>
        <TextInput
          style={styles.input}
          value={gameName}
          onChangeText={setGameName}
          placeholder="Enter your game name"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Your FreeFire ID (UID):</Text>
        <TextInput
          style={styles.input}
          value={gameId}
          onChangeText={setGameId}
          placeholder="Enter your game ID"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
        />

        <TouchableOpacity 
          style={[styles.joinButton, loading && styles.joinButtonDisabled]}
          onPress={handleJoin}
          disabled={loading}
        >
          <Text style={styles.joinButtonText}>
            {loading ? 'Processing...' : `Pay ₹${match.entryFee} & Join`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0c23',
    padding: 15,
  },
  matchInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  matchInfoText: {
    color: '#ff8a00',
    fontWeight: 'bold',
    fontSize: 16,
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 10,
  },
  label: {
    color: '#ccc',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#ff8a00',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    marginBottom: 20,
  },
  joinButton: {
    backgroundColor: '#ff8a00',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButtonDisabled: {
    backgroundColor: '#666',
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default JoinMatchScreen;