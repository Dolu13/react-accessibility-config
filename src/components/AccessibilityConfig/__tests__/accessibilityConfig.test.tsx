import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AccessibilityConfig from '../accessibilityConfig';

describe('AccessibilityConfig', () => {
  const defaultProps = {
    isOpen: false,
    onToggle: vi.fn(),
    position: 'top-right' as const,
    theme: 'default' as const,
    defaultSettings: {
      contrast: 'default',
      font: 'default',
      lineHeight: 'default',
      alignment: 'left'
    },
    onSettingsChange: vi.fn()
  };

  it('devrait rendre le bouton flottant par défaut', () => {
    render(<AccessibilityConfig {...defaultProps} />);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('devrait appeler onToggle lors du clic sur le bouton', async () => {
    render(<AccessibilityConfig {...defaultProps} />);
    const button = screen.getByRole('link');
    await act(async () => {
      await userEvent.click(button);
    });
    expect(defaultProps.onToggle).toHaveBeenCalled();
  });

  it('devrait afficher le panneau de configuration quand isOpen est true', () => {
    render(<AccessibilityConfig {...defaultProps} isOpen={true} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('devrait ne pas afficher le panneau de configuration quand isOpen est false', () => {
    render(<AccessibilityConfig {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('devrait appeler onSettingsChange lors du changement de contraste', async () => {
    render(<AccessibilityConfig {...defaultProps} isOpen={true} />);
    const highContrastRadio = screen.getByLabelText('Renforcer');
    await act(async () => {
      await userEvent.click(highContrastRadio);
    });
    expect(defaultProps.onSettingsChange).toHaveBeenCalledWith(expect.objectContaining({
      contrast: 'high'
    }));
  });

  it('devrait appeler onSettingsChange lors du changement de police', async () => {
    render(<AccessibilityConfig {...defaultProps} isOpen={true} />);
    const dyslexicFontRadio = screen.getByLabelText('Adapter');
    await act(async () => {
      await userEvent.click(dyslexicFontRadio);
    });
    expect(defaultProps.onSettingsChange).toHaveBeenCalledWith(expect.objectContaining({
      font: 'dyslexic'
    }));
  });

  it('devrait appeler onSettingsChange lors du changement d\'interlignage', async () => {
    render(<AccessibilityConfig {...defaultProps} isOpen={true} />);
    const increasedLineHeightRadio = screen.getByLabelText('Augmenter');
    await act(async () => {
      await userEvent.click(increasedLineHeightRadio);
    });
    expect(defaultProps.onSettingsChange).toHaveBeenCalledWith(expect.objectContaining({
      lineHeight: 'increased'
    }));
  });

  it('devrait appeler onSettingsChange lors du changement d\'alignement', async () => {
    render(<AccessibilityConfig {...defaultProps} isOpen={true} />);
    const rightAlignmentRadio = screen.getByLabelText('Droit');
    await act(async () => {
      await userEvent.click(rightAlignmentRadio);
    });
    expect(defaultProps.onSettingsChange).toHaveBeenCalledWith(expect.objectContaining({
      alignment: 'right'
    }));
  });

  it('devrait réinitialiser les paramètres lors du clic sur le bouton de réinitialisation', async () => {
    render(<AccessibilityConfig {...defaultProps} isOpen={true} />);
    const resetButton = screen.getByText('Réinitialiser');
    await act(async () => {
      await userEvent.click(resetButton);
    });
    expect(defaultProps.onSettingsChange).toHaveBeenCalledWith(defaultProps.defaultSettings);
  });

// TODO Style perso
//   it('devrait appliquer les styles personnalisés', () => {
//     const customStyles = {
//         textLink: {
//         backgroundColor: '#ff0000'
//       }
//     };
//     render(<AccessibilityConfig {...defaultProps} customStyles={customStyles} />);
//     const button = screen.getByRole('link');
//     expect(button).toHaveStyle({ backgroundColor: '#ff0000' });
//   });

});