import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatusBar = ({ username, balance }) => {
  return (
    <View style={styles.statusBar}>
      <View style={styles.userInfo}>
        <View style={styles.userAvatar}>
          <Text style={styles.avatarText}>U</Text>
        </View>
        <Text style={styles.userName}>{username}</Text>
      </View>
      <View style={styles.walletBalance}>
        <Text style={styles.balanceText}>৳ {balance}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff8a00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
  },
  userName: {
    color: '#ff8a00',
    fontWeight: 'bold',
  },
  walletBalance: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  balanceText: {
    color: '#ff8a00',
    fontWeight: 'bold',
  },
});

export default StatusBar;