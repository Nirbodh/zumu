// screens/ProfileScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Header from '../components/Header';
import StatusBar from '../components/StatusBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      console.log('🚪 Logged out, token removed');
      navigation.replace('Login');
    } catch (err) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header title="Profile" subtitle="Your profile information" />
        
        <StatusBar 
          username="ovimahathirmohammad" 
          balance={500} 
        />
        
        <View style={styles.profileInfo}>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Full Name</Text>
            <Text style={styles.profileValue}>Ovima Hathir Mohammad</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Email</Text>
            <Text style={styles.profileValue}>ovimahathir@example.com</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Phone Number</Text>
            <Text style={styles.profileValue}>+8801XXXXXXXXX</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Registration Date</Text>
            <Text style={styles.profileValue}>01/01/2023</Text>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Player Statistics</Text>
        
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
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleLogout}>
            <Text style={styles.secondaryButtonText}>Logout</Text>
          </TouchableOpacity>
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
  profileInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  profileLabel: {
    color: '#ccc',
  },
  profileValue: {
    color: '#ff8a00',
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#ff8a00',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
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
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#ff8a00',
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#ff8a00',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#ff8a00',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
