import { useState, useEffect } from 'react';
import { applyAccessibilityStyles } from '../utils/styleUtils';
import type { AccessibilitySettings, UseAccessibilitySettingsReturn } from '../types';

export const useAccessibilitySettings = (
  defaultSettings: Partial<AccessibilitySettings> = {}
): UseAccessibilitySettingsReturn => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    contrast: 'default',
    font: 'default',
    lineHeight: 'default',
    alignment: 'left',
    ...defaultSettings
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger les paramètres depuis localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Erreur lors du chargement des paramètres:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Sauvegarder et appliquer les paramètres
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('accessibility-settings', JSON.stringify(settings));
      applyAccessibilityStyles(settings);
    }
  }, [settings, isLoaded]);

  // Écouter les changements de localStorage
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessibility-settings' && e.newValue) {
        try {
          setSettings(prev => ({ ...prev, ...JSON.parse(e.newValue!) }));
        } catch (error) {
          console.error('Erreur lors de la mise à jour des paramètres:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateSettings = (category: keyof AccessibilitySettings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: value as any
    }));
  };

  const resetSettings = () => {
    const resetDefaults: AccessibilitySettings = {
      contrast: 'default',
      font: 'default',
      lineHeight: 'default',
      alignment: 'left',
      ...defaultSettings
    };
    setSettings(resetDefaults);
  };

  return {
    settings,
    updateSettings,
    resetSettings,
    isLoaded
  };
};