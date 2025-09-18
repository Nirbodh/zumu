import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import StatusBar from '../components/StatusBar';

const MatchDetailsScreen = ({ route }) => {
  const { match } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header title="Classic Match Details" />
        
        <StatusBar 
          username="Player123" 
          balance={500} 
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MATCH DETAILS</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Title:</Text>
            <Text style={styles.detailValue}>{match.title}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Match Schedule:</Text>
            <Text style={styles.detailValue}>
              Date: {new Date(match.startTime).toLocaleDateString()} Time: {new Date(match.startTime).toLocaleTimeString()}
            </Text>
          </View>
          
          <View style={styles.detailGrid}>
            <View style={styles.gridItem}>
              <Text style={styles.detailLabel}>Type:</Text>
              <Text style={styles.detailValue}>{match.type || 'Solo'}</Text>
            </View>
            
            <View style={styles.gridItem}>
              <Text style={styles.detailLabel}>Version:</Text>
              <Text style={styles.detailValue}>{match.version || 'Mobile'}</Text>
            </View>
            
            <View style={styles.gridItem}>
              <Text style={styles.detailLabel}>Match type:</Text>
              <Text style={styles.detailValue}>PAID</Text>
            </View>
            
            <View style={styles.gridItem}>
              <Text style={styles.detailLabel}>Entry fee:</Text>
              <Text style={styles.detailValue}>{match.entryFee}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PRIZE DETAILS</Text>
          
          <View style={styles.prizeGrid}>
            <View style={styles.prizeItem}>
              <Text style={styles.prizeLabel}>Total Prize:</Text>
              <Text style={styles.prizeValue}>{match.totalPrize}</Text>
            </View>
            
            <View style={styles.prizeItem}>
              <Text style={styles.prizeLabel}>First Prize:</Text>
              <Text style={styles.prizeValue}>40</Text>
            </View>
            
            <View style={styles.prizeItem}>
              <Text style={styles.prizeLabel}>Third Prize:</Text>
              <Text style={styles.prizeValue}>20</Text>
            </View>
            
            <View style={styles.prizeItem}>
              <Text style={styles.prizeLabel}>Fifth Prize:</Text>
              <Text style={styles.prizeValue}>10</Text>
            </View>
            
            <View style={styles.prizeItem}>
              <Text style={styles.prizeLabel}>Per kill:</Text>
              <Text style={styles.prizeValue}>{match.perKill}</Text>
            </View>
            
            <View style={styles.prizeItem}>
              <Text style={styles.prizeLabel}>Second Prize:</Text>
              <Text style={styles.prizeValue}>30</Text>
            </View>
            
            <View style={styles.prizeItem}>
              <Text style={styles.prizeLabel}>Fourth Prize:</Text>
              <Text style={styles.prizeValue}>10</Text>
            </View>
            
            <View style={styles.prizeItem}>
              <Text style={styles.prizeLabel}>Special:</Text>
              <Text style={styles.prizeValue}>No</Text>
            </View>
          </View>
        </View>

        {match.roomId && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ROOM INFORMATION</Text>
            <View style={styles.roomInfo}>
              <Text style={styles.roomLabel}>ROOM ID:</Text>
              <Text style={styles.roomValue}>{match.roomId}</Text>
            </View>
            
            {match.roomPassword && (
              <View style={styles.roomInfo}>
                <Text style={styles.roomLabel}>PASSWORD:</Text>
                <Text style={styles.roomValue}>{match.roomPassword}</Text>
              </View>
            )}
          </View>
        )}
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
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#ff8a00',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailLabel: {
    color: '#ccc',
    fontWeight: 'bold',
    marginRight: 10,
    width: 120,
  },
  detailValue: {
    color: '#fff',
    flex: 1,
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: 10,
  },
  prizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  prizeItem: {
    width: '48%',
    marginBottom: 15,
  },
  prizeLabel: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 5,
  },
  prizeValue: {
    color: '#ff8a00',
    fontWeight: 'bold',
    fontSize: 16,
  },
  roomInfo: {
    marginBottom: 10,
  },
  roomLabel: {
    color: '#ccc',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  roomValue: {
    color: '#ff8a00',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MatchDetailsScreen;