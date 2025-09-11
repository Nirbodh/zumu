import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Header from '../components/Header';
import StatusBar from '../components/StatusBar';
import GameSelection from '../components/GameSelection';
import MatchList from '../components/MatchList';
import ParticipantsTable from '../components/ParticipantsTable';

const HomeScreen = () => {
  const [currentGame, setCurrentGame] = useState('pubg');
  const [currentMatchTab, setCurrentMatchTab] = useState('upcoming');

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header title="zumu" subtitle="Gaming Tournament Platform" />
        
        <StatusBar 
          username="ovimahathirmohammad" 
          balance={500} 
        />
        
        <View style={styles.navTabs}>
          <TouchableOpacity 
            style={[styles.navTab, currentMatchTab === 'upcoming' && styles.navTabActive]}
            onPress={() => setCurrentMatchTab('upcoming')}
          >
            <Text style={[styles.navTabText, currentMatchTab === 'upcoming' && styles.navTabTextActive]}>
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.navTab, currentMatchTab === 'live' && styles.navTabActive]}
            onPress={() => setCurrentMatchTab('live')}
          >
            <Text style={[styles.navTabText, currentMatchTab === 'live' && styles.navTabTextActive]}>
              Live
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.navTab, currentMatchTab === 'completed' && styles.navTabActive]}
            onPress={() => setCurrentMatchTab('completed')}
          >
            <Text style={[styles.navTabText, currentMatchTab === 'completed' && styles.navTabTextActive]}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>
        
        <GameSelection 
          currentGame={currentGame} 
          onGameSelect={setCurrentGame} 
        />
        
        <MatchList 
          game={currentGame} 
          tab={currentMatchTab} 
        />
        
        <ParticipantsTable />
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
  navTabs: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 5,
    marginBottom: 15,
  },
  navTab: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  navTabActive: {
    backgroundColor: '#ff8a00',
  },
  navTabText: {
    color: '#ccc',
    fontWeight: 'bold',
  },
  navTabTextActive: {
    color: '#fff',
  },
});

export default HomeScreen;
