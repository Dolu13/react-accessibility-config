import { CSSProperties } from 'react';

export interface MaterialStyles {
  textLink: CSSProperties;
  overlay: CSSProperties;
  dialog: CSSProperties;
  dialogTitle: CSSProperties;
  titleContent: CSSProperties;
  closeButton: CSSProperties;
  dialogContent: CSSProperties;
  grid: CSSProperties;
  paper: CSSProperties;
  formLabel: CSSProperties;
  radioGroup: CSSProperties;
  radioOption: CSSProperties;
  radioInput: CSSProperties;
  radioLabel: CSSProperties;
  divider: CSSProperties;
  infoText: CSSProperties;
  dialogActions: CSSProperties;
  button: CSSProperties;
  outlinedButton: CSSProperties;
  containedButton: CSSProperties;
}

export const materialStyles: MaterialStyles = {
  textLink: {
    position: 'fixed',
    color: '#1976d2',
    textDecoration: 'underline',
    cursor: 'pointer',
    zIndex: 1000,
    backgroundColor: 'transparent',
    border: 'none',
    padding: '8px',
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif',
    transition: 'color 0.3s',
    '&:hover': {
      color: '#1565c0'
    }
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 1300,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px'
  },
  dialog: {
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
    width: '100%',
    maxWidth: '900px',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif'
  },
  dialogTitle: {
    backgroundColor: '#1976d2',
    color: 'white',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0
  },
  titleContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '1.25rem',
    fontWeight: 500,
    margin: 0
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    transition: 'background-color 0.2s'
  },
  dialogContent: {
    padding: '24px',
    flex: 1,
    overflowY: 'auto'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '24px'
  },
  paper: {
    backgroundColor: '#fafafa',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    padding: '16px',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
  },
  formLabel: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.87)',
    marginBottom: '16px',
    display: 'block'
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  radioOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  radioInput: {
    width: '20px',
    height: '20px',
    accentColor: '#1976d2'
  },
  radioLabel: {
    fontSize: '1rem',
    color: 'rgba(0, 0, 0, 0.87)',
    cursor: 'pointer',
    userSelect: 'none'
  },
  divider: {
    height: '1px',
    backgroundColor: '#e0e0e0',
    border: 'none',
    margin: '16px 0'
  },
  infoText: {
    fontSize: '0.875rem',
    color: 'rgba(0, 0, 0, 0.6)',
    fontStyle: 'italic',
    lineHeight: 1.5
  },
  dialogActions: {
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #e0e0e0'
  },
  button: {
    padding: '8px 16px',
    borderRadius: '4px',
    fontSize: '0.875rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: 'none',
    minWidth: '64px',
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif'
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    color: '#1976d2',
    border: '1px solid rgba(25, 118, 210, 0.5)'
  },
  containedButton: {
    backgroundColor: '#1976d2',
    color: 'white',
    minWidth: '100px'
  }
};