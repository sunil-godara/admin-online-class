import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import MuiIconButton from "@/components/presentation/MuiIconButton";
import {
  getFileExtension,
  getFileIcons,
  formatDate,
  getConfig
} from "@/utils/helpers";

export default function PoInvoices({ attachmentList, settings }) {
  const PER_PAGE = getConfig(settings, "ADMIN_PAGE_LIMIT");
  const [invoiceList, setInvoiceList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentList, setCurrentList] = useState([]);

  const handleInvoices = data => {
    const pageNumber = 1;
    const allInvoices = data;

    const moreLists = [...allInvoices].splice(
      (pageNumber - 1) * PER_PAGE,
      pageNumber * PER_PAGE
    );

    setCurrentPage(pageNumber);
    setCurrentList(moreLists);

    setInvoiceList(data);
  };

  const handlePageChange = (event, page) => {
    event.preventDefault();

    const pageNumber = page;

    const moreLists = [...invoiceList].slice(
      (pageNumber - 1) * PER_PAGE,
      pageNumber * PER_PAGE
    );

    setCurrentPage(pageNumber);
    setCurrentList(moreLists);
  };

  useEffect(() => {
    (async () => {
      handleInvoices(attachmentList);
    })();
  }, [attachmentList]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper>
      <TableWrapper>
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Invoice No.</TableCell>
                <TableCell>Invoice Amount</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>Invoice Date</TableCell>
                <TableCell>View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentList.length > 0 ? (
                currentList.map((invoice, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {(currentPage - 1) * PER_PAGE + index + 1}
                    </TableCell>
                    <TableCell>{invoice.invoice_number}</TableCell>
                    <TableCell>{invoice.invoice_amount}</TableCell>
                    <TableCell>{invoice.invoice_payment_status}</TableCell>
                    <TableCell>
                      {formatDate("dd/MM/yyyy", invoice.invoice_date)}
                    </TableCell>
                    <TableCell>
                      <MuiIconButton
                        title={invoice.invoice_file_path}
                        color="darkBlue"
                        onClick={() =>
                          window.open(
                            invoice.invoice_file_path,
                            "_blank",
                            "noreferrer"
                          )
                        }
                      >
                        {getFileIcons(
                          getFileExtension(invoice.invoice_file_path)
                        )}
                      </MuiIconButton>
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
              {invoiceList.length} items
            </Typography>
            <Pagination
              count={Math.ceil(invoiceList.length / PER_PAGE)}
              page={currentPage}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
            />
          </TableFooter>
        )}
      </TableWrapper>
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
