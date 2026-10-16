import React from "react";
import { Autocomplete, TextField, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function SearchMultiSelect({
  id,
  name,
  placeholder,
  handleInputChange,
  options,
  error,
  helperText,
  fullWidth,
  value
}) {
  return (
    <Autocomplete
      fullWidth={fullWidth}
      multiple
      id={id}
      name={name}
      options={options}
      disableCloseOnSelect
      getOptionLabel={option => option.title}
      value={options.filter(opt => value?.includes(opt.id))}
      onChange={(_, selectedOptions) => {
        handleInputChange({
          target: { name, value: selectedOptions.map(opt => opt.id) }
        });
      }}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        );
      }}
      renderInput={params => (
        <TextField
          {...params}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
}
