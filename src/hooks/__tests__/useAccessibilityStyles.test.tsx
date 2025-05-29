import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAccessibilityStyles } from '../useAccessibilityStyles';
import type { AccessibilitySettings } from '../../types';

describe('useAccessibilityStyles', () => {
  let mockStyleElement: HTMLStyleElement;
  let mockAppendChild: jest.Mock;
  let mockRemoveChild: jest.Mock;

  beforeEach(() => {
    // Mock de l'élément style
    mockStyleElement = document.createElement('style');
    mockStyleElement.id = 'react-accessibility-config-styles';
    
    // Mock des méthodes du DOM
    mockAppendChild = vi.fn();
    mockRemoveChild = vi.fn();
    
    // Mock de document.head
    document.head.appendChild = mockAppendChild;
    document.head.removeChild = mockRemoveChild;
    
    // Mock de getElementById
    vi.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'react-accessibility-config-styles') {
        return mockStyleElement;
      }
      return null;
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('devrait créer un élément style s\'il n\'existe pas', () => {
    vi.spyOn(document, 'getElementById').mockReturnValue(null);
    
    renderHook(() => useAccessibilityStyles({
      contrast: 'default',
      font: 'default',
      lineHeight: 'default',
      alignment: 'left'
    }));

    expect(mockAppendChild).toHaveBeenCalled();
    expect(mockStyleElement.id).toBe('react-accessibility-config-styles');
  });

  it('devrait appliquer les styles de contraste élevé', () => {
    renderHook(() => useAccessibilityStyles({
      contrast: 'high',
      font: 'default',
      lineHeight: 'default',
      alignment: 'left'
    }));

    expect(mockStyleElement.textContent).toContain('--text-color: #000000');
    expect(mockStyleElement.textContent).toContain('--background-color: #ffffff');
  });

  it('devrait appliquer les styles de contraste inversé', () => {
    renderHook(() => useAccessibilityStyles({
      contrast: 'inverted',
      font: 'default',
      lineHeight: 'default',
      alignment: 'left'
    }));

    expect(mockStyleElement.textContent).toContain('--text-color: #ffffff');
    expect(mockStyleElement.textContent).toContain('--background-color: #000000');
  });

  it('devrait appliquer la police dyslexique', () => {
    renderHook(() => useAccessibilityStyles({
      contrast: 'default',
      font: 'dyslexic',
      lineHeight: 'default',
      alignment: 'left'
    }));

    expect(mockStyleElement.textContent).toContain('--font-family: \'OpenDyslexic\', Arial, sans-serif');
  });

  it('devrait appliquer l\'interlignage augmenté', () => {
    renderHook(() => useAccessibilityStyles({
      contrast: 'default',
      font: 'default',
      lineHeight: 'increased',
      alignment: 'left'
    }));

    expect(mockStyleElement.textContent).toContain('--line-height: 1.8');
  });

  it('devrait appliquer l\'alignement à droite', () => {
    renderHook(() => useAccessibilityStyles({
      contrast: 'default',
      font: 'default',
      lineHeight: 'default',
      alignment: 'right'
    }));

    expect(mockStyleElement.textContent).toContain('--text-align: right');
  });

  it('devrait nettoyer les styles lors du démontage', () => {
    const { unmount } = renderHook(() => useAccessibilityStyles({
      contrast: 'default',
      font: 'default',
      lineHeight: 'default',
      alignment: 'left'
    }));

    act(() => {
      unmount();
    });

    expect(mockRemoveChild).toHaveBeenCalledWith(mockStyleElement);
  });

  it('devrait mettre à jour les styles lorsque les paramètres changent', () => {
    const { rerender } = renderHook(
      (settings: AccessibilitySettings) => useAccessibilityStyles(settings),
      {
        initialProps: {
          contrast: 'default',
          font: 'default',
          lineHeight: 'default',
          alignment: 'left'
        }
      }
    );

    const initialStyles = mockStyleElement.textContent;

    act(() => {
      rerender({
        contrast: 'high',
        font: 'dyslexic',
        lineHeight: 'increased',
        alignment: 'right'
      });
    });

    expect(mockStyleElement.textContent).not.toBe(initialStyles);
    expect(mockStyleElement.textContent).toContain('--text-color: #000000');
    expect(mockStyleElement.textContent).toContain('--font-family: \'OpenDyslexic\', Arial, sans-serif');
    expect(mockStyleElement.textContent).toContain('--line-height: 1.8');
    expect(mockStyleElement.textContent).toContain('--text-align: right');
  });
});