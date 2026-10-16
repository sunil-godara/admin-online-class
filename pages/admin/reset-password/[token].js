import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Button,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
  FormControl as MuiFormControl
} from "@mui/material";
import {
  Lock,
  ArrowBack,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import Layout from "@/components/account/Layout";
import ThemeProvider from "@/theme/ThemeProvider";
import { resetPassword, verifyResetToken } from "@/utils/api/forgot-password";
import { resetPasswordRules } from "@/utils/constants/rules";
import { Store } from "@/utils/store";
import {
  fieldValidation,
  formValidation
} from "@/utils/validations/validation";
import styled from "@emotion/styled";

export default function ResetPasswordPage() {
  const store = Store();
  const router = useRouter();
  const { token } = router.query;

  const [email, setEmail] = useState("");
  const [verifying, setVerifying] = useState(true);

  const [inputs, setInputs] = useState({
    password: "",
    confirm_password: ""
  });

  const [errors, setErrors] = useState({
    password: "",
    confirm_password: ""
  });

  const [visible, setVisible] = useState({
    password: false,
    confirm_password: false
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const response = await verifyResetToken({ token });

          if (response.status && response.data?.email) {
            setEmail(response.data.email);
          } else {
            store.setSnackbarDetails({
              status: true,
              message: response.message || "Invalid or expired reset link.",
              color: "error",
              vertical: "top",
              horizontal: "right"
            });
            router.push("/admin/forgot-password");
          }
        } catch (err) {
          store.setSnackbarDetails({
            status: true,
            message: "Token verification failed.",
            color: "error",
            vertical: "top",
            horizontal: "right"
          });
          router.push("/admin/forgot-password");
        } finally {
          setVerifying(false);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    setInputs(prev => ({ ...prev, [name]: value }));

    const error = fieldValidation(
      resetPasswordRules[name],
      value,
      inputs.password
    );

    setErrors(prev => ({ ...prev, [name]: error || "" }));
  };

  const toggleVisibility = field => {
    setVisible(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const validationErrors = formValidation(inputs, resetPasswordRules);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0 && email) {
      setLoading(true);
      try {
        const response = await resetPassword({
          email,
          password: inputs.password,
          confirm_password: inputs.confirm_password
        });

        store.setSnackbarDetails({
          status: true,
          message: response.message,
          color: response.status ? "success" : "error",
          vertical: "top",
          horizontal: "right"
        });

        if (response.status) {
          router.push("/admin/login");
        }
      } catch (err) {
        store.setSnackbarDetails({
          status: true,
          message: "Something went wrong. Please try again.",
          color: "error",
          vertical: "top",
          horizontal: "right"
        });
      } finally {
        setLoading(false);
      }
    }
  };

  if (verifying) {
    return (
      <ThemeProvider>
        <Layout>
          <Typography align="center" variant="h6">
            Verifying reset link...
          </Typography>
        </Layout>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Head>
        <title>Dotsquares Wellness - Reset Password</title>
        <meta
          name="description"
          content="Dotsquares Wellness - Reset Password"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <LayoutHeader>
          <Typography variant="h2">
            <strong>Reset Password</strong>
          </Typography>
          <Typography>
            To keep connected with us please Sign In with your personal info.
          </Typography>
        </LayoutHeader>

        <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
          <TextField
            label="Password"
            name="password"
            type={visible.password ? "text" : "password"}
            value={inputs.password}
            data-testid="password-input"
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {visible.password ? (
                    <Visibility
                      onClick={() => toggleVisibility("password")}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <VisibilityOff
                      onClick={() => toggleVisibility("password")}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </InputAdornment>
              )
            }}
            helperText={errors.password}
            required
          />
        </FormControl>

        <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
          <TextField
            label="Confirm Password"
            name="confirm_password"
            type={visible.confirm_password ? "text" : "password"}
            value={inputs.confirm_password}
            data-testid="confirm-password-input"
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {visible.confirm_password ? (
                    <Visibility
                      onClick={() => toggleVisibility("confirm_password")}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <VisibilityOff
                      onClick={() => toggleVisibility("confirm_password")}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </InputAdornment>
              )
            }}
            helperText={errors.confirm_password}
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
    </ThemeProvider>
  );
}

export const getServerSideProps = async context => {
  const { token } = context.query;

  let tokenStatus = null;
  if (token) {
    tokenStatus = await verifyResetToken({ token });
  }

  return {
    props: {
      tokenStatus
    }
  };
};

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
