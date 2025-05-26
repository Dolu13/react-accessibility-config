import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAccessibilitySettings } from './useAccessibilitySettings'

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
})

describe('useAccessibilitySettings', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
    document.documentElement.className = ''
  })

  it('returns default settings initially', () => {
    const { result } = renderHook(() => useAccessibilitySettings())
    
    expect(result.current.settings).toEqual({
      contrast: 'default',
      font: 'default',
      lineHeight: 'default',
      alignment: 'left'
    })
    expect(result.current.isLoaded).toBe(true)
  })

  it('updates settings correctly', () => {
    const { result } = renderHook(() => useAccessibilitySettings())
    
    act(() => {
      result.current.updateSettings('contrast', 'high')
    })
    
    expect(result.current.settings.contrast).toBe('high')
  })

  it('persists settings to localStorage', () => {
    const { result } = renderHook(() => useAccessibilitySettings())
    
    act(() => {
      result.current.updateSettings('font', 'dyslexic')
    })
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'accessibility-settings',
      expect.stringContaining('"font":"dyslexic"')
    )
  })

  it('loads settings from localStorage', () => {
    const savedSettings = { 
      contrast: 'high', 
      font: 'dyslexic',
      lineHeight: 'increased',
      alignment: 'right'
    }
    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedSettings))
    
    const { result } = renderHook(() => useAccessibilitySettings())
    
    expect(result.current.settings.contrast).toBe('high')
    expect(result.current.settings.font).toBe('dyslexic')
  })

  it('resets settings to default', () => {
    const { result } = renderHook(() => useAccessibilitySettings())
    
    // Changer un paramètre
    act(() => {
      result.current.updateSettings('contrast', 'high')
    })
    
    expect(result.current.settings.contrast).toBe('high')
    
    // Réinitialiser
    act(() => {
      result.current.resetSettings()
    })
    
    expect(result.current.settings.contrast).toBe('default')
  })

  it('uses custom default settings', () => {
    const defaultSettings = { contrast: 'high' as const }
    const { result } = renderHook(() => useAccessibilitySettings(defaultSettings))
    
    expect(result.current.settings.contrast).toBe('high')
  })

  it('applies CSS classes when settings change', () => {
    const { result } = renderHook(() => useAccessibilitySettings())
    
    act(() => {
      result.current.updateSettings('contrast', 'high')
    })
    
    expect(document.documentElement).toHaveClass('contrast-high')
  })
})