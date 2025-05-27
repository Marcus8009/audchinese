// DirectoryScreen.js - Enhanced with Dark Theme Aesthetic
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, StatusBar, SafeAreaView, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';
import sentences from './allSentences.json';

// Get screen dimensions for responsive design
const { width, height } = Dimensions.get('window');
const isTablet = width > 768;
const isWeb = Platform.OS === 'web';
const IS_LANDSCAPE = width > height;

// Enhanced color scheme from styles.js
const COLORS = {
  BLUE: '#4287f5',
  BLUE_DARK: '#2952a3',
  BG_DARK: '#0f1118',
  CARD_BG: '#1c2030',
  TEXT_PRIMARY: '#ffffff',
  TEXT_SECONDARY: '#a4aec6',
  TEXT_HEADER: '#e7ecf5',
  DANGER: '#fc5252',
  SUCCESS: '#19e68c',
  DISABLED: '#383e52',
};

// Get unique groups present in the data
const groupOrder = [
  "HSK1", "HSK2", "HSK3", "HSK4", "HSK5", "HSK6",
  "HSK7", "HSK7_5", "HSK8", "HSK8_5", "HSK8_8", "HSK9"
];

// Enhanced metadata with beautiful gradients and icons
const groupMeta = {
  HSK1: { 
    title: 'HSK 1', 
    subtitle: 'Beginner Basics', 
    description: 'Essential vocabulary and simple phrases for absolute beginners',
    color: '#4e9bea',
    gradient: ['#4e9bea', '#3a7dca'],
    darkGradient: ['rgba(78, 155, 234, 0.2)', 'rgba(58, 125, 202, 0.1)'],
    iconName: 'school-outline',
    level: 'Beginner'
  },
  HSK2: { 
    title: 'HSK 2', 
    subtitle: 'Elementary Level', 
    description: 'Basic communication for daily situations',
    color: '#5ec4a7',
    gradient: ['#5ec4a7', '#48a88e'],
    darkGradient: ['rgba(94, 196, 167, 0.2)', 'rgba(72, 168, 142, 0.1)'],
    iconName: 'chatbubble-outline',
    level: 'Elementary'
  },
  HSK3: { 
    title: 'HSK 3', 
    subtitle: 'Intermediate Start', 
    description: 'Expanded vocabulary for everyday topics',
    color: '#e6b64c',
    gradient: ['#e6b64c', '#d19d32'],
    darkGradient: ['rgba(230, 182, 76, 0.2)', 'rgba(209, 157, 50, 0.1)'],
    iconName: 'bicycle-outline',
    level: 'Pre-Intermediate'
  },
  HSK4: { 
    title: 'HSK 4', 
    subtitle: 'Intermediate Level', 
    description: 'Complex conversations and opinions',
    color: '#e67e4c',
    gradient: ['#e67e4c', '#d16a38'],
    darkGradient: ['rgba(230, 126, 76, 0.2)', 'rgba(209, 106, 56, 0.1)'],
    iconName: 'cafe-outline',
    level: 'Intermediate'
  },
  HSK5: { 
    title: 'HSK 5', 
    subtitle: 'Advanced Start', 
    description: 'Abstract concepts and professional topics',
    color: '#bd62c9',
    gradient: ['#bd62c9', '#a250af'],
    darkGradient: ['rgba(189, 98, 201, 0.2)', 'rgba(162, 80, 175, 0.1)'],
    iconName: 'rocket-outline',
    level: 'Upper-Intermediate'
  },
  HSK6: { 
    title: 'HSK 6', 
    subtitle: 'Advanced Level', 
    description: 'Nuanced expression and academic content',
    color: '#5266c9',
    gradient: ['#5266c9', '#4153b0'],
    darkGradient: ['rgba(82, 102, 201, 0.2)', 'rgba(65, 83, 176, 0.1)'],
    iconName: 'trophy-outline',
    level: 'Advanced'
  },
  HSK7: { 
    title: 'HSK 7', 
    subtitle: 'Professional Start', 
    description: 'Professional and specialized terminology',
    color: '#c95266',
    gradient: ['#c95266', '#b04153'],
    darkGradient: ['rgba(201, 82, 102, 0.2)', 'rgba(176, 65, 83, 0.1)'],
    iconName: 'briefcase-outline',
    level: 'Professional'
  },
  HSK7_5: { 
    title: 'HSK 7.5', 
    subtitle: 'Advanced Professional', 
    description: 'Advanced business and specialized contexts',
    color: '#62c984',
    gradient: ['#62c984', '#50b06f'],
    darkGradient: ['rgba(98, 201, 132, 0.2)', 'rgba(80, 176, 111, 0.1)'],
    iconName: 'business-outline',
    level: 'Advanced Professional'
  },
  HSK8: { 
    title: 'HSK 8', 
    subtitle: 'Expert Start', 
    description: 'Literary and cultural proficiency',
    color: '#c99e52',
    gradient: ['#c99e52', '#b08a41'],
    darkGradient: ['rgba(201, 158, 82, 0.2)', 'rgba(176, 138, 65, 0.1)'],
    iconName: 'library-outline',
    level: 'Expert'
  },
  HSK8_5: { 
    title: 'HSK 8.5', 
    subtitle: 'Expert Intermediate', 
    description: 'Refined expression and cultural nuance',
    color: '#c9526d',
    gradient: ['#c9526d', '#b0415a'],
    darkGradient: ['rgba(201, 82, 109, 0.2)', 'rgba(176, 65, 90, 0.1)'],
    iconName: 'diamond-outline',
    level: 'Expert+'
  },
  HSK8_8: { 
    title: 'HSK 8.8', 
    subtitle: 'Expert Advanced', 
    description: 'Expert-advanced fluency in complex topics',
    color: '#6d52c9',
    gradient: ['#6d52c9', '#5a41b0'],
    darkGradient: ['rgba(109, 82, 201, 0.2)', 'rgba(90, 65, 176, 0.1)'],
    iconName: 'flash-outline',
    level: 'Expert++'
  },
  HSK9: { 
    title: 'HSK 9', 
    subtitle: 'Expert Complete', 
    description: 'Expert with complete communication in all contexts',
    color: '#52aec9',
    gradient: ['#52aec9', '#4195b0'],
    darkGradient: ['rgba(82, 174, 201, 0.2)', 'rgba(65, 149, 176, 0.1)'],
    iconName: 'crown-outline',
    level: 'Native-like'
  }
};

