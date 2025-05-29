import type { AccessibilitySettings } from '../types';

export const applyAccessibilityStyles = (settings: AccessibilitySettings): void => {
  const root = document.documentElement;
  
  // Nettoyer les classes existantes
  root.classList.remove(
    'contrast-default', 'contrast-high', 'contrast-inverted',
    'font-default', 'font-dyslexic',
    'line-height-default', 'line-height-increased',
    'text-align-left', 'text-align-right'
  );
  
  // Appliquer les nouvelles classes
  root.classList.add(
    `contrast-${settings.contrast}`,
    `font-${settings.font}`,
    `line-height-${settings.lineHeight}`,
    `text-align-${settings.alignment}`
  );
};

export const injectAccessibilityStyles = (): void => {
  if (document.getElementById('accessibility-styles')) return;

  const style = document.createElement('style');
  style.id = 'accessibility-styles';
  style.textContent = accessibilityCSS;
  
  document.head.appendChild(style);
};

// CSS injecté
const accessibilityCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap');
  
  :root {
    --contrast-bg: #ffffff;
    --contrast-text: #000000;
    --contrast-primary: #0066cc;
    --line-height-default: 1.5;
    --line-height-increased: 2;
  }
  
  /* Vos styles CSS d'accessibilité ici */
`;
