# React Accessibility Config

Une bibliothèque React pour gérer facilement les paramètres d'accessibilité dans vos applications web.

## 🚀 Fonctionnalités

- Configuration des contrastes
- Adaptation de la police pour la dyslexie
- Ajustement de l'interlignage
- Personnalisation de l'alignement
- Interface utilisateur intuitive et accessible
- Thème personnalisable
- Support complet des tests

## 📦 Installation

```bash
npm install @votre-organisation/react-accessibility-config
```

## 🎯 Utilisation

```tsx
import { AccessibilityConfig } from '@votre-organisation/react-accessibility-config';

function App() {
  return (
    <div>
      <h1>Mon Application</h1>
      <AccessibilityConfig
        isOpen={false}
        onToggle={() => {}}
        position="top-right"
        theme="default"
        defaultSettings={{
          contrast: 'default',
          font: 'default',
          lineHeight: 'default',
          alignment: 'left'
        }}
        onSettingsChange={(settings) => {
          console.log('Nouveaux paramètres:', settings);
        }}
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
| `theme` | `string` | `'default'` | Thème de l'interface |
| `customStyles` | `object` | `{}` | Styles personnalisés |
| `defaultSettings` | `object` | `{}` | Paramètres par défaut |
| `onSettingsChange` | `(settings: object) => void` | `() => {}` | Callback lors du changement des paramètres |

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

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📚 Documentation

Pour plus d'informations, consultez notre [documentation complète](./docs/README.md).