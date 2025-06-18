/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // increase the specificity of tailwind classes
  important: "#app",
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Lato"', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        "xs": "360px",
        "sm": "600px",
        "md": "900px",
        "lg": "1200px",
        "xl": "1440px",
        "2xl": "1536px",
      },
      /**
       * @description extension to customise app wide primary colors and fonts,
       * it should match the rising desing system
       * @link https://www.figma.com/design/LAX0Jy2mUYP9cV9qpgjIyh/Rising-Design-System
       */
      colors: {
        neutral : {
            50: "#F7F8F9",
            100: "#E7EAEE",
            200: "#D0D5DD",
            300: "#B8C0CC",
            400: "#A0ABBB",
            500: "#64748B",
            600: "#4B5768",
            700: "#323A46",
            800: "#191D23",
            900: "#0D0F11",
        },
        "neutral-grey": {
            100: "#F5F5F5",
            200: "#E2E8F0",
            500: "#CBD5E1",
            600: "#475569",
        },
        "primary": {
            DEFAULT: "#6576FF",
        },
        "primary-blue": {
            50: "#F5F6FF",
            100: "#E0E4FF",
            200: "#C2C8FF",
            300: "#A3ADFF",
            400: "#6576FF",
            500: "#3249FF",
            600: "#001AE5",
            700: "#001199",
            800: "#00094C",
            900: "#000426",
        },
        "secondary": {
            DEFAULT: "#9C27B0",
            50: "#FEFAED",
            100: "#FDF0C8",
            200: "#FBE7A3",
            300: "#F9DD7E",
            400: "#F8D359",
            500: "#F7CE46",
            600: "#C6A538",
            700: "#947C2A",
            800: "#63521C",
            900: "#31290E",
        },
        "success": {
            50: "#EDF7ED",
            30: "#2E7D324D",
            DEFAULT: "#2E7D32",
        },
        "success-green": {
            50: "#ECFDF5",
            100: "#D1FAE5",
            200: "#A7F3D0",
            300: "#6EE7B7",
            400: "#34D399",
            500: "#10B981",
            600: "#059669",
            700: "#047857",
            800: "#065F46",
            900: "#064E3B",
        },
        "error": {
            DEFAULT: "#D32F2F",
        },
        "error-red": {
            50: "#FEF2F2",
            100: "#FEE2E2",
            200: "#FECACA",
            300: "#FCA5A5",
            400: "#F87171",
            500: "#EF4444",
            600: "#DC2626",
            700: "#B91C1C",
            800: "#991B1B",
            900: "#7F1D1D",
        },
        "warning-yellow": {
            50: "#FFFBEB",
            100: "#FEF3C7",
            200: "#FDE68A",
            300: "#FCD34D",
            400: "#FBBF24",
            500: "#F59E0B",
            600: "#D97706",
            700: "#B45309",
            800: "#92400E",
            900: "#78350F",
        },
        "warning": {
            DEFAULT: "#EF6C00",
        },
        "dark-mode": {
            50: "#3A3C43",
            100: "#373A41",
            200: "#35373E",
            300: "#30333A",
            400: "#2E3138",
            500: "#292C33",
            600: "#272A31",
            700: "#24272F",
            800: "#20232A",
            900: "#14171F",
        },
        "text-primary": "#000000de",
        "text-secondary": "#00000099",
        "text-disabled": "#00000061",

        "black": {
            DEFAULT: "#000000",
            12: "#0000001F",
            60: "#00000099",
            87: "#000000DE"
        },
        white: "#FFFFFF",
        "violet-solid": "#5640FB",
        "violet-primary": "#362E93",
        "violet-secondary": "#533EF2B8",
        "violet-gradient": ["#362E93", "#533EF2"],
        "violet-gradient-banner": "linear-gradient(270deg, #362E93 -8.09%, #533EF2B8 106.51%)",
        blue: "#1AA1DE",
        green: "#20C9B7",
        "red": {
            DEFAULT: "#F58692",
            50: "#FEEBEE"
        },
        "grey-dark": "#6E778A",
        "grey-light": "#F1F4F8",
        dark: "#161C2D",

        "skeleton-1": "#E7EAEE",
        "progress-yellow": "#FBBF24",
        "circular-stroke": "#e6e6e6",
        "circular-fill": "#323A46",
        "sidebar-item-bg": "#6576FF1F"
    },
    fontSize: {
        // MUI
        "h1": ["96px",
            {
                lineHeight: "112px",
                fontWeight: "300",
                letterSpacing: "-1.5px",
            }
        ],
        "h2": ["60px",
            {
                lineHeight: "72px",
                fontWeight: "300",
                letterSpacing: "-0.5px",
            }
        ],
        "h3": ["48px",
            {
                lineHeight: "56px",
                fontWeight: "400",
            }
        ],
        "h4": ["34px",
            {
                lineHeight: "42px",
                fontWeight: "400",
                letterSpacing: "0.25px",
            }
        ],
        "h5": ["24px",
            {
                lineHeight: "32px",
                fontWeight: "400",
            }
        ],
        "h6": ["20px",
            {
                lineHeight: "32px",
                fontWeight: "500",
                letterSpacing: "0.15px"
            }
        ],
        "subtitle1": ["16px",
            {
                lineHeight: "28px",
                fontWeight: "400",
                letterSpacing: "0.15px"
            }
        ],
        "subtitle2": ["14px",
            {
                lineHeight: "22px",
                fontWeight: "500",
                letterSpacing: "0.1px"
            }
        ],
        "body1": ["16px",
            {
                lineHeight: "24px",
                fontWeight: "400",
                letterSpacing: "0.15px"
            }
        ],
        "body2": ["14px",
            {
                lineHeight: "20px",
                fontWeight: "400",
                letterSpacing: "0.17px"
            }
        ],
        "caption": ["12px",
            {
                lineHeight: "20px",
                fontWeight: "400",
                letterSpacing: "0.4px"
            }
        ],
        "overline": ["12px",
            {
                lineHeight: "32px",
                fontWeight: "400",
                letterSpacing: "1px"
            }
        ],
        // classic
        "sub-heading-semibold": ["20px",
            {
                lineHeight: "24px",
                fontWeight: "600",
            }
        ],
        "p1-regular": ["14px",
            {
                lineHeight: "17px",
                fontWeight: "400",
            }
        ],
        "p2-regular": ["16px",
            {
                lineHeight: "19px",
                fontWeight: "400",
            }
        ],
      },
      boxShadow: {
        'sidebar': '0.5px 0px 1px 0px rgba(0, 0, 0, 0.25)',
      },
      transitionProperty: {
        'height': 'height',
        'width': 'width',
        'spacing': 'margin, padding',
      }
    }
  },
  plugins: [],
}

export default config;

