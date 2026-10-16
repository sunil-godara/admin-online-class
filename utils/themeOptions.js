import { createTheme } from "@mui/material";
import "@fontsource/montserrat";
import "@fontsource/open-sans";

const fontFamily = `"Montserrat"`;

export const themeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
      dark: "#000000",
      light: "#333333",
      contrastText: "#ffffff"
    },
    secondary: {
      light: "#83898f",
      main: "#646c73",
      dark: "#464b50",
      contrastText: "#ffffff"
    },
    white: {
      light: "#FFFFFF",
      main: "#FFFFFF",
      dark: "#b2b2b2",
      contrastText: "#000000"
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#ffffff"
    },
    warning: {
      light: "#ffa726",
      main: "#ffa726",
      dark: "#ffa726",
      contrastText: "#000000de"
    },
    info: {
      light: "#29b6f6",
      main: "#29b6f6",
      dark: "#29b6f6",
      contrastText: "#000000de"
    },
    success: {
      light: "#66bb6a",
      main: "#66bb6a",
      dark: "#66bb6a",
      contrastText: "#000000de"
    },
    grey: {
      50: "#fafafa",
      100: "#555555",
      200: "#aeaeae",
      300: "#eeeeee",
      400: "#eef1f2",
      500: "#585858",
      600: "#717a81",
      700: "#2c3e50",
      800: "#424242",
      900: "#212121"
    },
    text: {
      primary: "#646c73",
      secondary: "#717a81",
      disabled: "#b6bbc0",
      white: "#ffffff",
      black: "#000000",
      red: "#ff0000"
    },
    red: "#ff0000",
    background: {
      default: "#f5f5f5",
      paper: "#ffffff"
    }
  },
  spacing: 8
};

const globalTheme = createTheme(themeOptions);

