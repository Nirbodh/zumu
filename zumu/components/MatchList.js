// components/MatchList.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MatchList = ({ matches, onJoin, currentUserId }) => {
  if (matches.length === 0) {
    return (
      <View style={styles.noMatchesContainer}>
        <Text style={styles.noMatchesText}>No tournaments available</Text>
      </View>
    );
  }

  return (
    <View style={styles.matchList}>
      {matches.map(match => {
        const hasJoined = match.participants?.some(p => 
          p.userId && p.userId.toString() === currentUserId
        );
        const isFull = match.currentParticipants >= match.maxParticipants;
        
        return (
          <View key={match._id} style={styles.matchCard}>
            <Text style={styles.matchTitle}>{match.title}</Text>
            <Text style={styles.matchGame}>Game: {match.game}</Text>
            <Text style={styles.matchDetails}>Entry Fee: ৳{match.entryFee}</Text>
            <Text style={styles.matchDetails}>Prize Pool: ৳{match.totalPrize}</Text>
            <Text style={styles.matchDetails}>
              Participants: {match.currentParticipants}/{match.maxParticipants}
            </Text>
            
            {hasJoined ? (
              <Text style={styles.joinedText}>Already Joined</Text>
            ) : (
              <TouchableOpacity 
                style={[styles.joinButton, isFull && styles.joinButtonDisabled]}
                onPress={() => onJoin(match._id)}
                disabled={isFull}
              >
                <Text style={styles.joinButtonText}>
                  {isFull ? 'Full' : 'Join Now'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  matchList: {
    marginBottom: 20,
  },
  noMatchesContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noMatchesText: {
    color: '#ccc',
    fontSize: 16,
  },
  matchCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  matchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff8a00',
    marginBottom: 8,
  },
  matchGame: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 5,
  },
  matchDetails: {
    color: '#ddd',
    marginBottom: 3,
  },
  joinButton: {
    backgroundColor: '#ff8a00',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  joinButtonDisabled: {
    backgroundColor: '#666',
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  joinedText: {
    color: '#4cd964',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default MatchList;