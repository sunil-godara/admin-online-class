import React from "react";
import { styled } from "@mui/material/styles";
import { Button, CircularProgress } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1
});

const FileUpload = ({
  handleUpload,
  label,
  Icon = false,
  multiple = false,
  name,
  variant,
  color,
  size,
  loading
}) => {
  return (
    <Button
      component="label"
      variant={variant}
      color={color}
      startIcon={Icon ? <CloudUpload fontSize="small" /> : undefined}
      size={size}
      disabled={loading}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {label}
          <VisuallyHiddenInput
            type="file"
            name={name}
            onChange={handleUpload}
            multiple={multiple}
          />
        </>
      )}
    </Button>
  );
};
export default FileUpload;
