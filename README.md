 # React Accessibility Config

Une bibliothèque React pour gérer facilement les paramètres d'accessibilité dans vos applications web.

## 🚀 Fonctionnalités

- Configuration des contrastes (défaut, renforcé, inversé)
- Adaptation de la police pour la dyslexie (OpenDyslexic)
- Ajustement de l'interlignage
- Personnalisation de l'alignement
- Interface utilisateur intuitive et accessible
- Thème personnalisable
- Support complet des tests
- Application automatique des styles d'accessibilité

## 📦 Installation

```bash
npm install @dolu13/react-accessibility-config
```

## 🎯 Utilisation

```tsx
import React, { useState } from 'react';
import { AccessibilityConfig } from '@dolu13/react-accessibility-config';
import '@dolu13/react-accessibility-config/styles';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    contrast: 'default',
    font: 'default',
    lineHeight: 'default',
    alignment: 'left'
  });

  const handleSettingsChange = (newSettings) => {
    console.log('Nouveaux paramètres:', newSettings);
    setSettings(newSettings);
  };

  return (
    <div>
      <h1>Mon Application</h1>
      <p>Ceci est un exemple de texte pour tester les paramètres d'accessibilité.</p>
      <a href="#">Ceci est un lien</a>
      
      <AccessibilityConfig
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        position="top-right"
        theme="default"
        defaultSettings={settings}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  );
}
```

## ⚙️ Props

| Prop | Type | Par défaut | Description |
|------|------|------------|-------------|
| `isOpen` | `boolean` | `false` | État d'ouverture du panneau de configuration |
| `onToggle` | `() => void` | Requis | Fonction appelée lors du clic sur le bouton |
| `className` | `string` | `''` | Classe CSS personnalisée |
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` | Position du bouton de configuration |
| `theme` | `'default' \| 'dark' \| 'light'` | `'default'` | Thème de l'interface |
| `customStyles` | `Record<string, React.CSSProperties>` | `{}` | Styles personnalisés |
| `defaultSettings` | `AccessibilitySettings` | `{}` | Paramètres par défaut |
| `onSettingsChange` | `(settings: AccessibilitySettings) => void` | `() => {}` | Callback lors du changement des paramètres |

## 📋 Types

```typescript
interface AccessibilitySettings {
  contrast: 'default' | 'high' | 'inverted';
  font: 'default' | 'dyslexic';
  lineHeight: 'default' | 'increased';
  alignment: 'left' | 'right';
}
```

## 🎨 Personnalisation avancée

```tsx
import { useState } from 'react';
import { AccessibilityConfig, useAccessibilityStyles } from '@dolu13/react-accessibility-config';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    contrast: 'default',
    font: 'default',
    lineHeight: 'default',
    alignment: 'left'
  });
  useAccessibilityStyles(settings);



  const handleSettingsChange = (newSettings: any) => {
    setSettings(newSettings);
  };

  return (
    <div>

      <AccessibilityConfig
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        position="top-left"
        theme="default" 
        defaultSettings={settings}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  );
};

export default App;
```

## 🧪 Tests

```bash
# Exécuter les tests
npm test

# Exécuter les tests avec couverture
npm run test:coverage
```

## 🛠️ Développement

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev

# Construction du projet
npm run build
```

## 📝 Licence

MIT

## 👥 Auteur

Demol Ludovic <ldemol@norsys.fr>

## 🔗 Liens

- [GitHub](https://github.com/Dolu13/react-accessibility-config)
- [Issues](https://github.com/Dolu13/react-accessibility-config/issues)