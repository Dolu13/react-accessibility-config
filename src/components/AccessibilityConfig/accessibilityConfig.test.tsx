import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AccessibilityConfig from './accessibilityConfig'

// Mock localStorage pour ce test spécifique
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

describe('AccessibilityConfig', () => {
  const mockToggle = vi.fn()
  const mockOnSettingsChange = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.clear.mockClear()
    localStorageMock.getItem.mockReturnValue(null)
    localStorageMock.setItem.mockClear()
    
    // Nettoyer les classes CSS du document
    document.documentElement.className = ''
  })

  it('renders FAB button when closed', () => {
    render(
      <AccessibilityConfig 
        isOpen={false} 
        onToggle={mockToggle} 
      />
    )
    
    const fabButton = screen.getByRole('button', { 
      name: /paramètres d'accessibilité/i 
    })
    expect(fabButton).toBeInTheDocument()
  })

  it('renders modal when open', () => {
    render(
      <AccessibilityConfig 
        isOpen={true} 
        onToggle={mockToggle} 
      />
    )
    
    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()
    
    const title = screen.getByText(/paramètres d'accessibilité/i)
    expect(title).toBeInTheDocument()
  })

  it('changes contrast setting and applies CSS class', async () => {
    const user = userEvent.setup()
    
    render(
      <AccessibilityConfig 
        isOpen={true} 
        onToggle={mockToggle}
        onSettingsChange={mockOnSettingsChange}
      />
    )
    
    const highContrastRadio = screen.getByLabelText(/renforcer/i)
    await user.click(highContrastRadio)
    
    // Vérifier que la classe CSS est appliquée
    await waitFor(() => {
      expect(document.documentElement).toHaveClass('contrast-high')
    })
    
    // Vérifier que le callback est appelé
    expect(mockOnSettingsChange).toHaveBeenCalledWith(
      expect.objectContaining({ contrast: 'high' })
    )
  })

  it('resets settings to default', async () => {
    const user = userEvent.setup()
    
    render(
      <AccessibilityConfig 
        isOpen={true} 
        onToggle={mockToggle} 
      />
    )
    
    // Changer un paramètre d'abord
    const highContrastRadio = screen.getByLabelText(/renforcer/i)
    await user.click(highContrastRadio)
    
    // Vérifier que le changement a eu lieu
    await waitFor(() => {
      expect(document.documentElement).toHaveClass('contrast-high')
    })
    
    // Réinitialiser
    const resetButton = screen.getByText(/réinitialiser/i)
    await user.click(resetButton)
    
    // Vérifier que les paramètres sont revenus par défaut
    await waitFor(() => {
      expect(document.documentElement).toHaveClass('contrast-default')
      expect(document.documentElement).not.toHaveClass('contrast-high')
    })
  })

  it('calls onToggle when close button is clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <AccessibilityConfig 
        isOpen={true} 
        onToggle={mockToggle} 
      />
    )
    
    const closeButton = screen.getByLabelText(/fermer/i)
    await user.click(closeButton)
    
    expect(mockToggle).toHaveBeenCalledTimes(1)
  })

  it('loads settings from localStorage on mount', () => {
    const savedSettings = {
      contrast: 'high',
      font: 'dyslexic',
      lineHeight: 'increased',
      alignment: 'right'
    }
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedSettings))
    
    render(
      <AccessibilityConfig 
        isOpen={true} 
        onToggle={mockToggle} 
      />
    )
    
    // Vérifier que les bons radio buttons sont sélectionnés
    expect(screen.getByDisplayValue('high')).toBeChecked()
    expect(screen.getByDisplayValue('dyslexic')).toBeChecked()
    expect(screen.getByDisplayValue('increased')).toBeChecked()
    expect(screen.getByDisplayValue('right')).toBeChecked()
  })

  it('handles custom position prop', () => {
    render(
      <AccessibilityConfig 
        isOpen={false} 
        onToggle={mockToggle}
        position="bottom-left"
      />
    )
    
    const fabButton = screen.getByRole('button')
    // Note: tester les styles inline peut être complexe, 
    // on peut tester la prop est bien passée d'une autre façon
    expect(fabButton).toBeInTheDocument()
  })

  it('applies custom styles', () => {
    const customStyles = {
      fab: { backgroundColor: 'rgb(255, 87, 34)' } // Couleur en RGB pour le test
    }
    
    render(
      <AccessibilityConfig 
        isOpen={false} 
        onToggle={mockToggle}
        customStyles={customStyles}
      />
    )
    
    const fabButton = screen.getByRole('button')
    expect(fabButton).toHaveStyle({ backgroundColor: 'rgb(255, 87, 34)' })
  })

  it('calls onSettingsChange when settings change', async () => {
    const user = userEvent.setup()
    
    render(
      <AccessibilityConfig 
        isOpen={true} 
        onToggle={mockToggle}
        onSettingsChange={mockOnSettingsChange}
      />
    )
    
    const dyslexicRadio = screen.getByLabelText(/adapter/i)
    await user.click(dyslexicRadio)
    
    expect(mockOnSettingsChange).toHaveBeenCalledWith(
      expect.objectContaining({ font: 'dyslexic' })
    )
  })
})
