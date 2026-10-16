/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";

const PreviewContainer = styled("div")(() => ({
  marginTop: 10,

  img: {
    width: 300,
    height: 200
  }
}));

const FileContainer = styled("div")(() => ({
  ".MuiInputBase-root": {
    ".MuiInputBase-input": {
      "&[type*='file']": {
        color: "transparent",

        "&::-webkit-file-upload-button": {
          display: "none"
        }
      }
    }
  },

  ".customFileUploader": {
    position: "absolute",
    top: 10,
    right: 5,
    left: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: "1",
    cursor: "pointer",

    "& p": {
      fontSize: 14,
      opacity: 0.5,
      marginBottom: 0
    }
  }
}));

function arraysAreEqual(arr1, arr2) {
  if (arr1 && arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    return arr1.every((value, index) => value === arr2[index]);
  }

  return false;
}

export function FileInput({
  onChange = undefined,
  disabled = false,
  error = false,
  fullWidth = true,
  helperText = "",
  id = "grypp-input",
  name = "grypp-input",
  placeholder = `enter value here...`,
  required = false,
  value = "",
  inputProps,
  multiple
}) {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState({});
  const [inputValues, setInputValues] = useState([]);

  const placeHolderText =
    placeholder === "enter value here..."
      ? `Click to select file here...`
      : placeholder;

  const handleFileSelection = receivedValue => {
    if (typeof onChange !== "undefined") {
      // *NOTE* can be handled in action handler and new value will come from props which will be picked up by use effect to update the internal state
      onChange({
        target: {
          name,
          value: receivedValue
        }
      });
    }
  };

  const handleMultiUpload = async (event, newValue) => {
    let receivedValue;

    if (!event) {
      receivedValue = newValue;
    } else {
      receivedValue = event.target.files;
    }

    if (!arraysAreEqual(inputValues, receivedValue)) {
      let output = [];

      for (let file of receivedValue) {
        const reader = new FileReader();
        const loadPromise = new Promise((resolve, reject) => {
          reader.onload = () => resolve(true);
          reader.onerror = error => reject(error);
        });

        reader.readAsDataURL(file);
        await loadPromise;

        output = [
          ...output,
          {
            fileSource: reader.result,
            fileName: file.name
          }
        ];
      }

      setInputValues(output);
      handleFileSelection(output);
    }
  };

  const changeHandler = (event, newValue) => {
    let receivedValue;

    if (!event) {
      receivedValue = newValue;
    } else {
      receivedValue = event.target.files?.[0];
    }

    if (inputValue !== receivedValue) {
      const isFile = receivedValue instanceof File;

      if (isFile) {
        const reader = new FileReader();
        reader.readAsDataURL(receivedValue);

        reader.onload = () => {
          setInputValue({
            fileSource: reader.result,
            fileName: receivedValue.name
          });
          handleFileSelection({
            fileSource: reader.result,
            fileName: receivedValue.name || event.target.files?.[0]
          });
        };

        reader.onerror = function (error) {
          console.log("Error: ", error);
        };
      } else {
        setInputValue(receivedValue);
        handleFileSelection(receivedValue);
      }
    }
  };

  useEffect(() => {
    if (multiple) {
      if (arraysAreEqual(inputValue, value)) {
        handleMultiUpload(null, value);
      }
    } else {
      if (value !== "" && inputValue !== value) {
        changeHandler(null, value);
      }
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const getPreviews = () => {
    if (multiple) {
      let previews = [];

      let index = 0;

      for (let value of inputValues) {
        previews.push(
          <PreviewContainer key={`image-preview-${index}`}>
            <img
              src={value.fileSource}
              alt={value.fileName ? value.fileName : "uploaded"}
              aria-label={value.fileName ? value.fileName : "uploaded"}
            />
          </PreviewContainer>
        );

        index++;
      }

      return previews;
    } else {
      if (Object.keys(inputValue).length) {
        return (
          <PreviewContainer>
            <img
              src={inputValue.fileSource}
              alt={inputValue.fileName ? inputValue.fileName : "uploaded"}
              aria-label={
                inputValue.fileName ? inputValue.fileName : "uploaded"
              }
            />
          </PreviewContainer>
        );
      }
    }
  };

  return (
    <div className="outer" style={{ position: "relative" }}>
      <FileContainer>
        <TextField
          disabled={disabled}
          error={error}
          fullWidth={fullWidth}
          helperText={helperText}
          id={id}
          name={name}
          onChange={multiple ? handleMultiUpload : changeHandler}
          placeholder={placeHolderText}
          required={required}
          type={"file"}
          inputRef={inputRef}
          inputProps={inputProps}
          multiple={multiple}
        />
        <label
          className="customFileUploader"
          htmlFor={`file-input-${id}`}
          onClick={() => inputRef.current?.click()}
          aria-hidden="true"
        >
          {multiple ? (
            <Typography>
              {inputValues.length > 0
                ? `${inputValues[0].fileName} and more`
                : "Add Your file"}
            </Typography>
          ) : (
            <Typography>
              {inputValue.fileName ? inputValue.fileName : "Add Your file"}
            </Typography>
          )}
          <Button variant="contained" color="primary" size="small">
            Upload
          </Button>
        </label>
      </FileContainer>
      {getPreviews()}
    </div>
  );
}
