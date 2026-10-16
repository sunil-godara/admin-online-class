import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  // DialogActions,
  TextField,
  Grid
} from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { addProduct } from "@/utils/api/invoice-management";
import { productRules } from "@/utils/constants/rules";
import { Store } from "@/utils/store";
import {
  formValidation,
  fieldValidation
} from "@/utils/validations/validation";

const filter = createFilterOptions();

export default function CustomSelect({
  id,
  name,
  placeholder,
  handleInputChange,
  value,
  options,
  setOptions,
  error,
  helperText
}) {
  const store = Store();
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [toggleOpen, setToggleOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [dialogValue, setDialogValue] = useState({
    product_name: "",
    sku_number: "",
    school_cash_price: ""
  });
  // const loading = open && options.length === 0;

  const handleClose = (event, reason) => {
    if (reason === "backdropClick") return;

    setDialogValue({
      product_name: "",
      sku_number: "",
      school_cash_price: ""
    });

    setErrors({
      product_name: "",
      sku_number: "",
      school_cash_price: ""
    });

    setToggleOpen(false);
  };

  const handleChange = ({ target }) => {
    setDialogValue({
      ...dialogValue,
      [target.name]: target.value
    });

    let errorMessage = productRules[target.name]
      ? fieldValidation(productRules[target.name], target.value)
      : "";

    setErrors({
      ...errors,
      [target.name]: errorMessage ? errorMessage : ""
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const validationErrors = formValidation(dialogValue, productRules);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = await addProduct({
          product_name: dialogValue.product_name,
          sku_number: dialogValue.sku_number,
          school_cash_price: dialogValue.school_cash_price
        });

        if (response.status) {
          store.setSnackbarDetails({
            status: true,
            message: response.message,
            color: "success",
            vertical: "top",
            horizontal: "right"
          });

          let currentProducts = [...options];

          let currentSelectedValue = {
            ...response.data,
            product_id: response.data.id
          };

          delete currentSelectedValue.id;

          currentProducts.push(currentSelectedValue);
          setOptions(currentProducts);
          handleInputChange(currentSelectedValue);
          handleClose();
        } else {
          store.setSnackbarDetails({
            status: true,
            message: response.message,
            color: "error",
            vertical: "top",
            horizontal: "right"
          });

          if (response.data) {
            setErrors(response.data);
          }
        }
      } catch (error) {
        store.setSnackbarDetails({
          status: true,
          message: "Something went wrong, Please try again.",
          color: "error",
          vertical: "top",
          horizontal: "right"
        });
      }
      setLoading(false);
    }
  };

  const handleUpdate = (event, newValue) => {
    if (typeof newValue === "string") {
      // timeout to avoid instant validation of the dialog's form.
      setTimeout(() => {
        setToggleOpen(true);
        setDialogValue({
          product_name: newValue,
          sku_number: "",
          school_cash_price: ""
        });
      });
    } else if (newValue && newValue.inputValue) {
      setToggleOpen(true);
      setDialogValue({
        product_name: newValue.inputValue,
        sku_number: "",
        school_cash_price: ""
      });
    } else {
      handleInputChange(newValue);
    }
  };

  useEffect(() => {
    if (value) {
      const selectedOption = options.find(
        option => option.product_id === value
      );

      if (selectedOption) {
        setSelectedValue(selectedOption);
      }
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Autocomplete
        value={selectedValue}
        onChange={handleUpdate}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              product_id: "",
              product_name: `Add "${params.inputValue}"`,
              sku_number: "",
              school_cash_price: "",
              inputValue: params.inputValue
            });
          }

          return filtered;
        }}
        id={id}
        options={options}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) =>
          option.product_name === value.product_name
        }
        getOptionLabel={option => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.product_name;
        }}
        selectOnFocus
        clearOnBlur
        open={open}
        loading={loading}
        handleHomeEndKeys
        renderOption={(props, option) => (
          <li {...props} key={`option-${option.product_id}`}>
            {option.product_name}
          </li>
        )}
        freeSolo
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
        name={name}
        fullWidth
      />
      <Dialog open={toggleOpen} onClose={handleClose} disableEscapeKeyDown>
        <DialogTitle component="h2" variant="h2">
          <strong>Add a new product</strong>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Did you miss any product in our list? Please, add it!
          </DialogContentText>
          <Grid container rowSpacing={1} columnSpacing={2}>
            <Grid item xs={6} md={3} lg={4}>
              <TextField
                margin="dense"
                id="product_name"
                name="product_name"
                value={dialogValue.product_name}
                onChange={handleChange}
                label="Product Name"
                type="text"
                variant="standard"
                helperText={errors.product_name}
                error={Boolean(errors.product_name)}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={4}>
              <TextField
                margin="dense"
                id="sku_number"
                name="sku_number"
                value={dialogValue.sku_number}
                onChange={handleChange}
                label="Sku Number"
                type="text"
                variant="standard"
                helperText={errors.sku_number}
                error={Boolean(errors.sku_number)}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={4}>
              <TextField
                margin="dense"
                id="rate"
                name="school_cash_price"
                value={dialogValue.school_cash_price}
                onChange={handleChange}
                label="Rate"
                type="number"
                variant="standard"
                helperText={errors.school_cash_price}
                error={Boolean(errors.school_cash_price)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <ActionContainer>
          <Button variant="containedSecondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {loading ? <CircularProgress /> : "Save"}
          </Button>
        </ActionContainer>
      </Dialog>
    </>
  );
}

const ActionContainer = styled.div`
  ${({ theme }) => `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${theme.spacing(1)};
  padding: 16px;

`}
`;
