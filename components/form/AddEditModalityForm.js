import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography,
  MenuItem
} from "@mui/material";
import { modalityRules } from "@/utils/constants/rules";
import { addModality, editModality } from "@/utils/api/modalities-management";
import { statusType } from "@/utils/constants/user-constants";
import { Store } from "@/utils/store";
import {
  formValidation,
  fieldValidation
} from "@/utils/validations/validation";

export default function AddEditModalityForm({ modalityDetails }) {
  const store = Store();
  const router = useRouter();

  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    iconUrl: "",
    status: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = ({ target }) => {
    setInputs(inputs => ({
      ...inputs,
      [target.name]: target.value
    }));

    let errorMessage = modalityRules[target.name]
      ? fieldValidation(modalityRules[target.name], target.value)
      : "";

    setErrors({
      ...errors,
      [target.name]: errorMessage ? errorMessage : ""
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const validationErrors = formValidation(inputs, modalityRules);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = modalityDetails
          ? await editModality(inputs)
          : await addModality(inputs);

        if (response.status === true) {
          store.setSnackbarDetails({
            status: true,
            message: response.message,
            color: "success",
            vertical: "top",
            horizontal: "right"
          });

          router.push({
            pathname: "/admin/modalities-management/list-modality"
          });
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

  useEffect(() => {
    if (modalityDetails && Object.keys(modalityDetails).length) {
      const { data } = modalityDetails;
      if (data) {
        setInputs(prev => ({
          ...prev,
          id: data.id || "",
          name: data.name || "",
          description: data.description || "",
          iconUrl: data.iconUrl || "",
          status: data.status || "1"
        }));
      }
    }
  }, [modalityDetails]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Modality Information
      </Typography>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        alignItems="center"
      >
        <Grid item xs={12} md={6} lg={4}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Name</FormLabel>
            <TextField
              placeholder="Enter Modality Name"
              name="name"
              value={inputs.name}
              onChange={handleInputChange}
              helperText={errors.name}
              error={Boolean(errors.name)}
              fullWidth
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Status</FormLabel>
            <TextField
              name="status"
              select
              value={inputs.status}
              onChange={handleInputChange}
              helperText={errors.status}
              error={Boolean(errors.status)}
              SelectProps={{
                displayEmpty: true,
                MenuProps: { sx: { maxHeight: 320 } }
              }}
            >
              <MenuItem value={""}>Please Select</MenuItem>
              {statusType.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Description</FormLabel>
            <TextField
              placeholder="Enter Description"
              name="description"
              value={inputs.description}
              onChange={handleInputChange}
              helperText={errors.description}
              error={Boolean(errors.description)}
              multiline
              rows={4}
              fullWidth
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
            <FormLabel>Icon URL</FormLabel>
            <TextField
              placeholder="Enter Icon URL"
              name="iconUrl"
              value={inputs.iconUrl}
              onChange={handleInputChange}
              helperText={errors.iconUrl}
              error={Boolean(errors.iconUrl)}
              fullWidth
            />
          </FormControl>
        </Grid>
      </Grid>

      <ActionContainer>
        <Button
          variant="containedSecondary"
          onClick={() =>
            router.push("/admin/modalities-management/list-modality")
          }
        >
          Back
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </ActionContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => `
  padding: ${theme.spacing(3, 4)};

  .MuiFormHelperText-root {
    color: ${theme.colors.palette.darkRed};
  }

  .MuiFormLabel-root {
    color: ${theme.colors.palette.darkGrey};
    margin-bottom: ${theme.spacing(1)};
    display: block;
    font-size: 14px;
  }

  .MuiGrid-root {
    overflow: visible
  }
`}
`;

const ActionContainer = styled.div`
  ${({ theme }) => `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${theme.spacing(1)};
`}
`;
