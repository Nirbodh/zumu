import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import Header from "../components/Header";
import StatusBar from "../components/StatusBar";
import GameSelection from "../components/GameSelection";
import MatchList from "../components/MatchList";
import ParticipantsTable from "../components/ParticipantsTable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../utils/api";

const HomeScreen = ({ navigation }) => {
  const [currentGame, setCurrentGame] = useState("all");
  const [currentMatchTab, setCurrentMatchTab] = useState("upcoming");
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    fetchMatches();
  }, [currentMatchTab]);

  useEffect(() => {
    filterMatches();
  }, [matches, currentGame, currentMatchTab]);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) setUser(JSON.parse(userData));
    } catch (err) {
      console.error("User load error:", err);
    }
  };

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const allMatches = await api("/matches");
      setMatches(allMatches);
    } catch (err) {
      Alert.alert("Error", "Failed to load matches");
    } finally {
      setLoading(false);
    }
  };

  const filterMatches = () => {
    let filtered = matches.filter(m => m.status === currentMatchTab);
    
    if (currentGame !== "all") {
      filtered = filtered.filter(m => m.game === currentGame);
    }
    
    setFilteredMatches(filtered);
  };

  const joinMatch = async (matchId) => {
    try {
      await api(`/matches/${matchId}/join`, { method: "POST" });
      Alert.alert("✅ Success", "You have joined the match!");
      fetchMatches();
    } catch (err) {
      Alert.alert("❌ Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header title="zumu" subtitle="Gaming Tournament Platform" />
        <StatusBar username={user?.username || "Guest"} balance={user?.walletBalance || 0} />

        <View style={styles.navTabs}>
          {["upcoming", "live", "completed"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.navTab, currentMatchTab === tab && styles.navTabActive]}
              onPress={() => setCurrentMatchTab(tab)}
            >
              <Text style={[styles.navTabText, currentMatchTab === tab && styles.navTabTextActive]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <GameSelection currentGame={currentGame} onGameSelect={setCurrentGame} />

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ff8a00" />
            <Text style={styles.loadingText}>Loading matches...</Text>
          </View>
        ) : (
          <>
            <MatchList 
              matches={filteredMatches} 
              onJoin={joinMatch} 
              currentUserId={user?._id}
              navigation={navigation}
            />
            <ParticipantsTable />
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0c23" },
  scrollView: { flex: 1, padding: 15 },
  navTabs: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 5,
    marginBottom: 15,
  },
  navTab: { flex: 1, padding: 10, borderRadius: 8, alignItems: "center" },
  navTabActive: { backgroundColor: "#ff8a00" },
  navTabText: { color: "#ccc", fontWeight: "bold" },
  navTabTextActive: { color: "#fff" },
  loadingContainer: { padding: 40, alignItems: "center", justifyContent: "center" },
  loadingText: { color: "#ccc", marginTop: 10 },
});

export default HomeScreen;