import { Switch as MuiSwitch } from "@mui/material";

export default function Switch({
  checked,
  handleChange,
  id,
  readOnly,
  disabled
}) {
  return (
    <MuiSwitch
      checked={checked}
      disabled={disabled}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
      id={id}
      color="primary"
      readOnly={readOnly}
    />
  );
}
