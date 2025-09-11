import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title, subtitle }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff8a00',
  },
  subtitle: {
    fontSize: 14,
    color: '#ccc',
  },
});

export default Header;