import { useEffect } from 'react';
import type { AccessibilitySettings } from '../types';

export const useAccessibilityStyles = (settings: AccessibilitySettings) => {
  useEffect(() => {
    const styleId = 'react-accessibility-config-styles';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    // Styles communs pour les modes contraste élevé et inversé (basé sur le CSS fourni)
    const commonContrastStyles = `
      border-image: none !important;
      text-shadow: none !important;
    `;

    // Styles pour les éléments focusables en modes contraste (basé sur le CSS fourni)
    const focusContrastStyles = `
      ${settings.contrast === 'high' ? `
        outline: 2px solid #00FFFF !important; /* Cyan pour Renforcer */
      ` : settings.contrast === 'inverted' ? `
        outline: 2px solid #FFFF00 !important; /* Jaune pour Inverser */
      ` : ''}
    `;

    const styles = `
      /* Styles globaux pour l'application */
      * {
        /* Contraste (basé sur le CSS fourni) */
        ${settings.contrast === 'high' ? `
          background-color: #343643 !important; /* Gris foncé pour Renforcer (basé sur votre image et le CSS fourni) */
          color: white !important; /* Texte blanc pour Renforcer */
          text-decoration-color: currentColor !important;
          border-color: white !important; /* Bordures blanches pour Renforcer */
        ` : settings.contrast === 'inverted' ? `
          background-color: #000080 !important; /* Bleu marine pour Inverser */
          color: #FFFF00 !important; /* Jaune pour Inverser */
          text-decoration-color: currentColor !important;
          border-color: #FFFF00 !important; /* Bordures jaunes pour Inverser */
        ` : ''}
        ${settings.contrast !== 'default' ? commonContrastStyles : ''}

        /* Police (Dyslexie) - basé sur le CSS fourni */
        ${settings.font === 'dyslexic' ? `
          font-family: 'opendys', Arial, sans-serif !important;
        ` : ''}

        /* Interlignage - basé sur le CSS fourni */
        ${settings.lineHeight === 'increased' ? `
          line-height: 1.5 !important;
        ` : ''}

        /* Alignement - basé sur le CSS fourni */
        ${settings.alignment === 'right' ? `
          text-align: right !important;
        ` : settings.alignment === 'left' ? ` /* Ajout pour alignement à gauche */
          text-align: left !important;
        ` : ''}
      }

      /* Let SVG elements adapt to the chosen color scheme (from provided CSS) */
      path,
      polygon,
      svg,
      svg * {
        ${settings.contrast !== 'default' ? 'fill: currentColor !important;' : ''}
      }

      /* Add a border on form elements when custom contrasts are on (from provided CSS) */
      input,\n      textarea,\n      select,\n      button {
        ${settings.contrast !== 'default' ? `
          border-width: 1px !important;\n          border-style: solid !important;
        ` : ''}
      }

      /* Placeholder styles for contrast modes (from provided CSS) */
      *::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        ${settings.contrast === 'high' ? `
          color: white !important;
        ` : settings.contrast === 'inverted' ? `
          color: #FFFF00 !important;
        ` : ''}
      }

      *::-moz-placeholder { /* Firefox 19+ */
        ${settings.contrast === 'high' ? `
          color: white !important;
          opacity: 1 !important;
        ` : settings.contrast === 'inverted' ? `
          color: #FFFF00 !important;
          opacity: 1 !important;
        ` : ''}
      }

      *:-ms-input-placeholder { /* IE 10+ */
        ${settings.contrast === 'high' ? `
          color: white !important;
        ` : settings.contrast === 'inverted' ? `
          color: #FFFF00 !important;
        ` : ''}
      }

      *:-moz-placeholder { /* Firefox 18- */
        ${settings.contrast === 'high' ? `
          color: white !important;
          opacity: 1 !important;
        ` : settings.contrast === 'inverted' ? `
          color: #FFFF00 !important;
          opacity: 1 !important;
        ` : ''}
      }

      /* Styles for input[type="date"] in contrast modes (from provided CSS) */
      *::-webkit-datetime-edit-text,
      *::-webkit-datetime-edit-month-field,
      *::-webkit-datetime-edit-day-field,
      *::-webkit-datetime-edit-year-field {
        ${settings.contrast === 'high' ? `
          color: white !important;
        ` : settings.contrast === 'inverted' ? `
          color: #FFFF00 !important;
        ` : ''}
      }

      ::-webkit-calendar-picker-indicator {
        ${settings.contrast === 'high' ? `
          background: #343643 !important;
        ` : settings.contrast === 'inverted' ? `
          background: #000080 !important;
        ` : ''}
      }

      /* Styles for input[type="range"] in contrast modes (from provided CSS) */
      input[type="range"]::-webkit-slider-runnable-track {
        ${settings.contrast === 'high' ? `
          background: white !important;
        ` : settings.contrast === 'inverted' ? `
          background: #FFFF00 !important;
        ` : ''}
      }

      input[type="range"]::-moz-range-track {
        ${settings.contrast === 'high' ? `
          background: white !important;
        ` : settings.contrast === 'inverted' ? `
          background: #FFFF00 !important;
        ` : ''}
      }
      input[type="range"]::-moz-range-thumb {
        ${settings.contrast === 'high' ? `
          background: black !important;
          border: .15em solid white !important;
        ` : settings.contrast === 'inverted' ? `
          background: #000080 !important;
          border: .15em solid #FFFF00 !important;
        ` : ''}
      }

      input[type="range"]::-ms-fill-lower,
      input[type="range"]::-ms-fill-upper {
        ${settings.contrast === 'high' ? `
          background: white !important;
        ` : settings.contrast === 'inverted' ? `
          background: #FFFF00 !important;
        ` : ''}
      }

      input[type="range"]:focus::-ms-fill-lower,
      input[type="range"]:focus::-ms-fill-upper {
         ${settings.contrast === 'high' ? `
          background: white !important;
        ` : settings.contrast === 'inverted' ? `
          background: #FFFF00 !important;
        ` : ''}
      }

      input[type="range"]::-ms-thumb {
        ${settings.contrast === 'high' ? `
          background: black !important;\n          border: .15em solid white !important;\n        ` : settings.contrast === 'inverted' ? `
          background: #000080 !important;\n          border: .15em solid #FFFF00 !important;\n        ` : ''}
      }

      /* Styles pour les éléments focusables (basé sur le CSS fourni) */
      *:focus {
        ${settings.contrast !== 'default' ? focusContrastStyles : ''}
      }
    `;

    styleElement.textContent = styles;

    return () => {
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, [settings]);
};