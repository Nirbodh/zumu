import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { api } from '../utils/api';
import Header from '../components/Header';
import StatusBar from '../components/StatusBar';

const MatchListScreen = ({ navigation }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const data = await api('/matches');
      setMatches(data);
    } catch (err) {
      Alert.alert('Error', 'Failed to load matches');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinPress = (match) => {
    navigation.navigate('JoinMatch', { match });
  };

  const handleDetailsPress = (match) => {
    navigation.navigate('MatchDetails', { match });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading matches...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header title="Classic Matches" />
        
        <StatusBar 
          username="Player123" 
          balance={500} 
        />

        {matches.map((match) => (
          <View key={match._id} style={styles.matchCard}>
            <Text style={styles.matchTitle}>{match.title}</Text>
            <Text style={styles.matchTime}>
              Date: {new Date(match.startTime).toLocaleDateString()} Time: {new Date(match.startTime).toLocaleTimeString()}
            </Text>

            <View style={styles.matchDetailsRow}>
              <View style={styles.detailColumn}>
                <Text style={styles.detailLabel}>TOTAL PRIZE</Text>
                <Text style={styles.detailValue}>↓{match.totalPrize}</Text>
              </View>
              <View style={styles.detailColumn}>
                <Text style={styles.detailLabel}>PER KILL</Text>
                <Text style={styles.detailValue}>↓{match.perKill}</Text>
              </View>
              <View style={styles.detailColumn}>
                <Text style={styles.detailLabel}>ENTRY FEE</Text>
                <Text style={styles.detailValue}>↓{match.entryFee}</Text>
              </View>
            </View>

            <View style={styles.matchDetailsRow}>
              <View style={styles.detailColumn}>
                <Text style={styles.detailLabel}>TYPE</Text>
                <Text style={styles.detailValue}>{match.type || 'Solo'}</Text>
              </View>
              <View style={styles.detailColumn}>
                <Text style={styles.detailLabel}>VERSION</Text>
                <Text style={styles.detailValue}>{match.version || 'Mobile'}</Text>
              </View>
              <View style={styles.detailColumn}>
                <Text style={styles.detailLabel}>MAP</Text>
                <Text style={styles.detailValue}>{match.map || 'Bermuda'}</Text>
              </View>
            </View>

            <View style={styles.participantsRow}>
              <Text style={styles.participantsText}>
                {match.currentParticipants} / {match.maxParticipants}
              </Text>
              
              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={styles.detailsButton}
                  onPress={() => handleDetailsPress(match)}
                >
                  <Text style={styles.buttonText}>DETAILS</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.joinButton}
                  onPress={() => handleJoinPress(match)}
                >
                  <Text style={styles.buttonText}>JOIN</Text>
                </TouchableOpacity>
              </View>
            </View>

            {match.roomId && (
              <View style={styles.roomIdSection}>
                <Text style={styles.roomIdLabel}>ROOM ID</Text>
                <Text style={styles.roomIdValue}>{match.roomId}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0c23',
    padding: 15,
  },
  loadingText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  matchCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#ff8a00',
  },
  matchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff8a00',
    marginBottom: 5,
  },
  matchTime: {
    color: '#ccc',
    marginBottom: 15,
  },
  matchDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailColumn: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 5,
  },
  detailValue: {
    color: '#ff8a00',
    fontWeight: 'bold',
  },
  participantsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  participantsText: {
    color: '#ccc',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  detailsButton: {
    backgroundColor: '#444',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  joinButton: {
    backgroundColor: '#ff8a00',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  roomIdSection: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  roomIdLabel: {
    color: '#ccc',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  roomIdValue: {
    color: '#ff8a00',
    fontWeight: 'bold',
  },
});

export default MatchListScreen;