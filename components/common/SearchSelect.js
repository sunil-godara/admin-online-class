import React, { useState, useEffect } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

function sleep(duration) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function SearchSelect({
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
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = (event, newValue) => {
    if (
      typeof newValue !== "string" &&
      newValue &&
      typeof newValue.inputValue == "undefined"
    ) {
      handleInputChange({
        target: {
          name: name,
          value: newValue.id
        }
      });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (inputValue === "") {
          setFilteredOptions([]);
          setLoading(false);
          return;
        } else {
          setLoading(true);
          const trimmedInputValue = inputValue.trim();

          const newOptions = trimmedInputValue
            ? [...options].filter(option =>
                option.title
                  .toLowerCase()
                  .includes(trimmedInputValue.toLowerCase().trim())
              )
            : [];
          await sleep(1e3);

          setFilteredOptions(newOptions);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    })();
  }, [inputValue]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) {
      setFilteredOptions([]);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (value) {
      let selectedOption = options.find(option => option.id === value);

      if (selectedOption && selectedOption.title !== inputValue) {
        const trimmedInputValue = selectedOption.title.trim();

        const newOptions = trimmedInputValue
          ? [...options].filter(option =>
              option.title
                .toLowerCase()
                .includes(trimmedInputValue.toLowerCase().trim())
            )
          : [];

        setFilteredOptions(newOptions);

        setInputValue(selectedOption.title);
      }
    } else {
      setInputValue("");
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Autocomplete
      id={id}
      name={name}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      fullWidth={fullWidth}
      isOptionEqualToValue={(option, value) =>
        option.title === value.title || ""
      }
      getOptionLabel={option => option.title || inputValue}
      filterOptions={x => x}
      options={filteredOptions}
      loading={loading}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={params => (
        <TextField
          {...params}
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
          error={error}
          helperText={helperText}
        />
      )}
      onChange={handleUpdate}
      value={inputValue}
    />
  );
}
