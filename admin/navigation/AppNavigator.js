import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import TournamentsScreen from '../screens/TournamentsScreen';
import MyGameScreen from '../screens/MyGameScreen';
import WalletScreen from '../screens/WalletScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MatchDetailsScreen from '../screens/MatchDetailsScreen';
import JoinMatchScreen from '../screens/JoinMatchScreen';
import SubmitResultScreen from '../screens/SubmitResultScreen';
import TopUpScreen from '../screens/TopUpScreen';
import AdminLoginScreen from '../screens/AdminLoginScreen';
import AdminScreen from '../screens/AdminScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main Tab Navigator
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Tournaments') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'MyGame') {
            iconName = focused ? 'game-controller' : 'game-controller-outline';
          } else if (route.name === 'Wallet') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff8a00',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#0a0c23',
          borderTopWidth: 0,
          paddingBottom: 5,
          paddingTop: 5,
        },
        headerStyle: {
          backgroundColor: '#0a0c23',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tournaments" component={TournamentsScreen} />
      <Tab.Screen name="MyGame" component={MyGameScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// App Navigator
export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0a0c23',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Main" 
        component={MainTabNavigator} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="MatchDetails" 
        component={MatchDetailsScreen} 
        options={{ title: 'Match Details' }}
      />
      <Stack.Screen 
        name="JoinMatch" 
        component={JoinMatchScreen} 
        options={{ title: 'Join Match' }}
      />
      <Stack.Screen 
        name="SubmitResult" 
        component={SubmitResultScreen} 
        options={{ title: 'Submit Result' }}
      />
      <Stack.Screen 
        name="TopUp" 
        component={TopUpScreen} 
        options={{ title: 'Top Up Wallet' }}
      />
      <Stack.Screen 
        name="AdminLogin" 
        component={AdminLoginScreen} 
        options={{ title: 'Admin Login' }}
      />
      <Stack.Screen 
        name="Admin" 
        component={AdminScreen} 
        options={{ title: 'Admin Panel' }}
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen} 
        options={{ title: 'Edit Profile' }}
      />
    </Stack.Navigator>
  );
}