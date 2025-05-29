export interface AccessibilitySettings {
    contrast: 'default' | 'high' | 'inverted';
    font: 'default' | 'dyslexic';
    lineHeight: 'default' | 'increased';
    alignment: 'left' | 'right';
}

export interface AccessibilityConfigProps {
    isOpen?: boolean;
    onToggle: () => void;
    className?: string;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    theme?: 'default' | 'dark' | 'light';
    customStyles?: Record<string, React.CSSProperties>;
    defaultSettings?: Partial<AccessibilitySettings>;
    onSettingsChange?: (settings: AccessibilitySettings) => void;
  }
  
  export interface UseAccessibilitySettingsReturn {
    settings: AccessibilitySettings;
    updateSettings: (category: keyof AccessibilitySettings, value: string) => void;
    resetSettings: () => void;
    isLoaded: boolean;
  }