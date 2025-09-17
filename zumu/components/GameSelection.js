// components/GameSelection.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const GameSelection = ({ currentGame, onGameSelect }) => {
  const games = [
    { id: 'all', name: 'All Games' },
    { id: 'pubg', name: 'PUBG' },
    { id: 'freefire', name: 'Free Fire' },
    { id: 'cod', name: 'COD Mobile' },
  ];

  return (
    <View style={styles.gameSelection}>
      {games.map(game => (
        <TouchableOpacity
          key={game.id}
          style={[
            styles.gameButton,
            currentGame === game.id && styles.gameButtonActive,
          ]}
          onPress={() => onGameSelect(game.id)}
        >
          <Text
            style={[
              styles.gameButtonText,
              currentGame === game.id && styles.gameButtonTextActive,
            ]}
          >
            {game.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gameSelection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  gameButton: {
    width: '23%',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  gameButtonActive: {
    backgroundColor: '#ff8a00',
  },
  gameButtonText: {
    color: '#ccc',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  gameButtonTextActive: {
    color: '#fff',
  },
});

export default GameSelection;