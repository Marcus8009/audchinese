// Updated App.js with dynamic audio loading

import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import styles from './styles';
import sentences from './allSentences.json';
import { playSentence, unloadSound } from './audioPlayer';
import SentenceCard from './SentenceCard';
import dynamicAudioLoader from './dynamicAudioLoader';

export default function App({ route }) {
  const { groupKey, batchNum } = route.params;
  const [sentencesForBatch, setSentencesForBatch] = useState([]);
  const [batchLoading, setBatchLoading] = useState(true);
  const [batchAudioManifest, setBatchAudioManifest] = useState({});

  // Flashcard state as before...
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loopMode, setLoopMode] = useState(true);
  const [shuffleMode, setShuffleMode] = useState(true);
  const [manualMode, setManualMode] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showEnglish, setShowEnglish] = useState(true);
  const [showPinyin, setShowPinyin] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [order, setOrder] = useState([]);
  const soundRef = useRef(null);
  const [repeatEnglish, setRepeatEnglish] = useState(1);
  const [repeatChinese, setRepeatChinese] = useState(2);

  // Load sentences and audio manifest for the current group+batch
  useEffect(() => {
    async function loadBatchData() {
      setBatchLoading(true);
      try {
        // 1. Filter sentences for the current batch
        const batchSentences = sentences.filter(s => s.group === groupKey && s.batch === batchNum);
        setSentencesForBatch(batchSentences);
        
        // 2. Extract HSK level from groupKey (e.g. "HSK1" -> "1")
        const level = groupKey.replace('HSK', '');
        
        // 3. Generate a batch-specific audio manifest
        // This will only include the audio files needed for this batch
        const audioManifest = await dynamicAudioLoader.createBatchAudioManifest(level, batchNum);
        setBatchAudioManifest(audioManifest);
        
        // 4. Reset state
        setOrder([...Array(batchSentences.length).keys()]);
        setIndex(0);
        setBookmarks([]);
        setBatchLoading(false);
      } catch (error) {
        console.error("Error loading batch data:", error);
        setBatchLoading(false);
      }
    }
    
    loadBatchData();
  }, [groupKey, batchNum]);

  useEffect(() => {
    if (shuffleMode) {
      const newOrder = [...order].sort(() => Math.random() - 0.5);
      setOrder(newOrder);
    } else {
      setOrder([...Array(sentencesForBatch.length).keys()]);
    }
  }, [shuffleMode, sentencesForBatch.length]);

  useEffect(() => {
    if (isPlaying) {
      playSentence({
        index,
        bookmarks,
        order,
        sentences: sentencesForBatch,
        repeatEnglish,
        repeatChinese,
        audioManifest: batchAudioManifest, // Use the batch-specific manifest
        loopMode,
        manualMode,
        setIndex,
        soundRef,
        speed,
        unloadSound,
      });
    }
    return () => unloadSound(soundRef);
  }, [index, isPlaying, speed, sentencesForBatch, repeatEnglish, repeatChinese, batchAudioManifest]);

  const next = () => setIndex(i => (i + 1) % sentencesForBatch.length);
  const prev = () => setIndex(i => (i - 1 + sentencesForBatch.length) % sentencesForBatch.length);

  // UI remains the same...
  if (batchLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4287f5" />
      </View>
    );
  }
  if (!sentencesForBatch.length) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff", fontSize: 20, margin: 20 }}>
          No sentences found for this batch.
        </Text>
      </View>
    );
  }
  const dataList = order;
  const displayIdx = dataList[index];

  return (
    <View style={styles.container}>
      <SentenceCard
        index={index}
        dataList={dataList}
        displayIdx={displayIdx}
        sentences={sentencesForBatch}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        next={next}
        prev={prev}
        bookmarks={bookmarks}
        toggleBookmark={() => {}} // You can remove bookmark functionality
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
        increaseSpeed={() => setSpeed(s => Math.min(3.0, Math.round((s + 0.1) * 10) / 10))}
        decreaseSpeed={() => setSpeed(s => Math.max(0.10, Math.round((s - 0.1) * 10) / 10))}
        repeatEnglish={repeatEnglish}
        setRepeatEnglish={setRepeatEnglish}
        repeatChinese={repeatChinese}
        setRepeatChinese={setRepeatChinese}
        setIndex={setIndex}
      />
    </View>
  );
}

