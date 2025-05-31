import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

const features = [
  { key: '1', title: 'Chinese Flashcards', description: 'Practice HSK flashcards', route: 'Directory' },
  { key: '2', title: 'Sentence Game', description: 'Rebuild the English sentence', route: 'Feature2Directory' },
  { key: '3', title: 'Feature 3', description: 'Coming soon', route: null },
  { key: '4', title: 'Feature 4', description: 'Coming soon', route: null },
  { key: '5', title: 'Feature 5', description: 'Coming soon', route: null },
];

export default function NavigationPage({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#161a23" />
      <Text style={styles.header}>Select a Feature</Text>
      <View style={styles.featuresContainer}>
        {features.map(f => (
          <TouchableOpacity
            key={f.key}
            style={[styles.featureButton, !f.route && styles.disabled]}
            onPress={() => f.route && navigation.navigate(f.route)}
            disabled={!f.route}
            activeOpacity={0.8}
          >
            <Text style={styles.featureTitle}>{f.title}</Text>
            <Text style={styles.featureDesc}>{f.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#161a23', alignItems: 'center', justifyContent: 'center' },
  header: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 32 },
  featuresContainer: { width: '90%' },
  featureButton: {
    backgroundColor: '#23283a',
    borderRadius: 16,
    padding: 24,
    marginBottom: 18,
    alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, elevation: 4,
  },
  disabled: { opacity: 0.5 },
  featureTitle: { color: '#4287f5', fontSize: 20, fontWeight: 'bold', marginBottom: 6 },
  featureDesc: { color: '#a4aec6', fontSize: 15 },
});
