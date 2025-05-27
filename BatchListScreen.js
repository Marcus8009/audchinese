// BatchListScreen.js - Enhanced Aesthetics with Multi-Column Support
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Dimensions, FlatList, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';
import sentences from './allSentences.json';

// Get screen dimensions for responsive design
const { width, height } = Dimensions.get('window');
const isTablet = width > 768;
const isWeb = Platform.OS === 'web';

// Define color scheme and metadata for HSK levels with gradients
const levelMeta = {
  'HSK1': { 
    color: '#4e9bea', 
    gradient: ['#4e9bea', '#3a7dca'],
    title: 'HSK 1 - Beginner Basics' 
  },
  'HSK2': { 
    color: '#5ec4a7', 
    gradient: ['#5ec4a7', '#48a88e'],
    title: 'HSK 2 - Elementary Level' 
  },
  'HSK3': { 
    color: '#e6b64c', 
    gradient: ['#e6b64c', '#d19d32'],
    title: 'HSK 3 - Intermediate Start' 
  },
  'HSK4': { 
    color: '#e67e4c', 
    gradient: ['#e67e4c', '#d16a38'],
    title: 'HSK 4 - Intermediate Level' 
  },
  'HSK5': { 
    color: '#bd62c9', 
    gradient: ['#bd62c9', '#a250af'],
    title: 'HSK 5 - Advanced Start' 
  },
  'HSK6': { 
    color: '#5266c9', 
    gradient: ['#5266c9', '#4153b0'],
    title: 'HSK 6 - Advanced Level' 
  },
  'HSK7': { 
    color: '#c95266', 
    gradient: ['#c95266', '#b04153'],
    title: 'HSK 7 - Professional Start' 
  },
  'HSK7_5': { 
    color: '#62c984', 
    gradient: ['#62c984', '#50b06f'],
    title: 'HSK 7.5 - Advanced Professional' 
  },
  'HSK8': { 
    color: '#c99e52', 
    gradient: ['#c99e52', '#b08a41'],
    title: 'HSK 8 - Expert Start' 
  },
  'HSK8_5': { 
    color: '#c9526d', 
    gradient: ['#c9526d', '#b0415a'],
    title: 'HSK 8.5 - Expert Intermediate' 
  },
  'HSK8_8': { 
    color: '#6d52c9', 
    gradient: ['#6d52c9', '#5a41b0'],
    title: 'HSK 8.8 - Expert Advanced' 
  },
  'HSK9': { 
    color: '#52aec9', 
    gradient: ['#52aec9', '#4195b0'],
    title: 'HSK 9 - Native Equivalent' 
  }
};