export const defaultTheme = createTheme(globalTheme, {
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    },
    unit: "px"
  },
  direction: "ltr",
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          border: `none`,
          boxShadow: "none",
          borderRadius: "10px",
          fontSize: "18px",
          fontWeight: 700,
          height: "55px",
          textTransform: "uppercase",
          opacity: "1",
          "&:first-child, &:last-child": {
            borderRight: "none"
          },
          "&:hover": {
            backgroundColor: `${globalTheme.palette.grey[700]}`,
            boxShadow: "none"
          },
          "@media (max-width: 1199px)": {
            fontSize: "15px"
          }
        },
        outlined: {
          border: "1px solid",
          borderColor: `${globalTheme.palette.grey[200]}`,
          boxShadow: "none",
          borderRadius: "10px",
          fontSize: "18px",
          fontWeight: 700,
          height: "55px",
          textTransform: "uppercase",
          opacity: "1",
          padding: globalTheme.spacing(1, 3),
          minWidth: "280px",

          "&:hover": {
            backgroundColor: `${globalTheme.palette.grey[700]}`,
            boxShadow: "none",
            color: `${globalTheme.palette.white}`
          }
        },

        sizeSmall: {
          border: "none",
          boxShadow: "none",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: 600,
          height: "55px",
          textTransform: "uppercase",
          padding: globalTheme.spacing(0.5, 3),
          minWidth: "125px",
          "&:hover": {
            backgroundColor: `${globalTheme.palette.grey[700]}`,
            boxShadow: "none"
          },

          "@media (max-width: 1199px)": {
            height: "45px"
          }
        }
      }
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          ".MuiInputBase-input": {
            fontSize: 14,
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 15,
            paddingRight: 15,
            height: 35,
            backgroundColor: `${globalTheme.palette.white.main}`,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: `${globalTheme.palette.grey[200]}`,
            color: `${globalTheme.palette.grey[500]}`,
            boxShadow: "none",
            borderRadius: 10,
            fontWeight: 400,
            "&:focus": {
              borderColor: `${globalTheme.palette.primary.main}`
            },
            "&::placeholder": {
              color: `${globalTheme.palette.grey[500]}`,
              opacity: 1
            }
          },
          ".MuiOutlinedInput-notchedOutline": {
            border: 0
          }
        }
      }
    }
  },
  shape: {
    borderRadius: 4
  },
  unstable_sxConfig: {
    border: {
      themeKey: "borders"
    },
    borderTop: {
      themeKey: "borders"
    },
    borderRight: {
      themeKey: "borders"
    },
    borderBottom: {
      themeKey: "borders"
    },
    borderLeft: {
      themeKey: "borders"
    },
    borderColor: {
      themeKey: "palette"
    },
    borderTopColor: {
      themeKey: "palette"
    },
    borderRightColor: {
      themeKey: "palette"
    },
    borderBottomColor: {
      themeKey: "palette"
    },
    borderLeftColor: {
      themeKey: "palette"
    },
    outline: {
      themeKey: "borders"
    },
    outlineColor: {
      themeKey: "palette"
    },
    borderRadius: {
      themeKey: "shape.borderRadius"
    },
    color: {
      themeKey: "palette"
    },
    bgcolor: {
      themeKey: "palette",
      cssProperty: "backgroundColor"
    },
    backgroundColor: {
      themeKey: "palette"
    },
    p: {},
    pt: {},
    pr: {},
    pb: {},
    pl: {},
    px: {},
    py: {},
    padding: {},
    paddingTop: {},
    paddingRight: {},
    paddingBottom: {},
    paddingLeft: {},
    paddingX: {},
    paddingY: {},
    paddingInline: {},
    paddingInlineStart: {},
    paddingInlineEnd: {},
    paddingBlock: {},
    paddingBlockStart: {},
    paddingBlockEnd: {},
    m: {},
    mt: {},
    mr: {},
    mb: {},
    ml: {},
    mx: {},
    my: {},
    margin: {},
    marginTop: {},
    marginRight: {},
    marginBottom: {},
    marginLeft: {},
    marginX: {},
    marginY: {},
    marginInline: {},
    marginInlineStart: {},
    marginInlineEnd: {},
    marginBlock: {},
    marginBlockStart: {},
    marginBlockEnd: {},
    displayPrint: {
      cssProperty: false
    },
    display: {},
    overflow: {},
    textOverflow: {},
    visibility: {},
    whiteSpace: {},
    flexBasis: {},
    flexDirection: {},
    flexWrap: {},
    justifyContent: {},
    alignItems: {},
    alignContent: {},
    order: {},
    flex: {},
    flexGrow: {},
    flexShrink: {},
    alignSelf: {},
    justifyItems: {},
    justifySelf: {},
    gap: {},
    rowGap: {},
    columnGap: {},
    gridColumn: {},
    gridRow: {},
    gridAutoFlow: {},
    gridAutoColumns: {},
    gridAutoRows: {},
    gridTemplateColumns: {},
    gridTemplateRows: {},
    gridTemplateAreas: {},
    gridArea: {},
    position: {},
    zIndex: {
      themeKey: "zIndex"
    },
    top: {},
    right: {},
    bottom: {},
    left: {},
    boxShadow: {
      themeKey: "shadows"
    },
    width: {},
    maxWidth: {},
    minWidth: {},
    height: {},
    maxHeight: {},
    minHeight: {},
    boxSizing: {},
    font: {
      themeKey: "font"
    },
    fontFamily: {
      themeKey: "typography"
    },
    fontSize: {
      themeKey: "typography"
    },
    fontStyle: {
      themeKey: "typography"
    },
    fontWeight: {
      themeKey: "typography"
    },
    letterSpacing: {},
    textTransform: {},
    lineHeight: {},
    textAlign: {},
    typography: {
      cssProperty: false,
      themeKey: "typography"
    }
  },
  mixins: {
    toolbar: {
      minHeight: 56,
      "@media (min-width:0px)": {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      "@media (min-width:600px)": {
        minHeight: 64
      }
    }
  },
  shadows: [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
    "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
    "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
    "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
    "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
    "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
    "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
    "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
    "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
    "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
    "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
    "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
    "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
  ],
  typography: {
    fontFamily: fontFamily,
    fontSize: 16,
    letterSpacing: 1,
    h1: {
      fontWeight: 700,
      fontSize: "38px",
      lineHeight: 1.2,
      fontFamily: fontFamily,
      letterSpacing: "1px",
      "@media (max-width: 1199px)": {
        fontSize: "34px"
      },

      "@media (max-width: 960px)": {
        fontSize: "32px"
      },

      "@media (max-width: 600px)": {
        fontSize: "28px"
      }
    },
    h2: {
      fontFamily: fontFamily,
      fontWeight: 600,
      fontSize: "30px",
      lineHeight: 1.2,
      letterSpacing: "1px",
      "@media (max-width: 1199px)": {
        fontSize: "28px"
      },

      "@media (max-width: 960px)": {
        fontSize: "26px"
      },

      "@media (max-width: 600px)": {
        fontSize: "22px"
      }
    },
    h3: {
      fontFamily: fontFamily,
      fontWeight: 400,
      fontSize: "3rem",
      lineHeight: 1.167,
      letterSpacing: "1px"
    },
    h4: {
      fontFamily: fontFamily,
      fontWeight: 400,
      fontSize: "2.125rem",
      lineHeight: 1.235,
      letterSpacing: "1px"
    },
    h5: {
      fontFamily: fontFamily,
      fontWeight: 400,
      fontSize: "1.5rem",
      lineHeight: 1.334,
      letterSpacing: "1px"
    },
    h6: {
      fontFamily: fontFamily,
      fontWeight: 500,
      fontSize: "1.25rem",
      lineHeight: 1.6,
      letterSpacing: "1px"
    },

    subtitle1: {
      fontFamily: fontFamily,
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.75,
      letterSpacing: "1px"
    },
    subtitle2: {
      fontFamily: fontFamily,
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.57,
      letterSpacing: "1px"
    },
    body: {
      letterSpacing: "0.5px"
    },
    body1: {
      fontFamily: fontFamily,
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.5px"
    },
    body2: {
      fontFamily: fontFamily,
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.43,
      letterSpacing: "0.5px"
    },
    button: {
      fontFamily: fontFamily,
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.75,
      letterSpacing: "1px",
      textTransform: "uppercase"
    },
    caption: {
      fontFamily: fontFamily,
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.66,
      letterSpacing: "1px"
    },
    overline: {
      fontFamily: fontFamily,
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 2.66,
      letterSpacing: "1px",
      textTransform: "uppercase"
    },
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  },
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195
    }
  },
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500
  }
});
