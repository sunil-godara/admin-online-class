import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  TextField
} from "@mui/material";
import { cancelPurchaseOrder } from "@/utils/api/po-creation";
import { poCancelRules } from "@/utils/constants/rules";
import { poCancelFields, cancelNewPoSend } from "@/utils/constants/po-creation";
import { Store } from "@/utils/store";
import {
  formValidation,
  fieldValidation
} from "@/utils/validations/validation";
import { withAuth } from "@/utils/withAuth";

export default function CancelPo({
  PurchaseOrderId,
  setOpen,
  // setOrderId,
  handleInvoiceAdded
}) {
  const store = Store();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({ ...poCancelFields });
  const [errors, setErrors] = useState({});

  const handleInputChange = ({ target }) => {
    setInputs(inputs => ({
      ...inputs,
      [target.name]: target.value
    }));

    let errorMessage = poCancelRules[target.name]
      ? fieldValidation(poCancelRules[target.name], target.value)
      : "";

    setErrors({
      ...errors,
      [target.name]: errorMessage ? errorMessage : ""
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const validationErrors = formValidation(inputs, poCancelRules);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        let body = {
          ...inputs,
          id: PurchaseOrderId
        };

        const response = await cancelPurchaseOrder(body);

        if (response.status === true) {
          store.setSnackbarDetails({
            status: true,
            message: response.message,
            color: "success",
            vertical: "top",
            horizontal: "right"
          });
          setOpen(false);
          handleInvoiceAdded();
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
    return () => {
      setErrors({});
      // setOrderId("");
      setInputs({ ...poCancelFields });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleReset = async () => {
    setOpen(false);
  };

  return (
    <Wrapper>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={12} lg={12}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Cancelation Reason</FormLabel>
            <TextField
              placeholder="Enter Reason for PO Cancelation"
              id="reason_for_cancelation"
              name="reason_for_cancelation"
              value={inputs.reason_for_cancelation}
              onChange={handleInputChange}
              helperText={errors.reason_for_cancelation}
              error={Boolean(errors.reason_for_cancelation)}
              multiline
              rows={4}
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Cancel New PO To Be Send</FormLabel>
            <TextField
              id="cancel_new_po_send"
              name="cancel_new_po_send"
              select
              value={inputs.cancel_new_po_send}
              onChange={handleInputChange}
              helperText={errors.cancel_new_po_send}
              error={Boolean(errors.cancel_new_po_send)}
              SelectProps={{
                placeholder: "Please Select",
                displayEmpty: true,
                MenuProps: { sx: { maxHeight: 320 } }
              }}
            >
              <MenuItem value={""}>Please Select</MenuItem>
              {cancelNewPoSend.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
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
