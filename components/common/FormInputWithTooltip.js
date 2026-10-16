import React from "react";
import { FormControl, FormLabel, Tooltip, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { styled } from "@mui/material/styles";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  "& .MuiFormLabel-root": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1)
  },

  "& .MuiIconButton-root": {
    padding: 0,
    color: theme.palette.text.secondary,
    "&:hover": {
      color: theme.palette.primary.main
    }
  }
}));

const FormInputWithTooltip = ({
  label,
  tooltip,
  children,
  required,
  error,
  fullWidth = true,
  sx = {},
  ...props
}) => {
  return (
    <StyledFormControl
      variant="outlined"
      fullWidth={fullWidth}
      required={required}
      error={error}
      sx={{ mb: 2, ...sx }}
      {...props}
    >
      <FormLabel>
        {label}
        <Tooltip title={tooltip} arrow placement="top">
          <IconButton size="small">
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </FormLabel>
      {children}
    </StyledFormControl>
  );
};

export default FormInputWithTooltip;
