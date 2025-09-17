import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AdminSidebar = ({ isVisible, onClose, onNavigate }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Ionicons name="close" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.sidebarTitle}>Admin Panel</Text>

      <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => onNavigate('Dashboard')}
      >
        <Ionicons name="speedometer" size={20} color="#fff" />
        <Text style={styles.menuText}>Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => onNavigate('Matches')}
      >
        <Ionicons name="trophy" size={20} color="#fff" />
        <Text style={styles.menuText}>Matches</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => onNavigate('Users')}
      >
        <Ionicons name="people" size={20} color="#fff" />
        <Text style={styles.menuText}>Users</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => onNavigate('Results')}
      >
        <Ionicons name="document-text" size={20} color="#fff" />
        <Text style={styles.menuText}>Results</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 250,
    height: '100%',
    backgroundColor: '#16213e',
    padding: 20,
    zIndex: 1000,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  sidebarTitle: {
    color: '#ff8a00',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: 'rgba(255,138,0,0.1)',
    borderRadius: 8,
  },
  menuText: {
    color: '#fff',
    marginLeft: 15,
    fontSize: 16,
  },
});

export default AdminSidebar;