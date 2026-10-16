import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormLabel,
  FormHelperText,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { PriorityHigh } from "@mui/icons-material";
import { addTemplates, editTemplates } from "@/utils/api/email-templates";
import { emailTemplateFields } from "@/utils/constants/email-constants";
import { emailTemplateRules } from "@/utils/constants/rules";
import { Store } from "@/utils/store";
import {
  formValidation,
  fieldValidation
} from "@/utils/validations/validation";

const Editor = dynamic(() => import("../common/TextEditor"), { ssr: false });

export default function EmailTemplateForm({ templateDetails }) {
  const store = Store();
  const router = useRouter();
  const [inputs, setInputs] = useState(emailTemplateFields);
  const [errors, setErrors] = useState(emailTemplateFields);
  const [loading, setLoading] = useState(false);

  const handleInputChange = ({ target }) => {
    setInputs(inputs => ({
      ...inputs,
      [target.name]: target.value
    }));

    let errorMessage = emailTemplateRules[target.name]
      ? fieldValidation(emailTemplateRules[target.name], target.value)
      : "";

    setErrors({
      ...errors,
      [target.name]: errorMessage ? errorMessage : ""
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const validationErrors = formValidation(inputs, emailTemplateRules);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = templateDetails
          ? await editTemplates(inputs)
          : await addTemplates(inputs);

        if (response.status === true) {
          store.setSnackbarDetails({
            status: true,
            message: response.message,
            color: "success",
            vertical: "top",
            horizontal: "right"
          });

          router.push({
            pathname: "/email-template-management/email-templates"
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
    if (templateDetails && Object.keys(templateDetails).length) {
      let refundData = { ...templateDetails };

      refundData = {
        ...inputs,
        ...refundData,
        template_id: templateDetails.id
      };
      setInputs(refundData);
    }
  }, [templateDetails]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
        <Grid item xs={12} md={7} lg={7}>
          <Typography variant="h3" sx={{ mb: 1 }}>
            Email Template Information
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} md={6} lg={6}>
              <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
                <FormLabel>Title</FormLabel>
                <TextField
                  placeholder="Enter Title"
                  id="title"
                  name="title"
                  helperText={errors.title}
                  value={inputs.title}
                  onChange={handleInputChange}
                  fullWidth
                  error={Boolean(errors.title)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
                <FormLabel>Subject</FormLabel>
                <TextField
                  placeholder="Enter Subject"
                  id="subject"
                  name="subject"
                  helperText={errors.subject}
                  value={inputs.subject}
                  onChange={handleInputChange}
                  fullWidth
                  error={Boolean(errors.subject)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
                <FormLabel>From</FormLabel>
                <TextField
                  placeholder="Enter From Email"
                  id="from_email"
                  name="from_email"
                  helperText={errors.from_email}
                  value={inputs.from_email}
                  onChange={handleInputChange}
                  fullWidth
                  error={Boolean(errors.from_email)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
                <FormLabel>Reply To Email</FormLabel>
                <TextField
                  placeholder="Enter Reply To Email"
                  id="reply_email"
                  name="reply_email"
                  helperText={errors.reply_email}
                  value={inputs.reply_email}
                  onChange={handleInputChange}
                  fullWidth
                  error={Boolean(errors.reply_email)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                <FormLabel>Other Email</FormLabel>
                <TextField
                  placeholder="Enter Other Email"
                  id="other_email"
                  name="other_email"
                  helperText={
                    errors.other_email
                      ? errors.other_email
                      : "Please enter comma separated values to add multiple emails."
                  }
                  value={inputs.other_email}
                  onChange={handleInputChange}
                  fullWidth
                  error={Boolean(errors.other_email)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={13}>
              <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
                <FormLabel>Description</FormLabel>
                <Editor
                  id="description"
                  name="description"
                  handleInputChange={v => handleInputChange(v)}
                  value={inputs.description}
                  disabled={false}
                />
                {errors.description && (
                  <FormHelperText className="error-message">
                    {errors.description}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={5} lg={5}>
          <RuleContainer>
            <Typography variant="h3" sx={{ mb: 1 }}>
              <PriorityHigh /> Important Rules
            </Typography>
            <Divider sx={{ my: 0 }} />
            <ContentContainer>
              <Typography variant="p" sx={{ mb: 1 }}>
                For each email hook that would be added to the system, make sure
                to follow these rules:
              </Typography>
              <ul>
                <li>
                  Use <span>##SYSTEM_APPLICATION_NAME##</span> on the subject or
                  message to print application name defined by site settings.
                </li>
                <li>
                  Use <span>##ADMIN_EMAIL##</span> on the subject or message to
                  print user email.
                </li>
                <li>
                  Use <span>##FROM_EMAIL##</span> on the subject or message to
                  print user name.
                </li>
              </ul>
            </ContentContainer>
          </RuleContainer>
        </Grid>
      </Grid>
      <ActionContainer>
        <Button
          variant="containedSecondary"
          onClick={() =>
            router.push("/email-template-management/email-templates")
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

  .error-message {
    color: ${theme.colors.palette.darkRed};
  }

  .MuiFormLabel-root {
    color: ${theme.colors.palette.darkGrey};
    margin-bottom: ${theme.spacing(1)};
    display: block;
    font-size: 14px;
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

const RuleContainer = styled.div`
  ${({ theme }) => `
    background: #FFFFFF;
    box-shadow: -6px 6px 25px #d1cece;

    .MuiTypography-h3 {
      display: flex;
      align-items: center;
      background-color: #ff6242;
      margin-bottom: 0;
      padding: ${theme.spacing(1)};
    }
`}
`;

const ContentContainer = styled.div`
  ${({ theme }) => `
    padding: ${theme.spacing(2)};

    .MuiTypography-p {
      font-size: 16px;
    }

    ul li {
      font-size: 14px;
      padding-bottom: 8px;
    }

    ul li span {
      background-color: #ffc107;
      padding: 3px;
      color: #00419d;
    }
`}
`;
