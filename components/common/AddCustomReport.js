import { useState } from "react";
import styled from "@emotion/styled";
import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  MenuItem
} from "@mui/material";
import {
  addStandardReport,
  editStandardReport
} from "@/utils/api/standard-report";
import { standardReportRules } from "@/utils/constants/rules";
import { standardReportFields } from "@/utils/constants/report-constant";
import {
  reportAreaType,
  reportSchemeType,
  statusType
} from "@/utils/constants/common-constants";
import { Store } from "@/utils/store";
import {
  formValidation,
  fieldValidation
} from "@/utils/validations/validation";

export default function AddCustomReport({
  reportDetails,
  setOpen,
  userId,
  columnVisibility,
  reportData
}) {
  const store = Store();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({ ...standardReportFields });
  const [errors, setErrors] = useState({ ...standardReportFields });

  const handleInputChange = async ({ target }) => {
    setInputs(inputs => ({
      ...inputs,
      [target.name]: target.value
    }));

    let errorMessage = standardReportRules[target.name]
      ? fieldValidation(standardReportRules[target.name], target.value)
      : "";

    setErrors({
      ...errors,
      [target.name]: errorMessage ? errorMessage : ""
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const validationErrors = formValidation(inputs, standardReportRules);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // setLoading(true);
      try {
        const uncheckedAttributes = [];

        for (const key in columnVisibility) {
          uncheckedAttributes.push(key.replace("column_", ""));
        }

        const checkedAttributes = reportData
          .filter(item => !uncheckedAttributes.includes(item.input_title))
          .map(item => item.id);

        const allInputs = {
          ...inputs,
          selectedAttributes: checkedAttributes,
          report_type: "custom",
          user_id: [userId]
        };

        const response = reportDetails
          ? await editStandardReport(allInputs)
          : await addStandardReport(allInputs);

        if (response.status === true) {
          store.setSnackbarDetails({
            status: true,
            message: response.message,
            color: "success",
            vertical: "top",
            horizontal: "right"
          });

          setOpen(false);
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

  const handleReset = async () => {
    setErrors("");
    setOpen(false);
  };

  return (
    <Wrapper>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        alignItems="start"
      >
        <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Report Name</FormLabel>
            <TextField
              placeholder="Enter Name"
              id="report_name"
              name="report_name"
              helperText={errors.report_name}
              error={Boolean(errors.report_name)}
              value={inputs.report_name}
              onChange={handleInputChange}
              fullWidth
              sx={{ ".MuiFormHelperText-root": { marginLeft: 0 } }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Report Area</FormLabel>
            <TextField
              id="report_area"
              name="report_area"
              select
              value={inputs.report_area}
              onChange={handleInputChange}
              helperText={errors.report_area}
              error={Boolean(errors.report_area)}
              sx={{ ".MuiFormHelperText-root": { marginLeft: 0 } }}
              SelectProps={{
                placeholder: "Please Select",
                displayEmpty: true,
                MenuProps: { sx: { maxHeight: 320 } }
              }}
            >
              <MenuItem value={""}>Please Select</MenuItem>
              {reportAreaType.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
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
              sx={{ ".MuiFormHelperText-root": { marginLeft: 0 } }}
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
        <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Scheme Type</FormLabel>
            <TextField
              id="scheme_type"
              name="scheme_type"
              select
              value={inputs.scheme_type}
              onChange={handleInputChange}
              helperText={errors.scheme_type}
              error={Boolean(errors.scheme_type)}
              sx={{ ".MuiFormHelperText-root": { marginLeft: 0 } }}
              SelectProps={{
                placeholder: "Please Select",
                displayEmpty: true,
                MenuProps: { sx: { maxHeight: 320 } }
              }}
            >
              <MenuItem value={""}>Please Select</MenuItem>
              {reportSchemeType.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Purpose</FormLabel>
            <TextField
              placeholder="Enter Purpose"
              id="purpose"
              name="purpose"
              helperText={errors.purpose}
              error={Boolean(errors.purpose)}
              value={inputs.purpose}
              onChange={handleInputChange}
              fullWidth
              sx={{ ".MuiFormHelperText-root": { marginLeft: 0 } }}
              multiline
              rows={3}
            />
          </FormControl>
        </Grid>
      </Grid>
      <ActionContainer>
        <Button variant="containedSecondary" onClick={handleReset}>
          Cancel
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
  padding: ${theme.spacing(0)};

  .MuiFormLabel-root {
    color: ${theme.colors.palette.darkGrey};
    margin-bottom: ${theme.spacing(1)};
    display: block;
    font-size: 14px;
  }

  .info-row {
    margin-bottom: ${theme.spacing(2)};
    border-bottom: 5px solid #eaeaea;
    padding-bottom: ${theme.spacing(1)};

    .MuiTypography-root {
      margin-left: ${theme.spacing(1)};
    }
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
