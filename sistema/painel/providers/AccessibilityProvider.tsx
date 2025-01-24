'use client'

import { createContext, useContext, useState } from 'react'

type AccessibilityContextType = {
  fontSize: number
  increaseFontSize: () => void
  decreaseFontSize: () => void
  highContrast: boolean
  toggleHighContrast: () => void
  reduceMotion: boolean
  toggleReduceMotion: () => void
  focusMode: boolean
  toggleFocusMode: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSize] = useState(16)
  const [highContrast, setHighContrast] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [focusMode, setFocusMode] = useState(false)

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 24))
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 12))
  const toggleHighContrast = () => setHighContrast(prev => !prev)
  const toggleReduceMotion = () => setReduceMotion(prev => !prev)
  const toggleFocusMode = () => setFocusMode(prev => !prev)

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        highContrast,
        toggleHighContrast,
        reduceMotion,
        toggleReduceMotion,
        focusMode,
        toggleFocusMode,
      }}
    >
      <div
        style={{
          fontSize: `${fontSize}px`,
        }}
        className={`
          ${highContrast ? 'high-contrast' : ''}
          ${reduceMotion ? 'reduce-motion' : ''}
          ${focusMode ? 'focus-mode' : ''}
        `}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
} 