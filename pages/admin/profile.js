import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
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
import Breadcrumb from "@/components/common/Breadcrumb";
import DashboardLayout from "@/components/common/Layout";
import PageTitle from "@/components/common/PageTitle";
import InnerContent from "@/components/presentation/InnerContent";
import ThemeProvider from "@/theme/ThemeProvider";
import { profileFieldRules } from "@/utils/constants/rules";
import { Store } from "@/utils/store";
import {
  formValidation,
  fieldValidation
} from "@/utils/validations/validation";
import { withAuth } from "@/utils/withAuth";
import { updateProfile } from "@/utils/api/common";

export default function Profile({ userDetails }) {
  const store = Store();
  const router = useRouter();
  const { data: session, update } = useSession();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    preferred_location: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    setInputs(prev => ({
      ...prev,
      [name]: value
    }));

    const error = fieldValidation(profileFieldRules[name], value);
    setErrors(prev => ({
      ...prev,
      [name]: error || ""
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const validationErrors = formValidation(inputs, profileFieldRules);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        // Implement update profile API call here
        const response = await updateProfile(inputs);

        if (response.status) {
          const newSession = {
            ...session,
            user: {
              ...session?.user,
              ...response.data
            }
          };

          await update(newSession);

          store.setSnackbarDetails({
            status: true,
            message: response.message,
            color: "success",
            vertical: "top",
            horizontal: "right"
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
    if (userDetails && Object.keys(userDetails).length) {
      let userData = { ...userDetails };

      userData = {
        ...userData,
        user_id: userDetails.id
      };
      setInputs(userData);
    }
  }, [userDetails]);

  return (
    <ThemeProvider>
      <Head>
        <title>Dotsquares Wellness - Admin Profile</title>
        <meta
          name="description"
          content="Dotsquares Wellness - Admin Profile"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
        <PageTitle title="Profile" subtitle="">
          <Breadcrumb />
        </PageTitle>
        <InnerContent>
          <Paper elevation={0}>
            <Heading sx={{ p: 4 }}>
              <Typography variant="h2">Update Profile</Typography>
            </Heading>
            <Wrapper>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12} md={6} lg={4}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    required
                  >
                    <FormLabel>Name</FormLabel>
                    <TextField
                      placeholder="Enter Name"
                      name="name"
                      value={inputs.name}
                      onChange={handleInputChange}
                      helperText={errors.name}
                      fullWidth
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    required
                  >
                    <FormLabel>Email</FormLabel>
                    <TextField
                      placeholder="Enter Email"
                      name="email"
                      value={inputs.email}
                      helperText={errors.email}
                      fullWidth
                      disabled
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    required
                  >
                    <FormLabel>Phone Number</FormLabel>
                    <TextField
                      placeholder="Enter Phone"
                      name="phone"
                      value={inputs.phone}
                      helperText={errors.phone}
                      fullWidth
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    required={false}
                  >
                    <FormLabel>Preferred Location</FormLabel>
                    <TextField
                      placeholder="Enter Preferred Location"
                      name="preferred_location"
                      value={inputs.preferred_location}
                      onChange={handleInputChange}
                      helperText={errors.preferred_location}
                      fullWidth
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

export const getServerSideProps = withAuth(async context => {
  const session = await getSession(context);
  const { user } = session;

  return {
    props: {
      userDetails: user
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
