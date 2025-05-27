// Updated audioPlayer.js for dynamic audio loading

import { Audio } from 'expo-av';

export async function playSentence({
  index,
  reviewMode,
  bookmarks,
  order,
  sentences,
  repeatEnglish = 1,
  repeatChinese = 2,
  muteEnglish,
  muteChinese,
  loopMode,
  manualMode,
  setIndex,
  soundRef,
  speed,
  volume,
  // Removed unloadSound parameter to avoid naming conflict
  audioManifest, // Changed from fixed import to passed parameter
}) {
  unloadSound(soundRef); // Now clearly refers to the exported function below

  const idx = reviewMode ? bookmarks[index] : order[index];
  const sentence = sentences[idx];

  // Get audio files from the manifest
  const engAudioKey = sentence.audioEnglish.replace('.mp3', '');
  const chiAudioKey = sentence.audioChinese.replace('.mp3', '');
  
  // Get the audio resources from the batch-specific manifest
  let engFile = null;
  let chiFile = null;
  
  try {
    if (audioManifest[engAudioKey] && repeatEnglish > 0) {
      engFile = audioManifest[engAudioKey].get ? 
               audioManifest[engAudioKey].get() : 
               audioManifest[engAudioKey];
    }
    
    if (audioManifest[chiAudioKey] && repeatChinese > 0) {
      chiFile = audioManifest[chiAudioKey].get ? 
               audioManifest[chiAudioKey].get() : 
               audioManifest[chiAudioKey];
    }
  } catch (error) {
    console.error(`Error loading audio files: ${error.message}`);
    // Continue with what we have - if files fail to load, we'll skip them
  }

  // Clean keys for logging
  const engKey = sentence.audioEnglish.replace('.mp3', '');
  const chiKey = sentence.audioChinese.replace('.mp3', '');
  
  if ((!engFile && repeatEnglish > 0) || (!chiFile && repeatChinese > 0)) {
    console.warn('Missing audio for', engKey, chiKey);
    return;
  }

  // Balance Chinese repeats
  const preChinese = Math.ceil(repeatChinese / 2);
  const postChinese = repeatChinese - preChinese;

  try {
    // Pre-Chinese
    for (let i = 0; i < preChinese; i++) {
      if (!muteChinese && chiFile) {
        await playClip(chiFile, soundRef, speed, volume);
      }
    }
    // English
    for (let i = 0; i < repeatEnglish; i++) {
      if (!muteEnglish && engFile) {
        await playClip(engFile, soundRef, speed, volume);
      }
    }
    // Post-Chinese
    for (let i = 0; i < postChinese; i++) {
      if (!muteChinese && chiFile) {
        await playClip(chiFile, soundRef, speed, volume);
      }
    }

    // Advance index
    if (loopMode || (!manualMode && index < sentences.length - 1)) {
      setIndex(i => (i + 1) % sentences.length);
    }
  } catch (e) {
    console.error('Error during audio playback:', e);
  }
}

export async function playClip(file, soundRef, speed, volume = 1.0) {
  try {
    const { sound } = await Audio.Sound.createAsync(file, {
      volume,
      rate: speed,
      shouldCorrectPitch: true,
    });
    soundRef.current = sound;
    return new Promise(resolve => {
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.didJustFinish) {
          sound.unloadAsync().then(() => resolve());
        }
      });
      sound.playAsync().catch(error => {
        console.error('Error playing sound:', error);
        resolve(); // Resolve anyway so the sequence continues
      });
    });
  } catch (error) {
    console.error('Error creating sound:', error);
    return Promise.resolve(); // Return resolved promise to continue the sequence
  }
}

export function unloadSound(soundRef) {
  if (soundRef.current) {
    try {
      soundRef.current.unloadAsync();
    } catch (error) {
      console.error('Error unloading sound:', error);
    }
    soundRef.current = null;
  }
}