import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useTheme } from '@mui/material/styles';
import { AnalyticsService } from '../services/AnalyticsService';

interface AccessibilityContextType {
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
  readingGuide: boolean;
  toggleReadingGuide: () => void;
  textToSpeech: boolean;
  toggleTextToSpeech: () => void;
  speak: (text: string) => void;
  keyboardNavigation: boolean;
  toggleKeyboardNavigation: () => void;
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  setColorBlindMode: (mode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia') => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(
  undefined
);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({
  children,
}) => {
  const theme = useTheme();
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [readingGuide, setReadingGuide] = useState(false);
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(true);
  const [colorBlindMode, setColorBlindMode] = useState<'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'>('none');

  // Carregar preferências salvas
  useEffect(() => {
    const loadPreferences = () => {
      const preferences = localStorage.getItem('accessibility_preferences');
      if (preferences) {
        const {
          fontSize: savedFontSize,
          highContrast: savedHighContrast,
          reduceMotion: savedReduceMotion,
          readingGuide: savedReadingGuide,
          textToSpeech: savedTextToSpeech,
          keyboardNavigation: savedKeyboardNavigation,
          colorBlindMode: savedColorBlindMode,
        } = JSON.parse(preferences);

        setFontSize(savedFontSize || 16);
        setHighContrast(savedHighContrast || false);
        setReduceMotion(savedReduceMotion || false);
        setReadingGuide(savedReadingGuide || false);
        setTextToSpeech(savedTextToSpeech || false);
        setKeyboardNavigation(savedKeyboardNavigation || true);
        setColorBlindMode(savedColorBlindMode || 'none');
      }
    };

    loadPreferences();
  }, []);

  // Salvar preferências quando mudarem
  useEffect(() => {
    const preferences = {
      fontSize,
      highContrast,
      reduceMotion,
      readingGuide,
      textToSpeech,
      keyboardNavigation,
      colorBlindMode,
    };
    localStorage.setItem('accessibility_preferences', JSON.stringify(preferences));
  }, [
    fontSize,
    highContrast,
    reduceMotion,
    readingGuide,
    textToSpeech,
    keyboardNavigation,
    colorBlindMode,
  ]);

  // Aplicar estilos globais
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    document.body.classList.toggle('high-contrast', highContrast);
    document.body.classList.toggle('reduce-motion', reduceMotion);
    document.body.classList.toggle('reading-guide', readingGuide);
    document.body.classList.toggle('keyboard-navigation', keyboardNavigation);
    document.body.setAttribute('data-color-blind-mode', colorBlindMode);
  }, [
    fontSize,
    highContrast,
    reduceMotion,
    readingGuide,
    keyboardNavigation,
    colorBlindMode,
  ]);

  const increaseFontSize = () => {
    setFontSize((prev) => {
      const newSize = Math.min(prev + 2, 24);
      AnalyticsService.trackAccessibilityInteraction(
        'font_size',
        'increase'
      );
      return newSize;
    });
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => {
      const newSize = Math.max(prev - 2, 12);
      AnalyticsService.trackAccessibilityInteraction(
        'font_size',
        'decrease'
      );
      return newSize;
    });
  };

  const resetFontSize = () => {
    setFontSize(16);
    AnalyticsService.trackAccessibilityInteraction(
      'font_size',
      'reset'
    );
  };

  const toggleHighContrast = () => {
    setHighContrast((prev) => {
      AnalyticsService.trackAccessibilityInteraction(
        'high_contrast',
        !prev ? 'enabled' : 'disabled'
      );
      return !prev;
    });
  };

  const toggleReduceMotion = () => {
    setReduceMotion((prev) => {
      AnalyticsService.trackAccessibilityInteraction(
        'reduce_motion',
        !prev ? 'enabled' : 'disabled'
      );
      return !prev;
    });
  };

  const toggleReadingGuide = () => {
    setReadingGuide((prev) => {
      AnalyticsService.trackAccessibilityInteraction(
        'reading_guide',
        !prev ? 'enabled' : 'disabled'
      );
      return !prev;
    });
  };

  const toggleTextToSpeech = () => {
    setTextToSpeech((prev) => {
      AnalyticsService.trackAccessibilityInteraction(
        'text_to_speech',
        !prev ? 'enabled' : 'disabled'
      );
      return !prev;
    });
  };

  const speak = (text: string) => {
    if (textToSpeech && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      window.speechSynthesis.speak(utterance);
      AnalyticsService.trackAccessibilityInteraction(
        'text_to_speech',
        'speak'
      );
    }
  };

  const toggleKeyboardNavigation = () => {
    setKeyboardNavigation((prev) => {
      AnalyticsService.trackAccessibilityInteraction(
        'keyboard_navigation',
        !prev ? 'enabled' : 'disabled'
      );
      return !prev;
    });
  };

  const handleColorBlindMode = (mode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia') => {
    setColorBlindMode(mode);
    AnalyticsService.trackAccessibilityInteraction(
      'color_blind_mode',
      mode
    );
  };

  const value = {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    highContrast,
    toggleHighContrast,
    reduceMotion,
    toggleReduceMotion,
    readingGuide,
    toggleReadingGuide,
    textToSpeech,
    toggleTextToSpeech,
    speak,
    keyboardNavigation,
    toggleKeyboardNavigation,
    colorBlindMode,
    setColorBlindMode: handleColorBlindMode,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}; 