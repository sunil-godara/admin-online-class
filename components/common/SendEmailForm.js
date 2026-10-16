import { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  FormHelperText,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { sendQuoteEmail } from "@/utils/api/quote-statement";
import { quoteEmailRules } from "@/utils/constants/rules";
import { emailFields } from "@/utils/constants/quote-constants";
import { Store } from "@/utils/store";
import {
  formValidation,
  fieldValidation
} from "@/utils/validations/validation";

const Editor = dynamic(() => import("../common/TextEditor"), { ssr: false });

export default function SendEmailForm({
  quoteId,
  setOpen,
  label,
  quoteNumber,
  customerEmail,
  type
  //   handleInvoiceAdded
}) {
  const store = Store();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    ...emailFields,
    to_email: customerEmail || ""
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = ({ target }) => {
    setInputs(inputs => ({
      ...inputs,
      [target.name]: target.value
    }));

    let errorMessage = quoteEmailRules[target.name]
      ? fieldValidation(quoteEmailRules[target.name], target.value)
      : "";

    setErrors({
      ...errors,
      [target.name]: errorMessage ? errorMessage : ""
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const validationErrors = formValidation(inputs, quoteEmailRules);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        let body = {
          ...inputs,
          id: quoteId,
          type: type
        };

        const response = await sendQuoteEmail(body);

        if (response.status === true) {
          store.setSnackbarDetails({
            status: true,
            message: response.message,
            color: "success",
            vertical: "top",
            horizontal: "right"
          });
          //   handleInvoiceAdded();
          if (response.data && response.data.type === "quote") {
            router.push({
              pathname: "/quotes-creation/list-quote"
            });
          } else if (response.data && response.data.type === "credit_note") {
            router.push({
              pathname: "/credit-notes/list-credit-note"
            });
          } else if (
            response.data &&
            response.data.type === "remittance_note"
          ) {
            router.push({
              pathname: "/remittance-notes/list-remittance-note"
            });
          } else if (response.data && response.data.type === "statement") {
            router.push({
              pathname: "/statement/list-statement"
            });
          }
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
    setOpen(false);
  };

  return (
    <Wrapper>
      <>
        <Grid container className="info-row">
          <Grid item xs={6} display="flex">
            <strong>{label} :</strong>
            <Typography>{quoteNumber}</Typography>
          </Grid>
        </Grid>
      </>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>To Email</FormLabel>
            <TextField
              placeholder="Enter to email"
              id="to_email"
              name="to_email"
              helperText={errors.to_email}
              error={Boolean(errors.to_email)}
              value={inputs.to_email}
              onChange={handleInputChange}
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>From Email</FormLabel>
            <TextField
              placeholder="Enter from email"
              id="from_email"
              name="from_email"
              helperText={errors.from_email}
              error={Boolean(errors.from_email)}
              value={inputs.from_email}
              onChange={handleInputChange}
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Email Body</FormLabel>
            <Editor
              id="email_content"
              name="email_content"
              handleInputChange={v => handleInputChange(v)}
              value={inputs.email_content}
              disabled={false}
            />
            {errors.email_content && (
              <FormHelperText className="error-message">
                {errors.email_content}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
      <ActionContainer>
        <Button variant="containedSecondary" onClick={handleReset}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress /> : "Save & Send"}
        </Button>
      </ActionContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => `
  padding: ${theme.spacing(0)};

  .error-message {
    color: ${theme.colors.palette.darkRed};
  }

  .MuiFormLabel-root {
    color: ${theme.colors.palette.darkGrey};
    margin-bottom: ${theme.spacing(1)};
    display: block;
    font-size: 14px;
  }

  .MuiSelect-select {
    height: 30px;
    padding: 8px;
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
