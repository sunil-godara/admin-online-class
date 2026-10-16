import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { getSession } from "next-auth/react";
import styled from "@emotion/styled";
import {
  Button,
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
  Typography,
  TextField
} from "@mui/material";
import {
  getAllPurchaseOrderNotes,
  addPurchaseOrderNote
} from "@/utils/api/po-creation";
import { poNoteRules } from "@/utils/constants/rules";
import { poNoteFields } from "@/utils/constants/po-creation";
import { capitalizeFirstLetter, formatDate, getConfig } from "@/utils/helpers";
import { Store } from "@/utils/store";
import {
  formValidation,
  fieldValidation
} from "@/utils/validations/validation";

export default function PoNote({
  PurchaseOrderId,
  setOpen,
  setOrderId,
  settings
}) {
  const store = Store();
  // const router = useRouter();
  const PER_PAGE = getConfig(settings, "ADMIN_PAGE_LIMIT");
  const [noteList, setNoteList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentList, setCurrentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState(poNoteFields);
  const [errors, setErrors] = useState(poNoteFields);

  const handlePurchaseOrderNote = data => {
    const pageNumber = 1;
    const allPoNotes = data;

    const moreLists = [...allPoNotes].splice(
      (pageNumber - 1) * PER_PAGE,
      pageNumber * PER_PAGE
    );

    setCurrentPage(pageNumber);
    setCurrentList(moreLists);

    setNoteList(data);
  };

  const handlePageChange = (event, page) => {
    event.preventDefault();

    const pageNumber = page;

    const moreLists = [...noteList].slice(
      (pageNumber - 1) * PER_PAGE,
      pageNumber * PER_PAGE
    );

    setCurrentPage(pageNumber);
    setCurrentList(moreLists);
  };

  const handleInputChange = ({ target }) => {
    setInputs(inputs => ({
      ...inputs,
      [target.name]: target.value
    }));

    let errorMessage = poNoteRules[target.name]
      ? fieldValidation(poNoteRules[target.name], target.value)
      : "";

    setErrors({
      ...errors,
      [target.name]: errorMessage ? errorMessage : ""
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const validationErrors = formValidation(inputs, poNoteRules);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        let body = {
          ...inputs,
          purchase_order_id: PurchaseOrderId
        };

        const response = await addPurchaseOrderNote(body);

        if (response.status === true) {
          handlePurchaseOrderNote(response.data);

          store.setSnackbarDetails({
            status: true,
            message: response.message,
            color: "success",
            vertical: "top",
            horizontal: "right"
          });
          setInputs(poNoteFields);
          // setOpen(false);
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
    setOrderId("");
  };

  useEffect(() => {
    (async () => {
      const response = await getAllPurchaseOrderNotes({
        purchase_order_id: PurchaseOrderId
      });

      if (response && response.status) {
        handlePurchaseOrderNote(response.data);
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper>
      <TableWrapper>
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentList.length > 0 ? (
                currentList.map((note, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {(currentPage - 1) * PER_PAGE + index + 1}
                    </TableCell>
                    <TableCell>
                      {capitalizeFirstLetter(note.user_name)}
                    </TableCell>
                    <TableCell>{note.notes}</TableCell>
                    <TableCell>
                      {formatDate("dd/MM/yyyy", note.created_at)}
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
              Showing {(currentPage - 1) * PER_PAGE}-{currentPage * PER_PAGE} of{" "}
              {noteList.length} items
            </Typography>
            <Pagination
              count={Math.ceil(noteList.length / PER_PAGE)}
              page={currentPage}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
            />
          </TableFooter>
        )}
      </TableWrapper>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Add PO Notes
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={12} lg={12}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Notes</FormLabel>
            <TextField
              placeholder="Enter Note"
              id="outlined-start-adornment"
              name="notes"
              value={inputs.notes}
              onChange={handleInputChange}
              helperText={errors.notes}
              error={Boolean(errors.notes)}
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

const Wrapper = styled.div`
  ${({ theme }) => `
  padding: ${theme.spacing(0)};

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
