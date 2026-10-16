import colors from "./colors";

const MuiTextField = {
  styleOverrides: {
    root: {
      ".MuiInputBase-sizeSmall": {
        fontSize: 14,
        height: 36,
        padding: 0
      },

      ".MuiInputLabel-root": {
        fontSize: 14
      },

      ".MuiOutlinedInput-notchedOutline": {
        borderColor: `${colors.palette.darkerGray}`
      }
    }
  }
};

export default MuiTextField;
