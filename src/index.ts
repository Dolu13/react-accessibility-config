export { default as AccessibilityConfig } from './components/AccessibilityConfig';
export { useAccessibilitySettings } from './hooks/useAccessibilitySettings';
export { useAccessibilityStyles } from './hooks/useAccessibilityStyles';
export { applyAccessibilityStyles, injectAccessibilityStyles } from './utils/styleUtils';
export type { 
  AccessibilitySettings, 
  AccessibilityConfigProps, 
  UseAccessibilitySettingsReturn 
} from './types';