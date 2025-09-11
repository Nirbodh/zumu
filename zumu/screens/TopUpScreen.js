import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  Switch 
} from 'react-native';
import Header from '../components/Header';
import StatusBar from '../components/StatusBar';

const TopUpScreen = () => {
  const [playerId, setPlayerId] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [usePoints, setUsePoints] = useState(false);

  const diamondPackages = [
    { id: 1, diamonds: 100, price: 0.99 },
    { id: 2, diamonds: 310, price: 2.99 },
    { id: 3, diamonds: 520, price: 4.99 },
    { id: 4, diamonds: 1060, price: 9.99 }
  ];

  const paymentMethods = [
    { id: 'bkash', name: 'bKash' },
    { id: 'nagad', name: 'Nagad' },
    { id: 'rocket', name: 'Rocket' },
    { id: 'paypal', name: 'PayPal' }
  ];

  const handleTopUp = () => {
    // Will be implemented later
    console.log('Top-up initiated:', {
      playerId,
      selectedPackage,
      paymentMethod,
      usePoints
    });
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
          <Text style={styles.label}>Enter Player ID</Text>
          <TextInput
            style={styles.input}
            value={playerId}
            onChangeText={setPlayerId}
            placeholder="Your game player ID"
            placeholderTextColor="#ccc"
          />
        </View>

        <Text style={styles.sectionTitle}>Select Diamond Package</Text>
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

        {/* bKash Number Section - Added based on HTML file */}
        <View style={styles.bkashSection}>
          <Text style={styles.bkashTitle}>Send Money via bKash</Text>
          <View style={styles.bkashNumberContainer}>
            <Text style={styles.bkashNumber}>01751332386</Text>
          </View>
          <Text style={styles.bkashInstruction}>
            Use your bKash app to send money to this number
          </Text>
          <Text style={styles.bkashNote}>
            After sending, write the transaction ID below
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentMethods}>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentOption,
                paymentMethod === method.id && styles.paymentOptionActive
              ]}
              onPress={() => setPaymentMethod(method.id)}
            >
              <Text style={styles.paymentText}>{method.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadText}>Choose File</Text>
          <Text style={styles.uploadSubtext}>Upload Payment Screenshot</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleTopUp}
        >
          <Text style={styles.submitText}>Submit Top-Up</Text>
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
  // New styles for bKash section
  bkashSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  bkashTitle: {
    color: '#ff8a00',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
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
  bkashNote: {
    color: '#ff8a00',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
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
    borderColor: '#ff8a00',
    backgroundColor: 'rgba(255, 138, 0, 0.2)',
  },
  paymentText: {
    color: '#ccc',
    fontWeight: 'bold',
  },
  uploadButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ff8a00',
    borderStyle: 'dashed',
  },
  uploadText: {
    color: '#ff8a00',
    fontWeight: 'bold',
    fontSize: 16,
  },
  uploadSubtext: {
    color: '#ccc',
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: '#ff8a00',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TopUpScreen;