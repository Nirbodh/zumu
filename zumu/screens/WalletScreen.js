import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import StatusBar from '../components/StatusBar';

const WalletScreen = () => {
  const transactions = [
    { id: 1, type: 'deposit', amount: 500, description: 'Bkash Deposit', date: '05/Sept/2025 10:30 AM', status: 'completed' },
    { id: 2, type: 'tournament_entry', amount: -10, description: 'Tournament Entry Fee', date: '05/Sept/2025 11:45 AM', status: 'completed' },
    { id: 3, type: 'tournament_win', amount: 85, description: 'Tournament Win', date: '05/Sept/2025 02:30 PM', status: 'completed' },
    { id: 4, type: 'withdrawal', amount: -100, description: 'Bkash Withdrawal', date: '04/Sept/2025 04:15 PM', status: 'processing' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header title="My Wallet" subtitle="Your balance and transactions" />
        
        <StatusBar 
          username="ovimahathirmohammad" 
          balance={500} 
        />
        
        <View style={styles.walletSection}>
          <View style={styles.walletItem}>
            <Text style={styles.walletLabel}>Total Deposit</Text>
            <Text style={styles.walletValue}>৳ 1000</Text>
          </View>
          <View style={styles.walletItem}>
            <Text style={styles.walletLabel}>Total Withdrawal</Text>
            <Text style={styles.walletValue}>৳ 200</Text>
          </View>
          <View style={styles.walletItem}>
            <Text style={styles.walletLabel}>Winning Amount</Text>
            <Text style={styles.walletValue}>৳ 700</Text>
          </View>
          <View style={styles.walletItem}>
            <Text style={styles.walletLabel}>Current Balance</Text>
            <Text style={styles.walletValue}>৳ 500</Text>
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.buttonText}>Add Money</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Withdraw Money</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sectionTitle}>Transaction History</Text>
        
        <View style={styles.transactionList}>
          {transactions.map(transaction => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>{transaction.description}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <Text style={[
                styles.transactionAmount,
                transaction.amount >= 0 ? styles.positive : styles.negative
              ]}>
                {transaction.amount >= 0 ? '+' : ''}৳ {Math.abs(transaction.amount)}
              </Text>
            </View>
          ))}
        </View>
        
        <View style={styles.supportInfo}>
          <Text style={styles.supportTitle}>WhatsApp Support</Text>
          <Text style={styles.supportNumber}>+880123456789</Text>
          <Text style={styles.supportNote}>(Don't Call)</Text>
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
  walletSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  walletItem: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  walletLabel: {
    color: '#ccc',
    marginBottom: 5,
  },
  walletValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff8a00',
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
  sectionTitle: {
    color: '#ff8a00',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  transactionList: {
    marginBottom: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontWeight: 'bold',
    color: '#ff8a00',
    marginBottom: 5,
  },
  transactionDate: {
    fontSize: 12,
    color: '#ccc',
  },
  transactionAmount: {
    fontWeight: 'bold',
  },
  positive: {
    color: 'lightgreen',
  },
  negative: {
    color: 'lightcoral',
  },
  supportInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  supportTitle: {
    color: '#ff8a00',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  supportNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff8a00',
    marginBottom: 10,
  },
  supportNote: {
    fontSize: 12,
    color: '#ccc',
  },
});

export default WalletScreen;