// Filter groups that exist in our data
const groups = groupOrder
  .filter(key => sentences.some(s => s.group === key))
  .map(key => ({
    key,
    ...groupMeta[key],
    count: sentences.filter(s => s.group === key).length,
    batchCount: Math.ceil(sentences.filter(s => s.group === key).length / 100)
  }));

export default function DirectoryScreen({ navigation }) {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.BG_DARK }]}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.BG_DARK} />
      
      {/* Enhanced header with gradient */}
      <LinearGradient
        colors={[COLORS.BLUE, COLORS.BLUE_DARK]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.headerContainer, {
          paddingTop: isWeb ? 40 : 50,
          paddingBottom: 24,
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <View style={[styles.levelIconContainer, {
            backgroundColor: 'rgba(255,255,255,0.25)',
            borderColor: 'rgba(255,255,255,0.3)',
            marginRight: 12,
            width: isWeb ? 36 : 40,
            height: isWeb ? 36 : 40,
            borderRadius: isWeb ? 18 : 20,
          }]}>
            <Ionicons name="library-outline" size={isWeb ? 18 : 20} color="#fff" />
          </View>
          <View>
            <Text style={[styles.headerTitle, {
              color: COLORS.TEXT_PRIMARY,
              fontSize: isWeb ? 24 : 28,
              fontWeight: '700',
              letterSpacing: 0.5,
              textShadowColor: 'rgba(0,0,0,0.3)',
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 4,
            }]}>
              Chinese Flashcards
            </Text>
            <Text style={[styles.headerSubtitle, {
              color: 'rgba(255,255,255,0.9)',
              fontSize: isWeb ? 15 : 17,
              fontWeight: '500',
              letterSpacing: 0.3,
            }]}>
              Select your proficiency level
            </Text>
          </View>
        </View>
      </LinearGradient>
      
      {/* Background gradient overlay */}
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 180,
          zIndex: 1
        }}
      />
      
      <ScrollView 
        style={[styles.scrollContainer, { backgroundColor: COLORS.BG_DARK }]}
        contentContainerStyle={[styles.scrollContent, {
          paddingVertical: 24,
          paddingHorizontal: 16,
          paddingBottom: 40,
        }]}
        showsVerticalScrollIndicator={true}
        alwaysBounceVertical={true}
        overScrollMode="always"
      >
        <View style={styles.directoryGrid}>
          {groups.map((group, index) => (
            <TouchableOpacity
              key={group.key}
              onPress={() => navigation.navigate('BatchList', { groupKey: group.key })}
              activeOpacity={0.86}
              style={[styles.levelCard, {
                backgroundColor: COLORS.CARD_BG,
                borderRadius: 18,
                marginBottom: 16,
                width: '100%',
                height: isWeb ? 140 : 150,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 8,
                overflow: 'hidden',
                position: 'relative',
              }]}
            >
              {/* Decorative background elements */}
              <View style={{
                position: 'absolute',
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: 'rgba(255,255,255,0.04)',
                top: -40,
                right: -40,
              }} />
              <View style={{
                position: 'absolute',
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: 'rgba(255,255,255,0.02)',
                bottom: -20,
                left: -20,
              }} />
              
              {/* Gradient overlay */}
              <LinearGradient
                colors={group.darkGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.8,
                }}
              />
              
              <View style={[styles.levelCardContent, {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 20,
                zIndex: 1,
              }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  {/* Enhanced icon container */}
                  <LinearGradient
                    colors={group.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.levelIconContainer, {
                      width: isWeb ? 50 : 56,
                      height: isWeb ? 50 : 56,
                      borderRadius: isWeb ? 25 : 28,
                      marginRight: 16,
                      shadowColor: group.color,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.4,
                      shadowRadius: 8,
                      elevation: 6,
                    }]}
                  >
                    <Ionicons 
                      name={group.iconName || 'book-outline'} 
                      size={isWeb ? 22 : 26} 
                      color="#fff" 
                    />
                  </LinearGradient>
                  
                  <View style={styles.levelTextContent}>
                    <Text style={[styles.levelTitle, {
                      color: COLORS.TEXT_PRIMARY,
                      fontSize: isWeb ? 18 : 22,
                      fontWeight: '700',
                      letterSpacing: 0.5,
                      marginBottom: 4,
                    }]}>
                      {group.title}
                    </Text>
                    <Text style={[styles.levelSubtitle, {
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: isWeb ? 13 : 16,
                      fontWeight: '600',
                      marginBottom: 8,
                      letterSpacing: 0.3,
                    }]}>
                      {group.subtitle}
                    </Text>
                    
                    {/* Enhanced stats container */}
                    <View style={styles.levelStatsContainer}>
                      <MaterialCommunityIcons 
                        name="cards-outline" 
                        size={isWeb ? 14 : 16} 
                        color={COLORS.TEXT_SECONDARY} 
                        style={[styles.statsIcon, { opacity: 0.8 }]}
                      />
                      <Text style={[styles.levelStats, {
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: isWeb ? 12 : 14,
                        fontWeight: '500',
                        letterSpacing: 0.2,
                      }]}>
                        {group.count} cards • {group.batchCount} batches
                      </Text>
                    </View>
                    
                    {/* Add level indicator */}
                    <View style={{
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      borderRadius: 12,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      alignSelf: 'flex-start',
                      marginTop: 6,
                    }}>
                      <Text style={{
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: isWeb ? 10 : 12,
                        fontWeight: '600',
                        letterSpacing: 0.3,
                      }}>
                        {group.level}
                      </Text>
                    </View>
                  </View>
                </View>
                
                {/* Enhanced arrow with background */}
                <View style={[styles.cardArrow, {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 18,
                  padding: 8,
                }]}>
                  <Ionicons 
                    name="chevron-forward" 
                    size={isWeb ? 18 : 20} 
                    color="rgba(255,255,255,0.8)" 
                  />
                </View>
              </View>
              
              {/* Progress indicator (simulated) */}
              <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 3,
                backgroundColor: 'rgba(255,255,255,0.1)',
              }}>
                <View style={{
                  height: '100%',
                  width: `${Math.random() * 60 + 20}%`, // Simulated progress
                  backgroundColor: group.color,
                  borderRadius: 3,
                }} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Add footer info */}
        <View style={{
          marginTop: 20,
          padding: 20,
          backgroundColor: 'rgba(255,255,255,0.02)',
          borderRadius: 16,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.05)',
        }}>
          <Text style={{
            color: COLORS.TEXT_SECONDARY,
            fontSize: isWeb ? 13 : 15,
            textAlign: 'center',
            lineHeight: 20,
            letterSpacing: 0.3,
          }}>
            Total: {groups.reduce((sum, group) => sum + group.count, 0)} flashcards across {groups.length} levels
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}