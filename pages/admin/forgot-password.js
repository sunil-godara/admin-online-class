import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styled from "@emotion/styled";
import {
  Button,
  FormControl as MuiFormControl,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress
} from "@mui/material";
import { Email, ArrowBack } from "@mui/icons-material";
import Layout from "@/components/account/Layout";
import ThemeProvider from "@/theme/ThemeProvider";
import { forgotPassword } from "@/utils/api/forgot-password";
import { forgotPasswordRules } from "@/utils/constants/rules";
import { Store } from "@/utils/store";
import {
  fieldValidation,
  formValidation
} from "@/utils/validations/validation";
import ToastNotification from "@/components/common/ToastNotification";

export default function ForgotPassword() {
  const store = Store();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: ""
  });

  const [inputs, setInputs] = useState({
    email: ""
  });

  const [showLink, setShowLink] = useState(false);

  const handleInputChange = ({ target }) => {
    setInputs(inputs => ({
      ...inputs,
      [target.name]: target.value
    }));

    let errorMessage = fieldValidation(
      forgotPasswordRules[target.name],
      target.value
    );

    setErrors({
      ...errors,
      [target.name]: errorMessage ? errorMessage : ""
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const validationErrors = formValidation(inputs, forgotPasswordRules);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = await forgotPassword(inputs);

        if (response.status === true) {
          store.setSnackbarDetails({
            status: true,
            message: response.message,
            color: "success",
            vertical: "top",
            horizontal: "right"
          });

          setShowLink(true);
          setInputs({ email: "" });
        } else {
          store.setSnackbarDetails({
            status: true,
            message: response.message,
            color: "error",
            vertical: "top",
            horizontal: "right"
          });
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

  return (
    <ThemeProvider>
      <Head>
        <title>Dotsquares Wellness - Forgot Password</title>
        <meta
          name="description"
          content="Dotsquares Wellness - Forgot Password"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <LayoutHeader>
          <Typography variant="h2">
            <strong>{showLink ? "Validate Email" : "Forgot Password"}</strong>
          </Typography>
          <Typography>
            Enter your email address below, and we’ll send you a link to reset
            your password. Please check your email and follow the instructions
            to create a new password.
          </Typography>
        </LayoutHeader>
        <FormControl variant="outlined" fullWidth sx={{ mb: 3 }} required>
          <TextField
            label="E-mail address"
            id="outlined-start-adornment"
            fullWidth
            name="email"
            value={inputs.email}
            onChange={handleInputChange}
            sx={{ ".MuiFormHelperText-root": { marginLeft: 0 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
              readOnly: showLink
            }}
            helperText={errors && errors.email}
            required
          />
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress /> : "Submit"}
        </Button>
        <Typography align="center">
          <Button type="text" onClick={() => router.push("/admin/login")}>
            <ArrowBack />
            <u>Back to login</u>
          </Button>
        </Typography>
      </Layout>
      <ToastNotification />
    </ThemeProvider>
  );
}

const LayoutHeader = styled.div`
  ${({ theme }) => `
    text-align: center;
    margin-bottom: ${theme.spacing(5)};

    .MuiTypography-root {
      color: ${theme.colors.palette.offBlack};
    }

    h2 {
      font-size: 44px;
      margin: ${theme.spacing(1, 0)}
    }

    p {
      margin-top: ${theme.spacing(3)}
    }
  `}
`;

const FormControl = styled(MuiFormControl)`
  ${({ theme }) => `
    font-size: 14px;

    .MuiFormLabel-root {
      transform: translate(60px, 10px) scale(0.75);
      color: ${theme.colors.palette.mediumGrey};
    }

    .MuiFormHelperText-root {
      color: ${theme.colors.palette.darkRed};
    }

    .MuiInputBase-root {

      .MuiSvgIcon-root {
        color: ${theme.colors.palette.grayishBlue};
      }

      .MuiInputBase-input {
        padding-top: ${theme.spacing(3)};
        padding-bottom: ${theme.spacing(1)};
        padding-left: calc(${theme.spacing(1)} + 2px);
      }

      legend {
        width: 0;
      }

      &:after, &:before {
        display: none
      }
    }
  `}
`;
