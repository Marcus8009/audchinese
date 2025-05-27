// SentenceCard.js - Enhanced Aesthetics with Larger Full-Screen Card
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';
import SettingsModal from './SettingsModal';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

export default function SentenceCard({
  sentences,
  displayIdx,
  index,
  dataList,
  isPlaying,
  setIsPlaying,
  next,
  prev,
  bookmarks,
  toggleBookmark,
  loopMode, setLoopMode,
  shuffleMode, setShuffleMode,
  manualMode, setManualMode,
  showEnglish, setShowEnglish,
  showPinyin, setShowPinyin,
  speed, increaseSpeed, decreaseSpeed,
  repeatEnglish, setRepeatEnglish,
  repeatChinese, setRepeatChinese,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1)); // For fade animations
  
  // Handle character animation when sentence changes
  React.useEffect(() => {
    // Start with fade out
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 150,
        useNativeDriver: true,
      }),
      // Then fade back in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  }, [displayIdx]);

  // Create progress dots for visual feedback of card position
  const renderProgressDots = () => {
    const totalDots = Math.min(sentences.length, 10); // Show max 10 dots
    const currentGroup = Math.floor(index / 10);
    const dots = [];
    
    for (let i = 0; i < totalDots; i++) {
      const dotIndex = currentGroup * 10 + i;
      const isActive = dotIndex === index;
      
      if (dotIndex < sentences.length) {
        dots.push(
          <View 
            key={i}
            style={isActive ? styles.progressDotActive : styles.progressDotActive} 
          />
        );
      }
    }
    
    return (
      <View style={styles.progressIndicator}>
        {dots}
        {sentences.length > 10 && (
          <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginLeft: 8 }}>
            {index + 1}/{sentences.length}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <LinearGradient
        colors={['#1c2030', '#0f1118']}
        style={[styles.card, { width: width * 0.95, height: height * 0.75 }]} // Larger full-screen card
      >
        {/* Decorative pattern */}
        <View style={styles.cardPattern}>
          <MaterialCommunityIcons name="translate" size={80} color="#fff" />
        </View>
        
        {/* Pinyin */}
        {showPinyin && (
          <Animated.Text 
            style={[
              styles.pinyin,
              { opacity: fadeAnim }
            ]}
          >
            {sentences[displayIdx]?.pinyin || ''}
          </Animated.Text>
        )}
        
        {/* Chinese Characters with animation */}
        <Animated.Text 
          style={[
            styles.chinese,
            { 
              opacity: fadeAnim,
              transform: [
                { scale: fadeAnim.interpolate({
                  inputRange: [0.3, 1],
                  outputRange: [0.9, 1]
                })}
              ]
            }
          ]}
        >
          {sentences[displayIdx]?.textChinese}
        </Animated.Text>
        
        {/* English Translation */}
        {showEnglish && (
          <Animated.Text style={[styles.english, { opacity: fadeAnim }]}>
            {sentences[displayIdx]?.textEnglish}
          </Animated.Text>
        )}

        <View style={styles.controlsRow}>
          {/* Play/Pause with better styling */}
          <TouchableOpacity
            style={[
              styles.iconButton,
              isPlaying ? styles.iconButtonDanger : styles.iconButtonSuccess
            ]}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={34} color="#fff" />
          </TouchableOpacity>

          {/* Previous */}
          <TouchableOpacity 
            style={[styles.iconButton, styles.iconButtonSecondary]} 
            onPress={prev}
          >
            <Ionicons name="chevron-back" size={34} color="#fff" />
          </TouchableOpacity>

          {/* Next */}
          <TouchableOpacity 
            style={[styles.iconButton, styles.iconButtonSecondary]} 
            onPress={next}
          >
            <Ionicons name="chevron-forward" size={34} color="#fff" />
          </TouchableOpacity>

          {/* Settings with improved styling */}
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: '#5266c9' }]} 
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="settings" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Progress indicator */}
        {renderProgressDots()}
      </LinearGradient>

      {/* Settings Modal - keeping original for now */}
      <SettingsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        loopMode={loopMode}
        setLoopMode={setLoopMode}
        shuffleMode={shuffleMode}
        setShuffleMode={setShuffleMode}
        manualMode={manualMode}
        setManualMode={setManualMode}
        showEnglish={showEnglish}
        setShowEnglish={setShowEnglish}
        showPinyin={showPinyin}
        setShowPinyin={setShowPinyin}
        speed={speed}
        increaseSpeed={increaseSpeed}
        decreaseSpeed={decreaseSpeed}
        repeatEnglish={repeatEnglish}
        setRepeatEnglish={setRepeatEnglish}
        repeatChinese={repeatChinese}
        setRepeatChinese={setRepeatChinese}
      />
    </View>
  );
}