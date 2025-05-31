// App.js - Combined App for Flashcard/Audio Player and Rebuild the English Sentence game

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import styles from './styles';
import sentences from './allSentences.json';
import { playSentence, unloadSound } from './audioPlayer';
import SentenceCard from './SentenceCard';
import dynamicAudioLoader from './dynamicAudioLoader';
import Feature1Screen from './Feature1Screen';
import Feature2Directory from './Feature2Directory';
import Feature2Screen from './Feature2Screen';

// Helper function to shuffle array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Helper function to extract words from English text
function extractWords(text) {
  return text
    .replace(/[.,!?;:'"]/g, "")
    .split(/\s+/)
    .filter(word => word.length > 0)
    .map(word => word.trim());
}

// Helper function to generate distractors from neighboring sentences
function generateDistractors(sentences, currentIndex, correctWords) {
  const distractors = new Set();

  // Get words from previous 2 sentences
  for (let i = Math.max(0, currentIndex - 2); i < currentIndex; i++) {
    const words = extractWords(sentences[i].textEnglish);
    words.forEach(word => {
      if (!correctWords.includes(word) && word.length > 1) {
        distractors.add(word);
      }
    });
  }

  // Get words from next 2 sentences
  for (let i = currentIndex + 1; i <= Math.min(sentences.length - 1, currentIndex + 2); i++) {
    const words = extractWords(sentences[i].textEnglish);
    words.forEach(word => {
      if (!correctWords.includes(word) && word.length > 1) {
        distractors.add(word);
      }
    });
  }

  // Add some common English words as fallback distractors
  const fallbackDistractors = [
    "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", 
    "with", "by", "from", "up", "down", "out", "off", "over", "under",
    "very", "quite", "really", "much", "many", "some", "all", "every",
    "can", "will", "would", "should", "could", "may", "might", "must",
    "do", "does", "did", "have", "has", "had", "be", "am", "is", "are", "was", "were"
  ];

  fallbackDistractors.forEach(word => {
    if (!correctWords.includes(word) && distractors.size < 15) {
      distractors.add(word);
    }
  });

  return Array.from(distractors);
}

// Process sentences to create questions
function buildQuestions(sentences) {
  return sentences.map((sentence, index) => {
    const correctWords = extractWords(sentence.textEnglish);
    const distractors = generateDistractors(sentences, index, correctWords);

    // Combine correct words with distractors and shuffle
    const allWords = [...correctWords, ...distractors.slice(0, 8)]; // Limit distractors
    const wordBank = shuffleArray(allWords);

    return {
      id: sentence.id,
      chinese: sentence.textChinese,
      pinyin: sentence.pinyin,
      english: sentence.textEnglish,
      correctWords: correctWords,
      wordBank: wordBank,
      group: sentence.group,
      batch: sentence.batch
    };
  });
}

export default function App({ route }) {
  // Feature toggle state
  const [feature, setFeature] = useState(1);

  // --- Feature 1 state ---
  const groupKey = route?.params?.groupKey || "HSK1";
  const batchNum = route?.params?.batchNum || 1;
  const [sentencesForBatch, setSentencesForBatch] = useState([]);
  const [batchLoading, setBatchLoading] = useState(true);
  const [batchAudioManifest, setBatchAudioManifest] = useState({});
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

  // --- Feature 2 state ---
  const [questions, setQuestions] = useState([]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- Feature 1: Flashcard/audio player logic ---
  useEffect(() => {
    if (feature !== 1) return;
    async function loadBatchData() {
      setBatchLoading(true);
      try {
        const batchSentences = sentences.filter(s => s.group === groupKey && s.batch === batchNum);
        setSentencesForBatch(batchSentences);
        const level = groupKey.replace('HSK', '');
        const audioManifest = await dynamicAudioLoader.createBatchAudioManifest(level, batchNum);
        setBatchAudioManifest(audioManifest);
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
  }, [feature, groupKey, batchNum]);

  useEffect(() => {
    if (feature !== 1) return;
    if (shuffleMode) {
      const newOrder = [...order].sort(() => Math.random() - 0.5);
      setOrder(newOrder);
    } else {
      setOrder([...Array(sentencesForBatch.length).keys()]);
    }
  }, [feature, shuffleMode, sentencesForBatch.length]);

  useEffect(() => {
    if (feature !== 1) return;
    if (isPlaying) {
      playSentence({
        index,
        bookmarks,
        order,
        sentences: sentencesForBatch,
        repeatEnglish,
        repeatChinese,
        audioManifest: batchAudioManifest,
        loopMode,
        manualMode,
        setIndex,
        soundRef,
        speed,
        unloadSound,
      });
    }
    return () => unloadSound(soundRef);
  }, [feature, index, isPlaying, speed, sentencesForBatch, repeatEnglish, repeatChinese, batchAudioManifest]);

  const next = () => setIndex(i => (i + 1) % sentencesForBatch.length);
  const prev = () => setIndex(i => (i - 1 + sentencesForBatch.length) % sentencesForBatch.length);

  // --- Feature 2: Game logic ---
  useEffect(() => {
    if (feature !== 2) return;
    setLoading(true);
    const loadedQuestions = buildQuestions(sentences);
    setQuestions(loadedQuestions);
    setLoading(false);
    setQuestionIdx(0);
    setSelectedWords([]);
    setScore(0);
    setFinished(false);
  }, [feature]);

  function handleWordPress(word) {
    setSelectedWords(prev => {
      if (prev.includes(word)) return prev;
      return [...prev, word];
    });
  }
  function handleReset() {
    setSelectedWords([]);
  }
  function handleCheck() {
    if (selectedWords.length === 0) {
      Alert.alert("No Answer", "Please select some words first!");
      return;
    }
    const answer = extractWords(questions[questionIdx].english);
    const correct = JSON.stringify(selectedWords) === JSON.stringify(answer);
    if (correct) {
      setScore(prev => prev + 1);
      Alert.alert("✅ Correct!", "Moving to next question...", [
        { text: "Continue", onPress: goToNext },
      ]);
      setTimeout(() => { goToNext(); }, 2000);
    } else {
      const correctAnswer = answer.join(" ");
      Alert.alert(
        "❌ Incorrect",
        `Correct answer: "${correctAnswer}"`,
        [
          { text: "Try Again", style: "cancel", onPress: () => setSelectedWords([]) },
          { text: "Next Question", onPress: goToNext },
        ]
      );
    }
  }
  function goToNext() {
    if (questionIdx < questions.length - 1) {
      setQuestionIdx(questionIdx + 1);
      setSelectedWords([]);
    } else {
      setFinished(true);
      setSelectedWords([]);
    }
  }
  function handleSkip() {
    Alert.alert(
      "Skip Question",
      "Are you sure you want to skip this question?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Skip", onPress: goToNext },
      ]
    );
  }
  function restartQuiz() {
    setScore(0);
    setQuestionIdx(0);
    setSelectedWords([]);
    setFinished(false);
    const reshuffledQuestions = buildQuestions(sentences);
    setQuestions(reshuffledQuestions);
  }

  // --- UI: Feature toggle ---
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
        <TouchableOpacity
          onPress={() => setFeature(1)}
          style={{
            backgroundColor: feature === 1 ? '#4287f5' : '#ccc',
            padding: 10,
            borderRadius: 5,
            marginRight: 10,
          }}
        >
          <Text style={{ color: '#fff' }}>Feature 1: Flashcards</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFeature(2)}
          style={{
            backgroundColor: feature === 2 ? '#4287f5' : '#ccc',
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: '#fff' }}>Feature 2: Sentence Game</Text>
        </TouchableOpacity>
      </View>

      {/* Feature 1: Flashcard/audio player */}
      {feature === 1 && (
        batchLoading ? (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#4287f5" />
          </View>
        ) : !sentencesForBatch.length ? (
          <View style={styles.container}>
            <Text style={{ color: "#fff", fontSize: 20, margin: 20 }}>
              No sentences found for this batch.
            </Text>
          </View>
        ) : (
          <View style={styles.container}>
            <SentenceCard
              index={index}
              dataList={order}
              displayIdx={order[index]}
              sentences={sentencesForBatch}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              next={next}
              prev={prev}
              bookmarks={bookmarks}
              toggleBookmark={() => {}}
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
        )
      )}

      {/* Feature 2: Sentence game */}
      {feature === 2 && (
        <Feature2Screen />
      )}
    </SafeAreaView>
  );
}