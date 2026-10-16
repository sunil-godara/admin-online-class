import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn, getSession } from "next-auth/react";
import styled from "@emotion/styled";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl as MuiFormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import {
  CheckBoxOutlineBlank,
  CheckBoxOutlined,
  Email,
  Lock,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import Layout from "@/components/account/Layout";
import ToastNotification from "@/components/common/ToastNotification";
import ThemeProvider from "@/theme/ThemeProvider";
import { loginRules } from "@/utils/constants/rules";
import { isSessionValid } from "@/utils/helpers";
import { Store } from "@/utils/store";
import {
  fieldValidation,
  formValidation
} from "@/utils/validations/validation";

export default function Login({ isSessionExpired }) {
  const store = Store();
  const router = useRouter();

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = ({ target }) => {
    setInputs(inputs => ({
      ...inputs,
      [target.name]: target.value
    }));

    let errorMessage = fieldValidation(loginRules[target.name], target.value);

    setErrors({
      ...errors,
      [target.name]: errorMessage ? errorMessage : ""
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    let inputForValidation = {
      email: inputs.email,
      password: inputs.password
    };

    const validationErrors = formValidation(inputForValidation, loginRules);
    const noErrors = Object.keys(validationErrors).length === 0;

    if (noErrors) {
      setLoading(true);

      const response = await signIn("credentials", {
        redirect: false,
        email: inputs.email,
        password: inputs.password,
        remember_me: rememberMe
      });

      if (response.ok === false) {
        store.setSnackbarDetails({
          status: true,
          message: response.error,
          color: "error",
          vertical: "top",
          horizontal: "center"
        });
        // setLoading(false);
      } else {
        router.push("/admin/dashboard");
      }

      setLoading(false);
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    if (isSessionExpired && isSessionExpired === "expired") {
      store.setSnackbarDetails({
        status: true,
        message:
          "You have been logged out from the system, please login again.",
        color: "error",
        vertical: "top",
        horizontal: "center"
      });
    }
  }, [isSessionExpired]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ThemeProvider>
      <Head>
        <title>Dotsquares Wellness - Login</title>
        <meta name="description" content="Dotsquares Wellness - Login" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <LayoutHeader>
          <Typography variant="h2" component="h6">
            Welcome
          </Typography>
          <Typography variant="h2">
            <strong>Sign In</strong>
          </Typography>
          <Typography variant="h2" component="h6">
            to your account
          </Typography>
          <Typography>
            To keep connected with us please Sign In with your personal info.
          </Typography>
        </LayoutHeader>
        <FormControl variant="outlined" fullWidth sx={{ mb: 3 }} required>
          <TextField
            label="E-mail address"
            id="email"
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleInputChange}
            fullWidth
            sx={{ ".MuiFormHelperText-root": { marginLeft: 0 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              )
            }}
            helperText={errors && errors.email}
            required
          />
        </FormControl>
        <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
          <TextField
            label="Password"
            id="password"
            fullWidth
            type={visible ? "text" : "password"}
            name="password"
            value={inputs.password}
            onChange={handleInputChange}
            sx={{ ".MuiFormHelperText-root": { marginLeft: 0 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  {visible ? (
                    <Visibility
                      onClick={() => setVisible(!visible)}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <VisibilityOff
                      onClick={() => setVisible(!visible)}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </>
              )
            }}
            helperText={errors && errors.password}
            required
          />
        </FormControl>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                color="success"
                icon={<CheckBoxOutlineBlank />}
                checkedIcon={<CheckBoxOutlined />}
                onChange={() => setRememberMe(!rememberMe)}
              />
            }
            sx={{ mb: 2 }}
            label={<Typography variant="h6">Keep me logged in</Typography>}
          />
        </FormGroup>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress /> : "Sign In"}
        </Button>
        <Typography align="center">
          <Button
            type="text"
            onClick={() => router.push("/admin/forgot-password")}
          >
            <u>Forgot password?</u>
          </Button>
        </Typography>
      </Layout>
      <ToastNotification />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const { isSessionExpired } = context.query;

  if (
    typeof isSessionExpired === "undefined" ||
    isSessionExpired !== "expired"
  ) {
    const session = await getSession(context);

    if (isSessionValid(session)) {
      return {
        redirect: {
          permanent: false,
          destination: "/admin/dashboard"
        }
      };
    }
  }

  return { props: { isSessionExpired: isSessionExpired || false } };
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
