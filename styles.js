// styles.js - Enhanced Aesthetics with Horizontal Cards
import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const IS_LANDSCAPE = width > height;
const IS_TABLET = width > 768;
const IS_WEB = Platform.OS === 'web';

// Adjust card sizes for web platform
const getCardSize = () => {
  if (IS_WEB) {
    // Much smaller cards for web
    return IS_TABLET ? width / 6 - 20 : width / 3 - 20;
  }
  // Mobile sizes
  return IS_TABLET ? width / 3 - 32 : width / 2 - 24;
};

const CARD_WIDTH = getCardSize();

// Enhanced color palette
const BLUE = '#4287f5';
const BLUE_DARK = '#2952a3';
const BG_DARK = '#0f1118'; // Darker background for better contrast
const CARD_BG = '#1c2030'; // Slightly darker card background
const TEXT_PRIMARY = '#ffffff';
const TEXT_SECONDARY = '#a4aec6';
const TEXT_HEADER = '#e7ecf5';
const DANGER = '#fc5252';
const SUCCESS = '#19e68c';
const DISABLED = '#383e52';

// Enhanced shadow styles
const cardShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.3,
  shadowRadius: 12,
  elevation: 8,
};

const buttonShadow = {
  shadowColor: BLUE_DARK,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 6,
  elevation: 5,
};

