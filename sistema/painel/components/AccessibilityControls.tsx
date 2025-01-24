'use client'

import { useAccessibility } from '@/providers/AccessibilityProvider'
import { Button } from './ui/Button'

export function AccessibilityControls() {
  const {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    highContrast,
    toggleHighContrast,
    reduceMotion,
    toggleReduceMotion,
    focusMode,
    toggleFocusMode,
  } = useAccessibility()

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex items-center gap-2">
        <Button onClick={decreaseFontSize} variant="outline" size="sm">
          A-
        </Button>
        <span className="text-sm">{fontSize}px</span>
        <Button onClick={increaseFontSize} variant="outline" size="sm">
          A+
        </Button>
      </div>

      <Button
        onClick={toggleHighContrast}
        variant={highContrast ? 'default' : 'outline'}
      >
        Alto Contraste
      </Button>

      <Button
        onClick={toggleReduceMotion}
        variant={reduceMotion ? 'default' : 'outline'}
      >
        Reduzir Movimento
      </Button>

      <Button
        onClick={toggleFocusMode}
        variant={focusMode ? 'default' : 'outline'}
      >
        Modo Foco
      </Button>
    </div>
  )
} 