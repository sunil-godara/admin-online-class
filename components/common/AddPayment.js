import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  Button,
  Backdrop,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import CommonDatePicker from "./CommonDatePicker";
import {
  getAllInvoicePayments,
  addInvoicePayment
} from "@/utils/api/po-invoice";
import { invoicePaymentRules } from "@/utils/constants/rules";
import { invoicePaymentFields } from "@/utils/constants/invoice-constants";
import { formatDate } from "@/utils/helpers";
import { Store } from "@/utils/store";
import {
  formValidation,
  fieldValidation
} from "@/utils/validations/validation";

export default function AddPayment({ InvoiceId, setOpen, setInvoiceId }) {
  const store = Store();
  const [invoiceDetails, setInvoiceDetails] = useState({});
  const [paymentList, setPaymentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentList, setCurrentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modelloading, setModelLoading] = useState(false);
  const [inputs, setInputs] = useState(invoicePaymentFields);
  const [errors, setErrors] = useState(invoicePaymentFields);

  const handleInvoicePayment = data => {
    const pageNumber = 1;
    const allPoNotes = data;

    const moreLists = [...allPoNotes].splice(
      (pageNumber - 1) * 10,
      pageNumber * 10
    );

    setCurrentPage(pageNumber);
    setCurrentList(moreLists);

    setPaymentList(data);
  };

  const handlePageChange = (event, page) => {
    event.preventDefault();

    const pageNumber = page;

    const moreLists = [...paymentList].slice(
      (pageNumber - 1) * 10,
      pageNumber * 10
    );

    setCurrentPage(pageNumber);
    setCurrentList(moreLists);
  };

  const handleInputChange = ({ target }) => {
    setInputs(inputs => ({
      ...inputs,
      [target.name]: target.value
    }));

    let errorMessage = invoicePaymentRules[target.name]
      ? fieldValidation(invoicePaymentRules[target.name], target.value)
      : "";

    setErrors({
      ...errors,
      [target.name]: errorMessage ? errorMessage : ""
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const validationErrors = formValidation(inputs, invoicePaymentRules);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        let body = {
          ...inputs,
          id: InvoiceId
        };

        const response = await addInvoicePayment(body);

        if (response.status === true) {
          const { invoice_payment, ...rest } = response.data[0];

          setInvoiceDetails(rest);

          if (invoice_payment) {
            handleInvoicePayment(invoice_payment);
          }

          store.setSnackbarDetails({
            status: true,
            message: response.message,
            color: "success",
            vertical: "top",
            horizontal: "right"
          });
          // setOpen(false);
          setInputs(invoicePaymentFields);
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
    setErrors("");
    setOpen(false);
    setInvoiceId("");
  };

  useEffect(() => {
    (async () => {
      setModelLoading(true);
      const response = await getAllInvoicePayments({
        id: InvoiceId
      });

      if (response && response.status) {
        const { invoice_payment, ...rest } = response.data[0];

        setInvoiceDetails(rest);

        if (invoice_payment) {
          handleInvoicePayment(invoice_payment);
        }
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
              <strong>Total Amount :</strong>
              <Typography>
                {invoiceDetails.invoice_amount?.toLocaleString("en-GB", {
                  style: "currency",
                  currency: "GBP",
                  currencyDisplay: "symbol",
                  maximumFractionDigits: 2
                })}
              </Typography>
            </Grid>
            <Grid item xs={4} display="flex">
              <strong>Paid Amount :</strong>
              <Typography>
                {invoiceDetails.invoice_paid_amount?.toLocaleString("en-GB", {
                  style: "currency",
                  currency: "GBP",
                  currencyDisplay: "symbol",
                  maximumFractionDigits: 2
                })}
              </Typography>
            </Grid>
            <Grid item xs={4} display="flex">
              <strong>Outstanding Amount :</strong>
              <Typography>
                {invoiceDetails.invoice_outstanding_amount?.toLocaleString(
                  "en-GB",
                  {
                    style: "currency",
                    currency: "GBP",
                    currencyDisplay: "symbol",
                    maximumFractionDigits: 2
                  }
                )}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
      <Typography variant="h3" sx={{ mb: 1 }}>
        Payment History
      </Typography>
      <TableWrapper>
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Paid Amount</TableCell>
                <TableCell>Invoice Paid Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentList.length > 0 ? (
                currentList.map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell>{(currentPage - 1) * 10 + index + 1}</TableCell>
                    <TableCell>
                      {payment.invoice_amount?.toLocaleString("en-GB", {
                        style: "currency",
                        currency: "GBP",
                        currencyDisplay: "symbol",
                        maximumFractionDigits: 2
                      })}
                    </TableCell>
                    <TableCell>
                      {formatDate("dd/MM/yyyy", payment.invoice_paid_date)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No Records Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {currentList.length > 0 && (
          <TableFooter>
            <Typography variant="h6">
              Showing {(currentPage - 1) * 10}-{currentPage * 10} of{" "}
              {paymentList.length} items
            </Typography>
            <Pagination
              count={Math.ceil(paymentList.length / 10)}
              page={currentPage}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
            />
          </TableFooter>
        )}
      </TableWrapper>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Add Payment
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Invoice Paid Amount</FormLabel>
            <TextField
              placeholder="Enter Paid Amount"
              id="invoice_paid_amount"
              name="invoice_paid_amount"
              helperText={errors.invoice_paid_amount}
              error={Boolean(errors.invoice_paid_amount)}
              value={inputs.invoice_paid_amount}
              onChange={handleInputChange}
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            // error={Boolean(errors.invoice_paid_date)}
            required
          >
            <FormLabel>Invoice Paid Date</FormLabel>
            <CommonDatePicker
              value={inputs.invoice_paid_date}
              dateFormat="dd/MM/yyyy"
              name="invoice_paid_date"
              handleInputChange={handleInputChange}
              error={errors.invoice_paid_date}
              placeholderText="Select Invoice Paid Date"
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

const Wrapper = styled.div`
  ${({ theme }) => `
  padding: ${theme.spacing(0)};

  .MuiFormLabel-root {
    color: ${theme.colors.palette.darkGrey};
    margin-bottom: ${theme.spacing(1)};
    display: block;
    font-size: 14px;
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

const TableWrapper = styled.div`
  ${({ theme }) => `
    padding: ${theme.spacing(0)};
    margin-top: 8px;
    margin-bottom: 32px;

    .MuiTableRow-root {
      &:nth-of-type(odd) {
        background: ${theme.colors.palette.lighterGrey}
      }
    }

    .MuiFormControl-root {
      width: auto;

      .MuiOutlinedInput-notchedOutline {
        border: 0;
      }

      .MuiInputBase-input {
        padding: 0;
      }
    }

    .MuiTableCell-head {
      font-weight: 600;
      background: ${theme.colors.palette.white}
    }

    .MuiButtonBase-root {
      margin-right: 5px;
    }

    .MuiTableCell-root {
      color: ${theme.colors.palette.darkGrey};
      white-space: nowrap;
      font-size: 14px;
      padding: 10px;

      @media (min-width: ${theme.breakpoints.values.sm}px) {
        font-size: 16px;
      }

      @media (min-width: ${theme.breakpoints.values.md}px) {
        font-size: 14px;
      }
    }
  `}
`;

const TableFooter = styled.div`
  ${({ theme }) => `
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: ${theme.spacing(3)};

    .MuiPagination-root {
      .MuiPagination-ul {
        li {
          button {
            height: 25px;
            min-width: 25px;
            font-size: 14px;
            padding: 8px;
          }
        }
      }
    }
  `}
`;
