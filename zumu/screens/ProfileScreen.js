// screens/ProfileScreen.js
import React, { useState, useEffect } from 'react'; // Added useState and useEffect
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Header from '../components/Header';
import StatusBar from '../components/StatusBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'; // Added useIsFocused

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({ // Added state for user data
    username: '',
    email: '',
    phone: ''
  });
  const isFocused = useIsFocused(); // Added to detect when screen is focused

  useEffect(() => {
    if (isFocused) {
      loadUserData();
    }
  }, [isFocused]);

  const loadUserData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('userData');
      if (storedData) {
        const user = JSON.parse(storedData);
        setUserData({
          username: user.username || '',
          email: user.email || '',
          phone: user.phone || ''
        });
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to load user data');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      console.log('🚪 Logged out, token removed');
      navigation.replace('Login');
    } catch (err) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header title="Profile" subtitle="Your profile information" />
        
        <StatusBar 
          username={userData.username || "ovimahathirmohammad"} 
          balance={500} 
        />
        
        <View style={styles.profileInfo}>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Username</Text>
            <Text style={styles.profileValue}>{userData.username || "Ovima Hathir Mohammad"}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Email</Text>
            <Text style={styles.profileValue}>{userData.email || "ovimahathir@example.com"}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Phone Number</Text>
            <Text style={styles.profileValue}>{userData.phone || "+8801XXXXXXXXX"}</Text>
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
          <TouchableOpacity style={styles.primaryButton} onPress={handleEditProfile}>
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

// ... rest of the styles remain the same