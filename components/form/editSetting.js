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
import { editSetting } from "@/utils/api/setting";
import { siteSettingFields } from "@/utils/constants/common-constants";
import { Store } from "@/utils/store";
import {
  formValidation,
  fieldValidation
} from "@/utils/validations/validation";

export default function SiteSettingForm({ settingDetails }) {
  const store = Store();
  const router = useRouter();

  const [inputs, setInputs] = useState(siteSettingFields);
  const [errors, setErrors] = useState(siteSettingFields);
  const [settingRules, setSettingRules] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    setInputs(prev => ({ ...prev, [name]: value }));

    const errorMessage = settingRules[name]
      ? fieldValidation(settingRules[name], value)
      : "";

    setErrors(prev => ({ ...prev, [name]: errorMessage }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const validationErrors = formValidation(inputs, settingRules);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const payload = {
          id: inputs.id,
          title: inputs.title,
          configValue: inputs.config_value,
          field_type: inputs.field_type
        };

        const response = await editSetting(payload);
        store.setSnackbarDetails({
          status: true,
          message: response.message,
          color: response.status ? "success" : "error",
          vertical: "top",
          horizontal: "right"
        });

        if (response.status) {
          router.push("/admin/site-setting/settings");
        } else if (response.data) {
          setErrors(response.data);
        }
      } catch (error) {
        store.setSnackbarDetails({
          status: true,
          message: "Something went wrong, Please try again.",
          color: "error",
          vertical: "top",
          horizontal: "right"
        });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (settingDetails?.data && Object.keys(settingDetails.data).length) {
      const data = settingDetails.data;

      const rules = {
        title: [
          {
            name: "required",
            message: "Please enter a title."
          }
        ],
        config_value: [
          {
            name: "required",
            message: "Please enter a value."
          }
        ]
      };

      switch (data.field_type) {
        case "string":
          rules.config_value.push(
            {
              name: "minLength",
              message: "Field should contain at least 2 characters.",
              value: 2
            },
            {
              name: "maxLength",
              message: "Field should contain no more than 250 characters.",
              value: 250
            }
          );
          break;

        case "email":
          rules.config_value.push({
            name: "email",
            message: "Please provide a valid email.",
            strictMode: true,
            pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"
          });
          break;

        case "numeric":
          rules.config_value.push({
            name: "minValue",
            message: "Please provide a valid number.",
            value: 0
          });
          break;
      }

      setSettingRules(rules);
      setInputs(prev => ({
        ...prev,
        slug: data.slug || "",
        title: data.title || "",
        config_value: data.configValue || "",
        field_type: data.field_type || "",
        id: data.id
      }));
    }
  }, [settingDetails]);

  const renderFieldByType = () => {
    const props = {
      placeholder: "Enter Setting Value",
      id: "config_value",
      name: "config_value",
      helperText: errors.config_value,
      value: inputs.config_value,
      onChange: handleInputChange,
      fullWidth: true,
      error: Boolean(errors.config_value)
    };

    const type = settingDetails.field_type === "numeric" ? "number" : "text";

    return <TextField {...props} type={type} />;
  };

  return (
    <Wrapper>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Edit Site Setting
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={6} lg={4}>
          <FormControl fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Slug</FormLabel>
            <TextField
              id="slug"
              name="slug"
              value={inputs.slug}
              fullWidth
              inputProps={{ readOnly: true }}
              helperText={errors.slug}
              error={Boolean(errors.slug)}
              disabled
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <FormControl fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Title</FormLabel>
            <TextField
              id="title"
              name="title"
              value={inputs.title}
              placeholder="Enter Title"
              onChange={handleInputChange}
              fullWidth
              helperText={errors.title}
              error={Boolean(errors.title)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <FormControl fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Setting Value</FormLabel>
            {renderFieldByType()}
          </FormControl>
        </Grid>
      </Grid>
      <ActionContainer>
        <Button
          variant="containedSecondary"
          onClick={() => router.push("/admin/site-setting/settings")}
        >
          Back
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Save"}
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
