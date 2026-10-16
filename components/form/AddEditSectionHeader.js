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
  Typography
} from "@mui/material";
import {
  addSectionHeader,
  editSectionHeader
} from "@/utils/api/section-header";
import { sectionHeaderRules } from "@/utils/constants/rules";
import { sectionHeaderFields } from "@/utils/constants/content-library-constants";
import { Store } from "@/utils/store";
import {
  formValidation,
  fieldValidation
} from "@/utils/validations/validation";

export default function AddEditSectionHeader({ sectionDetails }) {
  const store = Store();
  const router = useRouter();

  const [inputs, setInputs] = useState(sectionHeaderFields);
  const [errors, setErrors] = useState(sectionHeaderFields);
  const [loading, setLoading] = useState(false);

  const handleInputChange = ({ target }) => {
    setInputs(inputs => ({
      ...inputs,
      [target.name]: target.value
    }));

    let errorMessage = sectionHeaderRules[target.name]
      ? fieldValidation(sectionHeaderRules[target.name], target.value)
      : "";

    setErrors({
      ...errors,
      [target.name]: errorMessage ? errorMessage : ""
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const validationErrors = formValidation(inputs, sectionHeaderRules);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = sectionDetails
          ? await editSectionHeader(inputs)
          : await addSectionHeader(inputs);

        if (response.status === true) {
          store.setSnackbarDetails({
            status: true,
            message: response.message,
            color: "success",
            vertical: "top",
            horizontal: "right"
          });

          router.push({
            pathname: "/content-library/section-header"
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
    if (sectionDetails && Object.keys(sectionDetails).length) {
      let sectionData = { ...sectionDetails };

      sectionData = {
        ...inputs,
        ...sectionData,
        refund_id: sectionDetails.id
      };
      setInputs(sectionData);
    }
  }, [sectionDetails]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Section Header Information
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Section Header</FormLabel>
            <TextField
              placeholder="Enter Header Name"
              id="section_header_name"
              name="section_header_name"
              helperText={errors.section_header_name}
              error={Boolean(errors.section_header_name)}
              value={inputs.section_header_name}
              onChange={handleInputChange}
              fullWidth
            />
          </FormControl>
        </Grid>
      </Grid>
      <ActionContainer>
        <Button
          variant="containedSecondary"
          onClick={() => router.push("/content-library/section-header")}
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