export default function BatchListScreen({ route, navigation }) {
  const { groupKey } = route.params;
  const level = levelMeta[groupKey] || { 
    color: '#4287f5', 
    gradient: ['#4287f5', '#2952a3'],
    title: groupKey 
  };
  
  // Find unique batches within this group
  const batchData = [];
  const sentencesByBatch = {};
  
  sentences.filter(s => s.group === groupKey).forEach(s => {
    if (!sentencesByBatch[s.batch]) {
      sentencesByBatch[s.batch] = [];
    }
    sentencesByBatch[s.batch].push(s);
  });
  
  Object.keys(sentencesByBatch).sort((a, b) => a - b).forEach(batchNum => {
    batchData.push({
      batchNum: parseInt(batchNum),
      count: sentencesByBatch[batchNum].length,
      examples: sentencesByBatch[batchNum].slice(0, 1),  // Always show exactly 1 example regardless of platform
      progress: Math.random() * 100, // Simulate progress (you should track real progress)
    });
  });

  // Determine number of columns based on platform and screen width
  const getNumColumns = () => {
    if (isWeb) {
      if (width > 1200) return 3;
      if (width > 768) return 2;
      return 1;
    }
    return isTablet ? 2 : 1;
  };
  
  const numColumns = getNumColumns();

  // Calculate consistent card width
  const getCardWidth = () => {
    const padding = 16 * 2; // Horizontal padding
    const gap = 16 * (numColumns - 1); // Gap between columns
    
    if (numColumns === 1) return width - padding;
    
    // For multiple columns, account for padding and gaps
    return (width - padding - gap) / numColumns;
  };
  
  const cardWidth = getCardWidth();

  const renderBatchCard = ({ item }) => {
    const progressWidth = `${item.progress}%`;
    
    return (
      <TouchableOpacity
        style={[
          styles.batchCard,
          { 
            borderLeftColor: level.color,
            width: isWeb ? '100%' : cardWidth,
          }
        ]}
        onPress={() => navigation.navigate('Flashcards', { 
          groupKey, 
          batchNum: item.batchNum 
        })}
        activeOpacity={0.86}
      >
        <View style={styles.batchHeader}>
          <View style={styles.batchTitleContainer}>
            <Text style={styles.batchTitle}>Batch {item.batchNum}</Text>
            <Text style={styles.batchCount}>{item.count} cards</Text>
          </View>
          <View style={styles.batchActions}>
            <TouchableOpacity 
              style={[styles.playButton, { backgroundColor: level.color }]}
              onPress={() => navigation.navigate('Flashcards', { 
                groupKey, 
                batchNum: item.batchNum,
                autoplay: true
              })}
            >
              <Ionicons name="play" size={isWeb ? 18 : 20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: progressWidth, backgroundColor: level.color }]} />
        </View>
        
        <View style={styles.examplesContainer}>
          {item.examples.map((sentence, index) => (
            <View key={index} style={styles.exampleItem}>
              <Text style={styles.exampleChinese}>{sentence.textChinese}</Text>
              <Text style={styles.examplePinyin}>{sentence.pinyin}</Text>
              <Text style={styles.exampleEnglish}>{sentence.textEnglish}</Text>
            </View>
          ))}
          
          {item.count > item.examples.length && (
            <Text style={styles.moreExamples}>+ {item.count - item.examples.length} more cards</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // Unified card wrapper component for both web and mobile
  const BatchCardWrapper = ({ item }) => {
    return (
      <View style={{ 
        marginBottom: 16,
        width: isWeb ? (numColumns > 1 ? `${100 / numColumns - 2}%` : '100%') : undefined
      }}>
        {renderBatchCard({ item })}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f1118' }}>
      <StatusBar barStyle="light-content" backgroundColor="#0f1118" />
      
      {/* Gradient header */}
      <LinearGradient
        colors={level.gradient || [level.color, `${level.color}dd`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.levelHeaderContainer}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={isWeb ? 24 : 26} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.levelHeaderContent}>
            <Text style={styles.levelHeaderTitle}>{level.title}</Text>
            <Text style={styles.levelHeaderSubtitle}>
              {batchData.length} {batchData.length === 1 ? 'batch' : 'batches'} • {
                batchData.reduce((sum, batch) => sum + batch.count, 0)
              } cards
            </Text>
          </View>
        </View>
      </LinearGradient>
      
      {/* Background gradient */}
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 150,
          zIndex: 1
        }}
      />
      
      {/* Use ScrollView on web to ensure scrolling works properly */}
      {isWeb ? (
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 20,
          }}
          showsVerticalScrollIndicator={true}
          alwaysBounceVertical={true}
        >
          <View style={{ 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            justifyContent: numColumns > 1 ? 'space-between' : 'center' 
          }}>
            {batchData.map((item) => (
              <BatchCardWrapper key={`batch-${item.batchNum}`} item={item} />
            ))}
          </View>
        </ScrollView>
      ) : (
        // Use FlatList on mobile where it works well
        <FlatList
          data={batchData}
          renderItem={({ item }) => <BatchCardWrapper item={item} />}
          keyExtractor={item => `batch-${item.batchNum}`}
          contentContainerStyle={{ 
            paddingHorizontal: 16, 
            paddingVertical: 20,
            alignItems: numColumns > 1 ? 'flex-start' : 'center'
          }}
          numColumns={numColumns}
          key={`${numColumns}-columns`}
          columnWrapperStyle={numColumns > 1 ? { 
            justifyContent: 'space-between', 
            width: '100%' 
          } : null}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      )}
    </SafeAreaView>
  );
}