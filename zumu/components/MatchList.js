import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MatchList = ({ matches = [] }) => {
  return (
    <View style={styles.container}>
      {matches.length > 0 ? (
        matches.map((match, index) => (
          <View key={index} style={styles.matchCard}>
            <Text style={styles.matchTitle}>{match.title}</Text>
            <Text style={styles.matchDate}>{match.date}</Text>
            <Text style={styles.matchTime}>{match.time}</Text>
            <Text style={styles.matchPrize}>Total Prize: ৳{match.totalPrize}</Text>
            <Text style={styles.matchFee}>Entry Fee: ৳{match.entryFee}</Text>
            <Text style={styles.matchKill}>Per Kill: ৳{match.perKill}</Text>

            <Text style={styles.participants}>
              {match.participants}/{match.maxParticipants} Participants
            </Text>

            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noMatch}>No matches available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  matchCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  matchTitle: { fontSize: 18, fontWeight: 'bold' },
  matchDate: { fontSize: 14, color: '#555' },
  matchTime: { fontSize: 14, color: '#555' },
  matchPrize: { fontSize: 14, color: '#008000' },
  matchFee: { fontSize: 14, color: '#ff0000' },
  matchKill: { fontSize: 14, color: '#000' },
  participants: { fontSize: 14, marginVertical: 5 },
  joinButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  joinButtonText: { color: '#fff', fontWeight: 'bold' },
  noMatch: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
});

export default MatchList;
