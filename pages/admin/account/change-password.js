import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styled from "@emotion/styled";
import {
  Paper,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography,
  CircularProgress
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";
import Breadcrumb from "@/components/common/Breadcrumb";
import DashboardLayout from "@/components/common/Layout";
import PageTitle from "@/components/common/PageTitle";
import InnerContent from "@/components/presentation/InnerContent";
import ThemeProvider from "@/theme/ThemeProvider";
import { passwordFieldRules } from "@/utils/constants/rules";
import { Store } from "@/utils/store";
import {
  formValidation,
  fieldValidation
} from "@/utils/validations/validation";
import { withAuth } from "@/utils/withAuth";
import { changePassword } from "@/utils/api/common";

export default function Profile() {
  const store = Store();
  const router = useRouter();
  const [inputs, setInputs] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const togglePasswordVisibility = field => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    setInputs(prev => ({
      ...prev,
      [name]: value
    }));

    const error = fieldValidation(passwordFieldRules[name], value, inputs);
    setErrors(prev => ({
      ...prev,
      [name]: error || ""
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const validationErrors = formValidation(inputs, passwordFieldRules);
    if (
      inputs.newPassword &&
      inputs.confirmPassword &&
      inputs.newPassword !== inputs.confirmPassword
    ) {
      validationErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = await changePassword({
          currentPassword: inputs.currentPassword,
          newPassword: inputs.newPassword,
          confirmPassword: inputs.confirmPassword
        });

        if (response.status) {
          store.setSnackbarDetails({
            status: true,
            message: response.message || "Password updated successfully",
            color: "success",
            vertical: "top",
            horizontal: "right"
          });

          setInputs({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
          });
        } else {
          store.setSnackbarDetails({
            status: true,
            message: response.message || "Failed to update password",
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
          message: "Something went wrong. Please try again.",
          color: "error",
          vertical: "top",
          horizontal: "right"
        });
      }
      setLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <Head>
        <title>Dotsquares Wellness - Admin Change Password</title>
        <meta
          name="description"
          content="Dotsquares Wellness - Admin Change Password"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
        <PageTitle title="Change Password" subtitle="">
          <Breadcrumb />
        </PageTitle>
        <InnerContent>
          <Paper elevation={0}>
            <Heading sx={{ p: 4 }}>
              <Typography variant="h2">Change Password</Typography>
            </Heading>
            <Wrapper>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12} md={4} lg={4}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    required
                  >
                    <FormLabel>Current Password</FormLabel>
                    <TextField
                      type={showPassword.current ? "text" : "password"}
                      name="currentPassword"
                      placeholder="Enter current password"
                      value={inputs.currentPassword}
                      onChange={handleInputChange}
                      helperText={errors.currentPassword}
                      error={!!errors.currentPassword}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                togglePasswordVisibility("current")
                              }
                              edge="end"
                            >
                              {showPassword.current ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    required
                  >
                    <FormLabel>New Password</FormLabel>
                    <TextField
                      type={showPassword.new ? "text" : "password"}
                      name="newPassword"
                      placeholder="Enter new password"
                      value={inputs.newPassword}
                      onChange={handleInputChange}
                      helperText={errors.newPassword}
                      error={!!errors.newPassword}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => togglePasswordVisibility("new")}
                              edge="end"
                            >
                              {showPassword.new ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    required
                  >
                    <FormLabel>Confirm Password</FormLabel>
                    <TextField
                      type={showPassword.confirm ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Re-enter new password"
                      value={inputs.confirmPassword}
                      onChange={handleInputChange}
                      helperText={errors.confirmPassword}
                      error={!!errors.confirmPassword}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                togglePasswordVisibility("confirm")
                              }
                              edge="end"
                            >
                              {showPassword.confirm ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />
              <ActionContainer>
                <Button
                  variant="containedSecondary"
                  onClick={() => router.back()}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? <CircularProgress /> : "Save"}
                </Button>
              </ActionContainer>
            </Wrapper>
          </Paper>
        </InnerContent>
      </DashboardLayout>
    </ThemeProvider>
  );
}

// export const getServerSideProps = withAuth(async context => {
//   const session = await getSession(context);
//   const { user } = session;

//   return {
//     props: {
//       userDetails: user
//     }
//   };
// });

export const getServerSideProps = withAuth(async context => {
  return {
    props: {
      previousPath: context.req.headers.referer || ""
    }
  };
});

const Heading = styled.div`
  ${({ theme }) => `
    padding: ${theme.spacing(3, 4)};
    border-bottom: 1px solid ${theme.colors.palette.lightGrey};

    h2 {
      font-size: 20px;

      @media (min-width: ${theme.breakpoints.values.md}px) {
        font-size: 24px;
      }
    }
  `}
`;

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
