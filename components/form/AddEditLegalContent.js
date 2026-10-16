import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  MenuItem
} from "@mui/material";
import { addContent, editContent } from "@/utils/api/content-management";
import { contentRules } from "@/utils/constants/rules";
import {
  contentFields,
  publishedStatus
} from "@/utils/constants/content-constant";
import { statusType } from "@/utils/constants/user-constants";
import { Store } from "@/utils/store";
import {
  formValidation,
  fieldValidation
} from "@/utils/validations/validation";

const Editor = dynamic(() => import("../common/TextEditor"), { ssr: false });

export default function AddEditLegalContentForm({ contentDetails }) {
  const store = Store();
  const router = useRouter();

  const [inputs, setInputs] = useState({ ...contentFields });
  const [errors, setErrors] = useState({ ...contentFields });
  const [loading, setLoading] = useState(false);

  const handleInputChange = ({ target }) => {
    setInputs(inputs => ({
      ...inputs,
      [target.name]: target.value
    }));

    let errorMessage = contentRules[target.name]
      ? fieldValidation(contentRules[target.name], target.value)
      : "";

    setErrors({
      ...errors,
      [target.name]: errorMessage ? errorMessage : ""
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const validationErrors = formValidation(inputs, contentRules);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = contentDetails
          ? await editContent(inputs)
          : await addContent(inputs);

        if (response.status === true) {
          store.setSnackbarDetails({
            status: true,
            message: response.message,
            color: "success",
            vertical: "top",
            horizontal: "right"
          });

          router.push({
            pathname: "/admin/content-management/list-content"
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
    if (contentDetails && Object.keys(contentDetails).length) {
      let contentData = { ...contentDetails };

      contentData = {
        ...inputs,
        ...contentData
      };
      setInputs(contentData);
    }
  }, [contentDetails]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Content Information
      </Typography>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        alignItems="center"
      >
        <Grid item xs={12} md={6} lg={4}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Content Title</FormLabel>
            <TextField
              placeholder="Enter Title"
              id="title"
              name="title"
              helperText={errors.title}
              error={Boolean(errors.title)}
              value={inputs.title}
              onChange={handleInputChange}
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Status</FormLabel>
            <TextField
              id="status"
              name="status"
              select
              value={inputs.status}
              onChange={handleInputChange}
              helperText={errors.status}
              error={Boolean(errors.status)}
              SelectProps={{
                placeholder: "Please Select",
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
        <Grid item xs={12} md={6} lg={4}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Is Published</FormLabel>
            <TextField
              id="isPublish"
              name="isPublish"
              select
              value={inputs.isPublish}
              onChange={handleInputChange}
              helperText={errors.isPublish}
              error={Boolean(errors.isPublish)}
              SelectProps={{
                placeholder: "Please Select",
                displayEmpty: true,
                MenuProps: { sx: { maxHeight: 320 } }
              }}
            >
              <MenuItem value={""}>Please Select</MenuItem>
              {publishedStatus.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Content</FormLabel>
            <Editor
              id="content"
              name="content"
              handleInputChange={v => handleInputChange(v)}
              value={inputs.content}
              disabled={false}
            />
            {errors.content && (
              <FormHelperText className="error-message">
                {errors.content}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
      <ActionContainer>
        <Button
          variant="containedSecondary"
          onClick={() => router.push("/admin/content-management/list-content")}
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
