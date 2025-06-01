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
      /* Styles globaux pour l'application */
      * {
        /* Contraste */
        ${settings.contrast === 'high' ? `
          color: #000000 !important;
          background-color: #ffffff !important;
        ` : settings.contrast === 'inverted' ? `
          color: #ffffff !important;
          background-color: #000000 !important;
        ` : ''}

        /* Police */
        ${settings.font === 'dyslexic' ? `
          font-family: 'OpenDyslexic', Arial, sans-serif !important;
        ` : ''}

        /* Interlignage */
        ${settings.lineHeight === 'increased' ? `
          line-height: 1.8 !important;
        ` : ''}

        /* Alignement */
        ${settings.alignment === 'right' ? `
          text-align: right !important;
        ` : ''}
      }

      /* Styles spécifiques pour les liens */
      a {
        ${settings.contrast === 'high' ? `
          color: #0000EE !important;
        ` : settings.contrast === 'inverted' ? `
          color: #00FFFF !important;
        ` : ''}
      }

      a:visited {
        ${settings.contrast === 'high' ? `
          color: #551A8B !important;
        ` : settings.contrast === 'inverted' ? `
          color: #FF00FF !important;
        ` : ''}
      }

      /* Styles pour les boutons */
      button {
        ${settings.contrast === 'high' ? `
          color: #000000 !important;
          background-color: #ffffff !important;
          border-color: #000000 !important;
        ` : settings.contrast === 'inverted' ? `
          color: #ffffff !important;
          background-color: #000000 !important;
          border-color: #ffffff !important;
        ` : ''}
      }

      /* Styles pour les inputs */
      input, textarea, select {
        ${settings.contrast === 'high' ? `
          color: #000000 !important;
          background-color: #ffffff !important;
          border-color: #000000 !important;
        ` : settings.contrast === 'inverted' ? `
          color: #ffffff !important;
          background-color: #000000 !important;
          border-color: #ffffff !important;
        ` : ''}
      }

      /* Styles pour les titres */
      h1, h2, h3, h4, h5, h6 {
        ${settings.contrast === 'high' ? `
          color: #000000 !important;
        ` : settings.contrast === 'inverted' ? `
          color: #ffffff !important;
        ` : ''}
      }

      /* Styles pour les paragraphes */
      p {
        ${settings.contrast === 'high' ? `
          color: #000000 !important;
        ` : settings.contrast === 'inverted' ? `
          color: #ffffff !important;
        ` : ''}
      }

      /* Styles pour les listes */
      ul, ol {
        ${settings.contrast === 'high' ? `
          color: #000000 !important;
        ` : settings.contrast === 'inverted' ? `
          color: #ffffff !important;
        ` : ''}
      }

      /* Styles pour les tableaux */
      table {
        ${settings.contrast === 'high' ? `
          color: #000000 !important;
          background-color: #ffffff !important;
          border-color: #000000 !important;
        ` : settings.contrast === 'inverted' ? `
          color: #ffffff !important;
          background-color: #000000 !important;
          border-color: #ffffff !important;
        ` : ''}
      }

      /* Styles pour les cellules de tableau */
      td, th {
        ${settings.contrast === 'high' ? `
          color: #000000 !important;
          background-color: #ffffff !important;
          border-color: #000000 !important;
        ` : settings.contrast === 'inverted' ? `
          color: #ffffff !important;
          background-color: #000000 !important;
          border-color: #ffffff !important;
        ` : ''}
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