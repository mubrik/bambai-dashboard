'use client';

import React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

declare module '@mui/material/styles' {
  interface Palette {
    custom: Palette['primary'];
  }

  interface PaletteOptions {
    active?: PaletteOptions['primary'];
    inactive?: PaletteOptions['primary'];
  }

  interface BreakpointOverrides {
    zero: true;
  }

  interface TypographyVariantsOptions {
    label?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    label: true;
  }
}

/**
 * @description Main theme to customise theming of all MUI components
 * Typography, colors, sizing values should all match the rising design system
 * @link https://www.figma.com/design/LAX0Jy2mUYP9cV9qpgjIyh/Rising-Design-System
 * @link https://mui.com/material-ui/customization/default-theme/
 */
export const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-roboto)',
    // every other typography component derives font size from this this using rem, change with caution!
    fontSize: 15,
    h1: {
      fontSize: 96,
      fontWeight: '300',
      lineHeight: '112px',
    },
    h2: {
      fontSize: 60,
      fontWeight: '300',
      lineHeight: '72px',
    },
    h3: {
      fontSize: 48,
      fontWeight: '400',
      lineHeight: '56px',
    },
    h4: {
      fontSize: 34,
      fontWeight: '400',
      lineHeight: '42px',
    },
    h5: {
      fontSize: 24,
      fontWeight: '400',
      lineHeight: '32px',
    },
    h6: {
      fontSize: 20,
      fontWeight: '500',
      lineHeight: '32px',
    },
    subtitle1: {
      fontSize: 16,
      lineHeight: '28px',
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: '22px',
    },
    body1: {
      fontSize: 16,
      lineHeight: '24px',
    },
    body2: {
      fontSize: 14,
      lineHeight: '20px',
    },
    caption: {
      fontSize: 14,
      lineHeight: '20px',
    },
    label: {
      fontSize: 12,
      lineHeight: '12px',
    },
  },
  palette: {
    primary: {
      main: '#6576FF',
      dark: '#3457FE',
      light: '#2BA19E',
    },
    secondary: {
      main: '#9C27B0',
      dark: '#7B1FA2',
      light: '#BA68C8',
    },
    success: {
      main: '#2E7D32',
      dark: '#1B5E20',
      light: '#4CAF50',
    },
    error: {
      main: '#D32F2F',
      dark: '#C62828',
      light: '#EF5350',
    },
    warning: {
      main: '#EF6C00',
      dark: '#E65100',
      light: '#FF9800',
    },
    info: {
      main: '#0288D1',
      dark: '#01579B',
      light: '#03A9F4',
    },
    text: {
      primary: '#000000DE',
      secondary: '#00000099',
      disabled: '#00000061',
    },
    active: {
      main: '#2E7D32',
      light: '#E8F5E9',
      dark: '#1B5E20',
    },
    inactive: {
      main: '#D32F2F',
      light: '#FEEBEE',
      dark: '#C62828',
    },
  },
  breakpoints: {
    values: {
      zero: 0,
      xs: 360,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          'textTransform': 'none',
          ':focus': {
            outline: 'none',
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          // removes focus outline added by bootstrap reset
          ':focus': {
            outline: 'none',
          },
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: 16,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: 16,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          lineHeight: '24px',
          letterSpacing: '0.15px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        inputSizeSmall: {
          padding: '8px 12px',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: '#F5F5F5',
        },
      },
    },
  },
});

interface Props {
  children: React.ReactNode;
}

const MuiThemeProvider = ({children}: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
    </ThemeProvider>
  );
};

export default MuiThemeProvider;
