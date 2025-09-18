import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  Switch,
  Alert,
  ActivityIndicator
} from 'react-native';
import Header from '../components/Header';
import StatusBar from '../components/StatusBar';
import { api } from '../utils/api';

const TopUpScreen = () => {
  const [playerId, setPlayerId] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [usePoints, setUsePoints] = useState(false);
  const [showBkashNumber, setShowBkashNumber] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [loading, setLoading] = useState(false);

  const diamondPackages = [
    { id: 1, diamonds: 100, price: 0.99 },
    { id: 2, diamonds: 310, price: 2.99 },
    { id: 3, diamonds: 520, price: 4.99 },
    { id: 4, diamonds: 1060, price: 9.99 }
  ];

  const paymentMethods = [
    { id: 'bkash', name: 'bKash', color: '#e2136e' },
    { id: 'nagad', name: 'Nagad', color: '#f60' },
    { id: 'rocket', name: 'Rocket', color: '#784bd1' },
    { id: 'paypal', name: 'PayPal', color: '#0070ba' }
  ];

  const handleTopUp = async () => {
    if (!playerId || !selectedPackage || !paymentMethod) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if (paymentMethod === 'bkash' && !transactionId) {
      Alert.alert('Error', 'Please enter your transaction ID');
      return;
    }

    try {
      setLoading(true);
      await api('/wallet/topup', {
        method: 'POST',
        body: {
          playerId,
          package: selectedPackage,
          paymentMethod,
          transactionId,
          usePoints
        }
      });

      Alert.alert('Success', 'Top-up request submitted successfully!');
      // Reset form
      setPlayerId('');
      setSelectedPackage(null);
      setPaymentMethod('');
      setTransactionId('');
      setUsePoints(false);
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header title="Free Top-Up" subtitle="Fast & Secure Diamond Delivery" />
        
        <StatusBar 
          username="ovimahathirmohammad" 
          balance={500} 
        />
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Enter Player ID *</Text>
          <TextInput
            style={styles.input}
            value={playerId}
            onChangeText={setPlayerId}
            placeholder="Your game player ID"
            placeholderTextColor="#ccc"
          />
        </View>

        <Text style={styles.sectionTitle}>Select Diamond Package *</Text>
        <View style={styles.packageGrid}>
          {diamondPackages.map((pkg) => (
            <TouchableOpacity
              key={pkg.id}
              style={[
                styles.packageCard,
                selectedPackage === pkg.id && styles.packageCardActive
              ]}
              onPress={() => setSelectedPackage(pkg.id)}
            >
              <Text style={styles.diamondAmount}>{pkg.diamonds}</Text>
              <Text style={styles.packagePrice}>${pkg.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.pointsSection}>
          <Text style={styles.pointsText}>per diamond* xdbt /$= [ 500 ]</Text>
          <Text style={styles.pointsSubtext}>buy/p....</Text>
          
          <View style={styles.pointsToggle}>
            <Text style={styles.toggleText}>buy by your point</Text>
            <Switch
              value={usePoints}
              onValueChange={setUsePoints}
              trackColor={{ false: '#767577', true: '#ff8a00' }}
              thumbColor={usePoints ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Payment Method *</Text>
        <View style={styles.paymentMethods}>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentOption,
                paymentMethod === method.id && styles.paymentOptionActive,
                { borderColor: method.color }
              ]}
              onPress={() => setPaymentMethod(method.id)}
            >
              <Text style={[
                styles.paymentText,
                paymentMethod === method.id && { color: method.color }
              ]}>
                {method.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {paymentMethod === 'bkash' && (
          <View style={styles.bkashSection}>
            <TouchableOpacity 
              style={styles.showNumberBtn}
              onPress={() => setShowBkashNumber(!showBkashNumber)}
            >
              <Text style={styles.showNumberText}>
                {showBkashNumber ? 'Hide bKash Number' : 'Show bKash Number'}
              </Text>
            </TouchableOpacity>
            
            {showBkashNumber && (
              <>
                <View style={styles.bkashNumberContainer}>
                  <Text style={styles.bkashNumber}>01751332386</Text>
                </View>
                <Text style={styles.bkashInstruction}>
                  Use your bKash app to send money to this number
                </Text>
                
                <Text style={styles.label}>Transaction ID *</Text>
                <TextInput
                  style={styles.input}
                  value={transactionId}
                  onChangeText={setTransactionId}
                  placeholder="Enter your transaction ID"
                  placeholderTextColor="#ccc"
                />
              </>
            )}
          </View>
        )}

        <TouchableOpacity 
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleTopUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Submit Top-Up</Text>
          )}
        </TouchableOpacity>
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
  formGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#ff8a00',
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: '#ff8a00',
    borderRadius: 8,
    padding: 12,
    color: 'white',
    fontSize: 16,
  },
  sectionTitle: {
    color: '#ff8a00',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  packageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  packageCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  packageCardActive: {
    borderColor: '#ff8a00',
    backgroundColor: 'rgba(255, 138, 0, 0.2)',
  },
  diamondAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff8a00',
    marginBottom: 5,
  },
  packagePrice: {
    color: '#ccc',
    fontSize: 16,
  },
  pointsSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  pointsText: {
    color: '#ff8a00',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pointsSubtext: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 15,
  },
  pointsToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleText: {
    color: '#ccc',
  },
  paymentMethods: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentOption: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  paymentOptionActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  paymentText: {
    color: '#ccc',
    fontWeight: 'bold',
  },
  bkashSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  showNumberBtn: {
    backgroundColor: '#ff8a00',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  showNumberText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bkashNumberContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
  },
  bkashNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff8a00',
    textAlign: 'center',
  },
  bkashInstruction: {
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 5,
  },
  submitButton: {
    backgroundColor: '#ff8a00',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#666',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TopUpScreen;