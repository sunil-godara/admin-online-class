import { useState } from "react";
import styled from "@emotion/styled";
import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  TextField
} from "@mui/material";
import { cancelRefund } from "@/utils/api/refund-management";
import { refundCancelRules } from "@/utils/constants/rules";
import {
  refundCancelFields,
  refundAdditionalDetailsFields
} from "@/utils/constants/refund-constants";
import { Store } from "@/utils/store";
import {
  formValidation,
  fieldValidation
} from "@/utils/validations/validation";
import { withAuth } from "@/utils/withAuth";

export default function CancelRefund({
  RefundId,
  setOpen,
  selectedComponent
  // setOrderId,
}) {
  const store = Store();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState(
    selectedComponent === "Cancel Refund"
      ? { ...refundCancelFields }
      : { ...refundAdditionalDetailsFields }
  );

  const [errors, setErrors] = useState({});

  const handleInputChange = ({ target }) => {
    setInputs(inputs => ({
      ...inputs,
      [target.name]: target.value
    }));

    let errorMessage = refundCancelRules[target.name]
      ? fieldValidation(refundCancelRules[target.name], target.value)
      : "";

    setErrors({
      ...errors,
      [target.name]: errorMessage ? errorMessage : ""
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const validationErrors = formValidation(inputs, refundCancelRules);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        let body = {
          ...inputs,
          id: RefundId
        };

        const response = await cancelRefund(body);

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
    setOpen(false);
  };

  return (
    <Wrapper>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={12} lg={12}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>
              {selectedComponent === "Cancel Refund"
                ? "Cancelation Reason"
                : "Additional Requirement Note"}
            </FormLabel>
            <TextField
              placeholder={
                selectedComponent === "Cancel Refund"
                  ? "Enter Reason for Refund Cancelation"
                  : "Enter Note for Additional Request"
              }
              id="note"
              name="note"
              value={inputs.note}
              onChange={handleInputChange}
              helperText={errors.note}
              error={Boolean(errors.note)}
              multiline
              rows={4}
              fullWidth
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

export const getServerSideProps = withAuth(async () => {
  //   const session = await getSession(context);
  //   const { user } = session;

  return {
    props: {}
  };
});

const Wrapper = styled.div`
  ${({ theme }) => `
  padding: ${theme.spacing(0)};

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
