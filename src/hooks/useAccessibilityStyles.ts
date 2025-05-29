import { useEffect } from 'react';
import type { AccessibilitySettings } from '../types';

export const useAccessibilityStyles = (settings: AccessibilitySettings) => {
  useEffect(() => {
    // Créer ou mettre à jour la feuille de style
    const styleId = 'react-accessibility-config-styles';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    // Générer les styles CSS en fonction des paramètres
    const styles = `
      :root {
        /* Contraste */
        ${settings.contrast === 'high' ? `
          --text-color: #000000;
          --background-color: #ffffff;
          --link-color: #0000EE;
          --visited-color: #551A8B;
        ` : settings.contrast === 'inverted' ? `
          --text-color: #ffffff;
          --background-color: #000000;
          --link-color: #00FFFF;
          --visited-color: #FF00FF;
        ` : ''}

        /* Police */
        ${settings.font === 'dyslexic' ? `
          --font-family: 'OpenDyslexic', Arial, sans-serif;
        ` : ''}

        /* Interlignage */
        ${settings.lineHeight === 'increased' ? `
          --line-height: 1.8;
        ` : ''}

        /* Alignement */
        ${settings.alignment === 'right' ? `
          --text-align: right;
        ` : ''}
      }

      /* Appliquer les styles à l'ensemble du document */
      body {
        color: var(--text-color, inherit);
        background-color: var(--background-color, inherit);
        font-family: var(--font-family, inherit);
        line-height: var(--line-height, inherit);
        text-align: var(--text-align, inherit);
      }

      a {
        color: var(--link-color, inherit);
      }

      a:visited {
        color: var(--visited-color, inherit);
      }
    `;

    styleElement.textContent = styles;

    // Nettoyage lors du démontage
    return () => {
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, [settings]);
};