import React, { useState, useEffect } from 'react';
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

  // ✅ নতুন স্টেট: API থেকে ম্যাচ
  const [matches, setMatches] = useState([]);

 useEffect(() => {
  fetch('https://zumu.onrender.com/api/matches')
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => setMatches(data))
    .catch(err => console.error('Fetch error:', err));
}, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header title="zumu" subtitle="Gaming Tournament Platform" />
        <StatusBar username="ovimahathirmohammad" balance={500} />

        {/* Tabs */}
        <View style={styles.navTabs}>
          {['upcoming','live','completed'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.navTab, currentMatchTab === tab && styles.navTabActive]}
              onPress={() => setCurrentMatchTab(tab)}
            >
              <Text
                style={[
                  styles.navTabText,
                  currentMatchTab === tab && styles.navTabTextActive,
                ]}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <GameSelection currentGame={currentGame} onGameSelect={setCurrentGame} />

        {/* ✅ API থেকে পাওয়া ম্যাচ ডাটা পাঠাচ্ছি */}
        <MatchList matches={matches} />

        <ParticipantsTable />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0c23' },
  scrollView: { flex: 1, padding: 15 },
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
  navTabActive: { backgroundColor: '#ff8a00' },
  navTabText: { color: '#ccc', fontWeight: 'bold' },
  navTabTextActive: { color: '#fff' },
});

export default HomeScreen;
