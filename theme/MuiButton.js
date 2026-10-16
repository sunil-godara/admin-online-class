import colors from "./colors";
import spacing from "./spacing";

const MuiButton = {
  styleOverrides: {
    root: {
      border: `1px solid ${colors.palette.darkBlue}`,
      borderRadius: "4px",
      fontSize: "16px",
      fontWeight: 400,
      height: "40px",
      minWidth: "100%",
      "@media (min-width: 960px)": {
        minWidth: "120px"
      },
      padding: `${spacing[2]}px`,
      textTransform: "none"
    },
    contained: {
      boxShadow: "none",
      backgroundColor: `${colors.palette.darkBlue}`,
      "&:active": {
        boxShadow: "none"
      },
      "&:hover": {
        boxShadow: "0 4px 10px rgba(0, 0, 0, .25)"
      },
      "&.Mui-disabled": {
        borderColor: "rgba(0, 0, 0, 0.12)"
      }
    },
    containedSizeSmall: {
      fontSize: "16px",
      padding: `0 ${spacing[1]}px`,
      height: "35px"
    },
    containedSizeLarge: {
      fontSize: "16px",
      padding: `${spacing[2]}px`,

      "@media (min-width: 960px)": {
        minWidth: "338px"
      }
    },
    containedPrimary: {
      "&:hover": {
        backgroundColor: colors.palette.darkBlue
      }
    },
    containedSecondary: {
      backgroundColor: colors.palette.darkGrey,
      color: colors.palette.white,
      border: 0,
      "&:hover": {
        backgroundColor: colors.palette.darkGrey,
        boxShadow: "0 4px 10px rgba(0, 0, 0, .25)",

        "@media (hover: none)": {
          backgroundColor: colors.palette.darkGrey
        }
      }
    },
    containedError: {
      backgroundColor: colors.palette.darkRed,
      color: colors.palette.white,
      border: 0,
      "&:hover": {
        backgroundColor: colors.palette.darkRed,
        boxShadow: "0 4px 10px rgba(0, 0, 0, .25)",

        "@media (hover: none)": {
          backgroundColor: colors.palette.darkRed
        }
      }
    },
    outlinedSizeSmall: {
      fontSize: "14px",
      padding: `${spacing[2]}px`,
      height: "36px"
    },
    outlinedSizeLarge: {
      fontSize: "16px",
      padding: `0 ${spacing[2]}px`,
      "@media (min-width: 960px)": {
        minWidth: "338px"
      }
    },
    outlinedPrimary: {
      border: `1px solid ${colors.palette.darkBlue}`,
      padding: `${spacing[2]}px`,
      color: `${colors.palette.darkBlue}`,
      backgroundColor: colors.palette.white,

      "&:hover": {
        border: `1px solid ${colors.palette.darkBlue}`,
        backgroundColor: colors.palette.darkBlue,
        color: colors.palette.white,

        "@media (hover: none)": {
          backgroundColor: colors.palette.darkBlue
        }
      }
    },
    outlinedSecondary: {
      border: `1px solid ${colors.palette.darkerGray}`,
      padding: `${spacing[2]}px`,
      color: `${colors.palette.darkGrey}`,

      "&:hover": {
        border: `1px solid ${colors.palette.darkBlue}`,
        backgroundColor: colors.palette.darkBlue,
        color: colors.palette.white,

        "@media (hover: none)": {
          backgroundColor: colors.palette.darkBlue
        }
      }
    },
    text: {
      border: "none",
      fontWeight: 400,
      height: "auto",
      padding: `${spacing[2]}px 0`
    },
    textSizeSmall: {
      fontSize: "16px",
      fontWeight: 400,
      textAlign: "left",
      lineHeight: 1.5,
      padding: 0,
      minWidth: 0
    },
    textSizeLarge: {
      fontSize: "16px",
      fontWeight: 400,
      textAlign: "left",
      lineHeight: 1.5,
      padding: 0,
      minWidth: 0
    },
    textPrimary: {
      color: colors.palette.mauve,
      "&:hover": {
        backgroundColor: colors.palette.white,
        textDecoration: "underline"
      }
    },
    endIcon: {
      marginLeft: "-4px"
    },
    iconSizeSmall: {
      "& > *:first-of-type": {
        fontSize: "30px"
      }
    },
    iconSizeLarge: {
      "& > *:first-of-type": {
        fontSize: "30px"
      }
    }
  }
};

export default MuiButton;
