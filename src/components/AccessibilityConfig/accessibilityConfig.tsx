import React, { useState } from 'react';
import { useAccessibilitySettings } from '../../hooks/useAccessibilitySettings';
import { materialStyles } from './styles';
import type { AccessibilityConfigProps } from '../../types';
import { useAccessibilityStyles } from '../../hooks/useAccessibilityStyles';

const AccessibilityConfig: React.FC<AccessibilityConfigProps> = ({
  isOpen = false,
  onToggle,
  position = 'top-right',
  customStyles = {},
  defaultSettings = {},
  onSettingsChange = () => {}
}) => {
  const { settings, updateSettings, resetSettings } = useAccessibilitySettings(defaultSettings);
  const [hoveredClose, setHoveredClose] = useState(false);

  useAccessibilityStyles(settings);

  const handleSettingChange = (category: keyof typeof settings, value: string) => {
    updateSettings(category, value);
    onSettingsChange({ ...settings, [category]: value });
  };

  const handleReset = () => {
    resetSettings();
    onSettingsChange(defaultSettings as any);
  };

  
  // Fonction utilitaire pour la position du lien texte
  const getTextPosition = (position: string): React.CSSProperties => {
    const positions: Record<string, React.CSSProperties> = {
      'top-right': { top: '16px', right: '16px' },
      'top-left': { top: '16px', left: '16px' },
      'bottom-right': { bottom: '16px', right: '16px' },
      'bottom-left': { bottom: '16px', left: '16px' }
    };
    return positions[position] || positions['top-right'];
  };

  // Configuration des options
  const optionsConfig = {
    contrast: {
      title: 'Contrastes',
      options: [
        { value: 'default', label: 'Défaut' },
        { value: 'high', label: 'Renforcer' },
        { value: 'inverted', label: 'Inverser' }
      ]
    },
    font: {
      title: 'Police (dyslexie)',
      options: [
        { value: 'default', label: 'Défaut' },
        { value: 'dyslexic', label: 'Adapter' }
      ]
    },
    lineHeight: {
      title: 'Interlignage',
      options: [
        { value: 'default', label: 'Défaut' },
        { value: 'increased', label: 'Augmenter' }
      ]
    },
    alignment: {
      title: 'Alignement',
      options: [
        { value: 'left', label: 'Gauche' },
        { value: 'right', label: 'Droit' }
      ]
    }
  };

  const styles = {
    ...materialStyles,
    ...customStyles,
    textLink: {
      ...getTextPosition(position),
      ...customStyles.link
    }
  };



  return (
    <>
    <a
      href="#"
      style={styles.textLink}
      onClick={(e) => {
        e.preventDefault();
        onToggle();
      } }
      aria-label="Paramètres d'accessibilité"
      aria-expanded={isOpen}
      aria-controls="accessibility-dialog"
    >
      Paramètres d'accessibilité
    </a>
    {isOpen && (
      <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onToggle()}>
        <div style={styles.dialog} role="dialog" aria-labelledby="accessibility-dialog-title">
          <div style={styles.dialogTitle}>
            <h2 id="accessibility-dialog-title" style={styles.titleContent}>
              <span style={{ fontSize: '24px' }}>♿</span>
              Paramètres d'accessibilité
            </h2>
            <button
              style={{
                ...styles.closeButton,
                backgroundColor: hoveredClose ? 'rgba(255,255,255,0.1)' : 'transparent'
              }}
              onMouseEnter={() => setHoveredClose(true)}
              onMouseLeave={() => setHoveredClose(false)}
              onClick={onToggle}
              aria-label="Fermer les paramètres"
            >
              ✕
            </button>
          </div>

          <div style={styles.dialogContent}>
            <div style={styles.grid}>
              {Object.entries(optionsConfig).map(([key, config]) => (
                <div key={key} style={styles.paper}>
                  <label style={styles.formLabel}>
                    {config.title}
                  </label>
                  <div style={styles.radioGroup} role="radiogroup" aria-labelledby={`${key}-label`}>
                    {config.options.map((option) => (
                      <label
                        key={option.value}
                        style={{
                          ...styles.radioOption,
                          backgroundColor: settings[key as keyof typeof settings] === option.value
                            ? 'rgba(25, 118, 210, 0.04)'
                            : 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0, 0, 0, 0.04)';
                        } }
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor =
                            settings[key as keyof typeof settings] === option.value
                              ? 'rgba(25, 118, 210, 0.04)'
                              : 'transparent';
                        } }
                      >
                        <input
                          type="radio"
                          name={key}
                          value={option.value}
                          checked={settings[key as keyof typeof settings] === option.value}
                          onChange={(e) => handleSettingChange(key as keyof typeof settings, e.target.value)}
                          style={styles.radioInput} />
                        <span style={{
                          ...styles.radioLabel,
                          fontWeight: settings[key as keyof typeof settings] === option.value ? 'bold' : 'normal'
                        }}>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <hr style={styles.divider} />
            <p style={styles.infoText}>
              Les paramètres sont automatiquement sauvegardés et appliqués à l'ensemble de l'application.
            </p>
          </div>

          <div style={styles.dialogActions}>
            <button
              style={{
                ...styles.button,
                ...styles.outlinedButton
              }}
              onClick={handleReset}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'rgba(25, 118, 210, 0.04)';
              } }
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'transparent';
              } }
            >
              Réinitialiser
            </button>
            <button
              style={{
                ...styles.button,
                ...styles.containedButton
              }}
              onClick={onToggle}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#1565c0';
              } }
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#1976d2';
              } }
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default AccessibilityConfig;
