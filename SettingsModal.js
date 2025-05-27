import React from 'react';
import { Modal, View, Text, Switch, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import styles from './styles';

const { width, height } = Dimensions.get('window');
const IS_LANDSCAPE = width > height;

export default function SettingsModal({
  visible, onClose,
  loopMode, setLoopMode,
  shuffleMode, setShuffleMode,
  manualMode, setManualMode,
  showEnglish, setShowEnglish,
  showPinyin, setShowPinyin,
  speed, increaseSpeed, decreaseSpeed,
  repeatEnglish, setRepeatEnglish,
  repeatChinese, setRepeatChinese,
}) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView
            contentContainerStyle={{ alignItems: 'center', paddingBottom: 30 }}
            showsVerticalScrollIndicator={false}
            style={{ width: '100%' }}
          >
            <Text style={{fontSize: 22, color: "#fff", fontWeight: 'bold', marginBottom: 20}}>Settings</Text>
            <View style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between'
            }}>
              {/* Left column */}
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={styles.group}>
                  <Text style={styles.controlLabel}>Loop</Text>
                  <Switch value={loopMode} onValueChange={setLoopMode} />
                </View>
                <View style={styles.group}>
                  <Text style={styles.controlLabel}>Manual</Text>
                  <Switch value={manualMode} onValueChange={setManualMode} />
                </View>
                <View style={styles.group}>
                  <Text style={styles.controlLabel}>Show English</Text>
                  <Switch value={showEnglish} onValueChange={setShowEnglish} />
                </View>
                <View style={styles.group}>
                  <Text style={styles.controlLabel}>Repeat English</Text>
                  <Text style={styles.valueText}>x{repeatEnglish}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => setRepeatEnglish(re => Math.max(0, re - 1))}>
                      <Text style={{fontSize: 20, color: "#fff"}}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => setRepeatEnglish(re => Math.min(3, re + 1))}>
                      <Text style={{fontSize: 20, color: "#fff"}}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* Right column */}
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={styles.group}>
                  <Text style={styles.controlLabel}>Shuffle</Text>
                  <Switch value={shuffleMode} onValueChange={setShuffleMode} />
                </View>
                <View style={styles.group}>
                  <Text style={styles.controlLabel}>Show Pinyin</Text>
                  <Switch value={showPinyin} onValueChange={setShowPinyin} />
                </View>
                <View style={styles.group}>
                  <Text style={styles.controlLabel}>Speed</Text>
                  <Text style={styles.valueText}>{(speed ?? 1).toFixed(1)}x</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.iconButton} onPress={decreaseSpeed}>
                      <Text style={{fontSize: 20, color: "#fff"}}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={increaseSpeed}>
                      <Text style={{fontSize: 20, color: "#fff"}}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.group}>
                  <Text style={styles.controlLabel}>Repeat Chinese</Text>
                  <Text style={styles.valueText}>x{repeatChinese}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => setRepeatChinese(rc => Math.max(0, rc - 1))}>
                      <Text style={{fontSize: 20, color: "#fff"}}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => setRepeatChinese(rc => Math.min(3, rc + 1))}>
                      <Text style={{fontSize: 20, color: "#fff"}}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
