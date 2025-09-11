import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Bottom-tab screens
import HomeScreen from './screens/HomeScreen';
import TournamentsScreen from './screens/TournamentsScreen';
import MyGameScreen from './screens/MyGameScreen';
import WalletScreen from './screens/WalletScreen';
import ProfileScreen from './screens/ProfileScreen';
import TopUpScreen from './screens/TopUpScreen';

// Auth screens (এগুলো রাখা আছে, পরে আবার ব্যবহার করতে পারবেন)
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Tournaments') iconName = focused ? 'trophy' : 'trophy-outline';
          else if (route.name === 'MyGame') iconName = focused ? 'game-controller' : 'game-controller-outline';
          else if (route.name === 'Wallet') iconName = focused ? 'wallet' : 'wallet-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          else if (route.name === 'TopUp') iconName = focused ? 'card' : 'card-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff8a00',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#0a0c23',
          borderTopColor: '#ff8a00',
        },
        headerStyle: { backgroundColor: '#0a0c23' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tournaments" component={TournamentsScreen} />
      <Tab.Screen name="MyGame" component={MyGameScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="TopUp" component={TopUpScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* ডেভেলপমেন্টে সরাসরি Bottom Tabs দেখাতে প্রথম রুট হিসেবে Main দিন */}
        <Stack.Screen name="Main" component={BottomTabs} />

        {/* লগইন/রেজিস্ট্রেশন স্ক্রিন রেখে দিলাম, প্রোডাকশনে আবার প্রথমে ব্যবহার করবেন */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
