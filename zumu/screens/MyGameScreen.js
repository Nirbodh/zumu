import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import StatusBar from '../components/StatusBar';

const MyGameScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header title="MyGame" subtitle="Your game status" />
        
        <StatusBar 
          username="ovimahathirmohammad" 
          balance={500} 
        />
        
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>♘</Text>
          </View>
          <Text style={styles.title}>Your Game Status</Text>
          <Text style={styles.text}>This section is coming soon</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>25</Text>
              <Text style={styles.statLabel}>Total Matches</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>Tournament Wins</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>120</Text>
              <Text style={styles.statLabel}>Total Kills</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>৳ 1500</Text>
              <Text style={styles.statLabel}>Total Wins</Text>
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <Text style={styles.button}>View Game History</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0c23',
  },
  scrollView: {
    flex: 1,
    padding: 15,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    fontSize: 80,
    color: '#ff8a00',
  },
  title: {
    fontSize: 24,
    color: '#ff8a00',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  text: {
    color: '#ccc',
    marginBottom: 30,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff8a00',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#ccc',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#ff8a00',
    color: 'white',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MyGameScreen;
