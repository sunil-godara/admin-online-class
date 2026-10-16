import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  Button,
  Backdrop,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import FileUpload from "./FileUpload";
import CommonDatePicker from "./CommonDatePicker";
import {
  addPurchaseOrderInvoice,
  getPurchaseOrderAmount
} from "@/utils/api/po-creation";
import { poInvoiceRules } from "@/utils/constants/rules";
import { poInvoiceFields } from "@/utils/constants/po-creation";
import { Store } from "@/utils/store";
import {
  formValidation,
  fieldValidation
} from "@/utils/validations/validation";

export default function AddPoInvoice({
  PurchaseOrderId,
  setOpen,
  // setOrderId,
  handleInvoiceAdded
}) {
  const store = Store();
  const [loading, setLoading] = useState(false);
  const [modelloading, setModelLoading] = useState(false);
  const [inputs, setInputs] = useState({ ...poInvoiceFields });
  const [file, setFiles] = useState(null);
  const [errors, setErrors] = useState({});
  const [poAmount, setPoAmount] = useState({});

  const handleInputChange = ({ target }) => {
    setInputs(inputs => ({
      ...inputs,
      [target.name]: target.value
    }));

    let errorMessage = poInvoiceRules[target.name]
      ? fieldValidation(poInvoiceRules[target.name], target.value)
      : "";

    setErrors({
      ...errors,
      [target.name]: errorMessage ? errorMessage : ""
    });
  };

  const handleFileChange = ({ target }) => {
    const files = target.files;

    for (const file of files) {
      const sizeInMB = parseInt(file.size) / (1024 * 1024);

      // let currentFileErrors = errors[target.name];

      if (sizeInMB > 10) {
        setErrors(errors => ({
          ...errors,
          [file.name]: "File size must not be more than 5mb"
        }));

        return;
      } else {
        setErrors(errors => ({
          ...errors,
          [file.name]: ""
        }));
      }

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        setFiles({
          file: reader.result,
          filename: file.name
        });
      };
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const validationErrors = formValidation(inputs, poInvoiceRules);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        let filesArray = [];

        if (file) {
          filesArray.push(file);
        }

        let body = {
          ...inputs,
          id: PurchaseOrderId,
          files: filesArray
        };

        const response = await addPurchaseOrderInvoice(body);

        if (response.status === true) {
          store.setSnackbarDetails({
            status: true,
            message: response.message,
            color: "success",
            vertical: "top",
            horizontal: "right"
          });
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

  const handleReset = async () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      setModelLoading(true);
      const response = await getPurchaseOrderAmount({
        purchase_order_id: PurchaseOrderId
      });

      if (response && response.status) {
        const paymentData = response.data[0];

        setPoAmount(paymentData);
      }
      setModelLoading(false);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper>
      {modelloading ? (
        <Backdrop open={modelloading} style={{ zIndex: 1000, color: "#fff" }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <Grid container className="info-row">
            <Grid item xs={4} display="flex">
              <strong>PO Amount :</strong>
              <Typography>
                {poAmount.total?.toLocaleString("en-GB", {
                  style: "currency",
                  currency: "GBP",
                  currencyDisplay: "symbol",
                  maximumFractionDigits: 2
                })}
              </Typography>
            </Grid>
            <Grid item xs={4} display="flex">
              <strong>Invoice Amount :</strong>
              <Typography>
                {poAmount.purchase_order_paid?.toLocaleString("en-GB", {
                  style: "currency",
                  currency: "GBP",
                  currencyDisplay: "symbol",
                  maximumFractionDigits: 2
                })}
              </Typography>
            </Grid>
            <Grid item xs={4} display="flex">
              <strong>Invoice Outstanding Amount :</strong>
              <Typography>
                {poAmount.purchase_order_outstanding?.toLocaleString("en-GB", {
                  style: "currency",
                  currency: "GBP",
                  currencyDisplay: "symbol",
                  maximumFractionDigits: 2
                })}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={4} lg={4}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Invoice Number</FormLabel>
            <TextField
              placeholder="Enter Invoice Number"
              id="invoice_number"
              name="invoice_number"
              helperText={errors.invoice_number}
              error={Boolean(errors.invoice_number)}
              value={inputs.invoice_number}
              onChange={handleInputChange}
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Invoice Amount</FormLabel>
            <TextField
              placeholder="Enter Invoice Amount"
              id="invoice_value"
              name="invoice_value"
              helperText={errors.invoice_value}
              error={Boolean(errors.invoice_value)}
              value={inputs.invoice_value}
              onChange={handleInputChange}
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <FormControl
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            // error={Boolean(errors.invoice_date)}
            required
          >
            <FormLabel>Invoice Date</FormLabel>
            <CommonDatePicker
              value={inputs.invoice_date}
              dateFormat="dd/MM/yyyy"
              name="invoice_date"
              handleInputChange={handleInputChange}
              error={errors.invoice_date}
              placeholderText="Select Invoice Date"
              readOnly={false}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
            <FileUpload
              handleUpload={handleFileChange}
              label="Upload Invoice"
              Icon={false}
              name="files"
              variant="outline"
              color="primary"
              size="small"
              multiple={false}
              helperText={errors.files}
            />
            {file && file.filename && (
              <DocumentActionContainer className="manual-upload">
                <span>{file.filename}</span>
              </DocumentActionContainer>
            )}
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

const DocumentActionContainer = styled.div`
  ${({ theme }) => `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: ${theme.spacing(1)};
    background: #F1F1F1;
    padding: 4px;
    box-shadow: 7px;

    span {
      word-break: break-all
    }

    .MuiSvgIcon-root {
      cursor: pointer;
    }

    &.manual-upload {
      flex-direction: column;
      align-items: flex-start;
    }
`}
`;