const styles = StyleSheet.create({
  // Main app container with subtle pattern background
  container: {
    flex: 1,
    backgroundColor: BG_DARK,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: IS_LANDSCAPE ? 'row' : 'column',
    paddingHorizontal: IS_LANDSCAPE ? 32 : 12,
    paddingVertical: IS_LANDSCAPE ? 0 : 24,
    minHeight: '100%',
    width: '100%',
  },

  // Header container with improved styling
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'transparent', // Changed to transparent to show background
    borderBottomWidth: 0, // Removed border for cleaner look
    zIndex: 10,
  },
  
  headerTitle: {
    color: TEXT_PRIMARY,
    fontSize: IS_WEB ? 22 : 26,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.7, // Improved letter spacing
  },
  
  headerSubtitle: {
    color: TEXT_SECONDARY,
    fontSize: IS_WEB ? 14 : 16,
    fontWeight: '500',
    opacity: 0.9, // Subtle opacity for hierarchy
  },

  // Level header with gradient background
  levelHeaderContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 0,
    // Note: Gradient will be added via LinearGradient in the component
  },
  
  levelHeaderContent: {
    marginLeft: 10,
  },
  
  levelHeaderTitle: {
    color: TEXT_PRIMARY,
    fontSize: IS_WEB ? 18 : 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  
  levelHeaderSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: IS_WEB ? 13 : 15,
    fontWeight: '500',
  },
  
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.2)', // Semi-transparent background
  },

  // Directory screen - Improved level card grid
  directoryGrid: {
    width: '100%',
    paddingHorizontal: 10,
  },
  
  // Enhanced level card with horizontal layout as requested
  levelCard: {
    marginBottom: 16,
    marginRight: 0, // No right margin for full-width
    borderRadius: 16, // Slightly less rounded for rectangle
    padding: IS_WEB ? 12 : 16,
    width: IS_WEB ? '95%' : '100%', // Full width for mobile
    height: IS_WEB ? 120 : 130, // Fixed height for horizontal card
    ...cardShadow,
    position: 'relative',
    overflow: 'hidden',
    // Note: Gradient background will be added in the component
  },
  
  // Add decorative element to cards
  cardDecoration: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    top: -30,
    right: -30,
  },
  
  levelCardContent: {
    flex: 1,
    flexDirection: 'row', // Horizontal layout for level cards
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1, // Ensure content is above decoration
  },
  
  levelTextContent: {
    flex: 1,
    paddingLeft: 15,
  },
  
  // Improved icon container
  levelIconContainer: {
    height: IS_WEB ? 40 : 50,
    width: IS_WEB ? 40 : 50,
    borderRadius: IS_WEB ? 20 : 25,
    backgroundColor: 'rgba(255,255,255,0.25)', // More visible
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  
  // Improved typography for level cards
  levelTitle: {
    color: TEXT_PRIMARY,
    fontSize: IS_WEB ? 16 : 22,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  
  levelSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: IS_WEB ? 12 : 15,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  
  levelStatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // Add small icon before stats
  statsIcon: {
    marginRight: 6,
    opacity: 0.8,
  },
  
  levelStats: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: IS_WEB ? 11 : 13,
    fontWeight: '500',
  },
  
  // Enhanced card arrow
  cardArrow: {
    backgroundColor: 'rgba(0,0,0,0.2)', // Semi-transparent background
    borderRadius: 15,
    padding: 3,
    marginRight: 10,
  },

  // Batch screen styles with improved batch cards
  batchCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderLeftWidth: 5,
    marginBottom: 16,
    marginRight: IS_WEB ? 16 : 0,
    width: IS_WEB ? 
      (IS_TABLET ? width / 3 - 24 : width / 2 - 24) : 
      '100%', // Full width on mobile as requested
    backgroundColor: CARD_BG,
    ...cardShadow,
  },
  
  // Add separator between batch cards
  batchSeparator: {
    height: 16,
  },
  
  batchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: IS_WEB ? 12 : 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)', // Lighter border
  },
  
  batchTitleContainer: {
    flex: 1,
  },
  
  batchTitle: {
    color: TEXT_PRIMARY,
    fontSize: IS_WEB ? 16 : 22, // Larger as requested
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  
  batchCount: {
    color: TEXT_SECONDARY,
    fontSize: IS_WEB ? 12 : 14,
    marginTop: 2,
    opacity: 0.9,
  },
  
  batchActions: {
    flexDirection: 'row',
  },
  
  // Enhanced play button
  playButton: {
    width: IS_WEB ? 34 : 42,
    height: IS_WEB ? 34 : 42,
    borderRadius: IS_WEB ? 17 : 21,
    alignItems: 'center',
    justifyContent: 'center',
    ...buttonShadow,
  },
  
  // Add progress indicator to batch cards
  progressContainer: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginHorizontal: 16,
    marginTop: -8,
    marginBottom: 8,
  },
  
  progressBar: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: BLUE,
  },
  
  examplesContainer: {
    padding: IS_WEB ? 12 : 16,
  },
  
  // Improved example items
  exampleItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  
  exampleChinese: {
    color: TEXT_PRIMARY,
    fontSize: IS_WEB ? 14 : 16,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  
  examplePinyin: {
    color: BLUE,
    fontSize: IS_WEB ? 12 : 14,
    marginBottom: 4,
    fontStyle: 'italic',
    letterSpacing: 0.3,
  },
  
  exampleEnglish: {
    color: TEXT_SECONDARY,
    fontSize: IS_WEB ? 12 : 14,
    opacity: 0.9,
  },
  
  moreExamples: {
    color: BLUE,
    fontSize: IS_WEB ? 12 : 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 0.3,
  },

  // Enhanced flashcard styling - full screen as requested
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 22, // Slightly less rounded
    width: IS_LANDSCAPE ? '95%' : '95%',
    maxWidth: IS_LANDSCAPE ? width * 0.95 : width * 0.95, // Nearly full width
    height: IS_LANDSCAPE ? height * 0.8 : height * 0.7, // Taller
    alignItems: 'center',
    justifyContent: 'center',
    ...cardShadow,
    marginVertical: 10,
    marginHorizontal: 0,
    paddingVertical: IS_LANDSCAPE ? 20 : 28,
    paddingHorizontal: IS_LANDSCAPE ? 32 : 18,
    // Note: Gradient will be applied in component
  },

  // Add a subtle pattern to card
  cardPattern: {
    position: 'absolute',
    top: 20,
    right: 20,
    opacity: 0.05,
    transform: [{ rotate: '30deg' }],
  },

  // Enhanced pinyin styling
  pinyin: {
    fontSize: IS_LANDSCAPE ? 46 : 38, // Larger as requested
    color: BLUE,
    textAlign: 'center',
    marginVertical: 8, // More spacing
    fontStyle: 'italic',
    fontWeight: '600',
    letterSpacing: 1,
  },

  // Enhanced Chinese character styling with better text effects
  chinese: {
    fontSize: IS_LANDSCAPE ? 90 : 80, // Larger as requested
    color: TEXT_PRIMARY,
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 15, // More spacing
    letterSpacing: 3,
    textShadowColor: BLUE,
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },

  // Improved English translation
  english: {
    fontSize: IS_LANDSCAPE ? 36 : 28, // Larger as requested
    color: TEXT_SECONDARY,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 10, // More spacing
    letterSpacing: 0.7,
  },

  // Enhanced controls row
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: IS_LANDSCAPE ? 20 : 30, // More spacing
    marginBottom: IS_LANDSCAPE ? 10 : 16,
    flexWrap: 'nowrap',
    gap: IS_LANDSCAPE ? 25 : 18, // More spacing between buttons
  },

  // Improved icon buttons
  iconButton: {
    backgroundColor: BLUE,
    borderRadius: 99,
    width: IS_LANDSCAPE ? 65 : 60, // Larger as requested
    height: IS_LANDSCAPE ? 65 : 60, // Larger as requested
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: IS_LANDSCAPE ? 10 : 5,
    marginVertical: IS_LANDSCAPE ? 0 : 6,
    ...buttonShadow,
  },

  // Button variants with improved styling
  iconButtonSecondary: {
    backgroundColor: 'rgba(66, 135, 245, 0.2)',
    borderWidth: 1.5,
    borderColor: BLUE,
  },
  iconButtonDanger: {
    backgroundColor: DANGER,
  },
  iconButtonSuccess: {
    backgroundColor: SUCCESS,
  },
  iconButtonDisabled: {
    backgroundColor: DISABLED,
    opacity: 0.7, // More evident disabled state
  },

  // Enhanced bookmark icon
  bookmarkIcon: {
    color: BLUE,
  },

  // Flashcard progress indicator
  progressIndicator: {
    position: 'absolute',
    bottom: 14,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  
  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  
  progressDotActive: {
    width: 8,
    height: 8, 
    borderRadius: 4,
    backgroundColor: BLUE,
  },

  // Control label in settings modal
  controlLabel: {
    color: TEXT_SECONDARY,
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  
  valueText: {
    color: BLUE,
    fontSize: 17,
    fontWeight: '700',
    marginVertical: 2,
    textAlign: 'center',
    letterSpacing: 0.3,
  },

  // Switch style for settings modal
  switch: {
    transform: [{ scaleX: 1.13 }, { scaleY: 1.13 }],
    marginVertical: 7,
    marginHorizontal: 5,
  },

  // Improved modal overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 12, 20, 0.95)', // Darker for better contrast
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Enhanced modal content
  modalContent: {
    backgroundColor: CARD_BG,
    borderRadius: 22,
    padding: IS_LANDSCAPE ? 32 : 16,
    minWidth: IS_LANDSCAPE ? '60%' : '88%',
    maxWidth: IS_LANDSCAPE ? width * 0.65 : width * 0.95, // Wider on mobile
    alignItems: 'center',
    maxHeight: IS_LANDSCAPE ? '92%' : '90%',
    ...cardShadow,
  },

  // Enhanced close button
  closeButton: {
    backgroundColor: BLUE,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 18,
    alignItems: 'center',
    ...buttonShadow,
  },
  
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Improved settings groups
  group: {
    backgroundColor: 'rgba(0,0,0,0.2)', // Darker for better contrast
    borderRadius: 18,
    padding: IS_LANDSCAPE ? 18 : 13,
    marginHorizontal: 8,
    marginVertical: 7,
    alignItems: 'center',
    minWidth: 110,
    maxWidth: 220,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },

  // For grids or batch selectors (optional)
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },

  // Enhanced divider
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)', // More subtle divider
    marginVertical: 12,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 1,
  },
  
  // Scrollable container fixes
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  
  scrollContent: {
    paddingBottom: 30,
    flexGrow: 1,
  },
});

export default styles;

