import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import {
  Divider,
  Grid,
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
  formatDate,
  capitalizeFirstLetter,
  getFileExtension,
  getFileIcons
} from "@/utils/helpers";

export default function ViewInfo({ data }) {
  const [information, setInformation] = useState([]);

  useEffect(() => {
    setInformation(data);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Scheme Name</strong>
        </Grid>
        <Grid item>
          <Typography>{information.scheme_name}</Typography>
        </Grid>
      </Grid>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Scheme Type</strong>
        </Grid>
        <Grid item>
          <Typography>{information.scheme_type}</Typography>
        </Grid>
      </Grid>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Customer Name</strong>
        </Grid>
        <Grid item>
          <Typography>{information.customer_name}</Typography>
        </Grid>
      </Grid>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Hardware Supplier Name</strong>
        </Grid>
        <Grid item>
          <Typography>{information.customer_name}</Typography>
        </Grid>
      </Grid>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Insurance Cover Supplier Name</strong>
        </Grid>
        <Grid item>
          <Typography>{information.customer_name}</Typography>
        </Grid>
      </Grid>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Extended Warranty Cover Supplier Name</strong>
        </Grid>
        <Grid item>
          <Typography>{information.customer_name}</Typography>
        </Grid>
      </Grid>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Scheme Live Date</strong>
        </Grid>
        <Grid item>
          <Typography>
            {formatDate("dd/MM/yyyy", information.live_date)}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Scheme Close Date</strong>
        </Grid>
        <Grid item>
          <Typography>
            {formatDate("dd/MM/yyyy", information.close_date)}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Notify Scheme Email</strong>
        </Grid>
        <Grid item>
          <Typography>{information.notify_scheme_email}</Typography>
        </Grid>
      </Grid>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Ordering Portal Url</strong>
        </Grid>
        <Grid item>
          <Typography>{information.ordering_portal_url}</Typography>
        </Grid>
      </Grid>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Ordering Portal User Login</strong>
        </Grid>
        <Grid item>
          <Typography>{information.ordering_portal_user_login}</Typography>
        </Grid>
      </Grid>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Status</strong>
        </Grid>
        <Grid item>
          <Typography>{information.status ? "Active" : "In-Active"}</Typography>
        </Grid>
      </Grid>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Created At</strong>
        </Grid>
        <Grid item>
          <Typography>
            {formatDate("dd/MM/yyyy", information.created_at)}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Updated At</strong>
        </Grid>
        <Grid item>
          <Typography>
            {formatDate("dd/MM/yyyy", information.updated_at)}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />
      <Paper elevation={0}>
        <Heading sx={{ p: 4 }}>
          <Typography variant="h2">Scheme Products</Typography>
        </Heading>
        <TableWrapper>
          <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>SKU Code</TableCell>
                  <TableCell>Supplier</TableCell>
                  <TableCell>Supplier Cost</TableCell>
                  <TableCell>School Cash Price</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {information.products?.length > 0 ? (
                  information.products?.map((product, index) => (
                    <TableRow key={`product-list-${index}`}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {capitalizeFirstLetter(product.name)}
                      </TableCell>
                      <TableCell>{product.sku_number}</TableCell>
                      <TableCell>{product.supplier_id}</TableCell>
                      <TableCell>{product.supplier_cost}</TableCell>
                      <TableCell>{product.school_cash_price}</TableCell>
                      <TableCell>
                        {formatDate("dd/MM/yyyy", product.created_at)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No Records Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
      </Paper>
      <Divider sx={{ my: 3 }} />
      <Paper elevation={0}>
        <Heading sx={{ p: 4 }}>
          <Typography variant="h2">Quotes</Typography>
        </Heading>
        <TableWrapper>
          <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>File Name</TableCell>
                  <TableCell>File Path</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {information.scheme_documents &&
                information.scheme_documents.quotes_doc?.length > 0 ? (
                  information.scheme_documents.quotes_doc.map((doc, index) => (
                    <TableRow key={`quote-doc-${index}`}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{doc.filename}</TableCell>
                      <TableCell>
                        <MuiIconButton
                          color="darkBlue"
                          onClick={() =>
                            window.open(doc.filepath, "_blank", "noreferrer")
                          }
                        >
                          {getFileIcons(getFileExtension(doc.filename))}
                        </MuiIconButton>
                      </TableCell>
                      <TableCell>
                        {formatDate("dd/MM/yyyy", doc.created_at)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No Records Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
      </Paper>
      <Divider sx={{ my: 3 }} />
      <Paper elevation={0}>
        <Heading sx={{ p: 4 }}>
          <Typography variant="h2">Scheme CSV</Typography>
        </Heading>
        <TableWrapper>
          <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>File Name</TableCell>
                  <TableCell>File Path</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {information.scheme_documents &&
                information.scheme_documents.scheme_csv?.length > 0 ? (
                  information.scheme_documents.scheme_csv.map((doc, index) => (
                    <TableRow key={`quote-doc-${index}`}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{doc.filename}</TableCell>
                      <TableCell>
                        <MuiIconButton
                          color="darkBlue"
                          onClick={() =>
                            window.open(doc.filepath, "_blank", "noreferrer")
                          }
                        >
                          {getFileIcons(getFileExtension(doc.filename))}
                        </MuiIconButton>
                      </TableCell>
                      <TableCell>
                        {formatDate("dd/MM/yyyy", doc.created_at)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No Records Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
      </Paper>
      <Divider sx={{ my: 3 }} />
      <Paper elevation={0}>
        <Heading sx={{ p: 4 }}>
          <Typography variant="h2">Process Doc</Typography>
        </Heading>
        <TableWrapper>
          <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>File Name</TableCell>
                  <TableCell>File Path</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {information.scheme_documents &&
                information.scheme_documents.process_doc?.length > 0 ? (
                  information.scheme_documents.process_doc.map((doc, index) => (
                    <TableRow key={`quote-doc-${index}`}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{doc.filename}</TableCell>
                      <TableCell>
                        <MuiIconButton
                          color="darkBlue"
                          onClick={() =>
                            window.open(doc.filepath, "_blank", "noreferrer")
                          }
                        >
                          {getFileIcons(getFileExtension(doc.filename))}
                        </MuiIconButton>
                      </TableCell>
                      <TableCell>
                        {formatDate("dd/MM/yyyy", doc.created_at)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No Records Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
      </Paper>
      <Divider sx={{ my: 3 }} />
      <Paper elevation={0}>
        <Heading sx={{ p: 4 }}>
          <Typography variant="h2">Finance Doc</Typography>
        </Heading>
        <TableWrapper>
          <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>File Name</TableCell>
                  <TableCell>File Path</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {information.scheme_documents &&
                information.scheme_documents.finance_doc?.length > 0 ? (
                  information.scheme_documents.finance_doc.map((doc, index) => (
                    <TableRow key={`quote-doc-${index}`}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{doc.filename}</TableCell>
                      <TableCell>
                        <MuiIconButton
                          color="darkBlue"
                          onClick={() =>
                            window.open(doc.filepath, "_blank", "noreferrer")
                          }
                        >
                          {getFileIcons(getFileExtension(doc.filename))}
                        </MuiIconButton>
                      </TableCell>
                      <TableCell>
                        {formatDate("dd/MM/yyyy", doc.created_at)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No Records Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
      </Paper>
      <Divider sx={{ my: 3 }} />
      <Paper elevation={0}>
        <Heading sx={{ p: 4 }}>
          <Typography variant="h2">Scheme Calculators</Typography>
        </Heading>
        <TableWrapper>
          <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>File Name</TableCell>
                  <TableCell>File Path</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {information.scheme_documents &&
                information.scheme_documents.scheme_calculators?.length > 0 ? (
                  information.scheme_documents.scheme_calculators.map(
                    (doc, index) => (
                      <TableRow key={`quote-doc-${index}`}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{doc.filename}</TableCell>
                        <TableCell>
                          <MuiIconButton
                            color="darkBlue"
                            onClick={() =>
                              window.open(doc.filepath, "_blank", "noreferrer")
                            }
                          >
                            {getFileIcons(getFileExtension(doc.filename))}
                          </MuiIconButton>
                        </TableCell>
                        <TableCell>
                          {formatDate("dd/MM/yyyy", doc.created_at)}
                        </TableCell>
                      </TableRow>
                    )
                  )
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No Records Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
      </Paper>
      <Divider sx={{ my: 3 }} />
      <Paper elevation={0}>
        <Heading sx={{ p: 4 }}>
          <Typography variant="h2">Scheme Serial</Typography>
        </Heading>
        <TableWrapper>
          <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>File Name</TableCell>
                  <TableCell>File Path</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {information.scheme_documents &&
                information.scheme_documents.scheme_serial?.length > 0 ? (
                  information.scheme_documents.scheme_serial.map(
                    (doc, index) => (
                      <TableRow key={`quote-doc-${index}`}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{doc.filename}</TableCell>
                        <TableCell>
                          <MuiIconButton
                            color="darkBlue"
                            onClick={() =>
                              window.open(doc.filepath, "_blank", "noreferrer")
                            }
                          >
                            {getFileIcons(getFileExtension(doc.filename))}
                          </MuiIconButton>
                        </TableCell>
                        <TableCell>
                          {formatDate("dd/MM/yyyy", doc.created_at)}
                        </TableCell>
                      </TableRow>
                    )
                  )
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No Records Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
      </Paper>
      <Divider sx={{ my: 3 }} />
      <Paper elevation={0}>
        <Heading sx={{ p: 4 }}>
          <Typography variant="h2">Other Doc</Typography>
        </Heading>
        <TableWrapper>
          <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>File Name</TableCell>
                  <TableCell>File Path</TableCell>
                  <TableCell>created_at</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {information.scheme_documents &&
                information.scheme_documents.other_doc?.length > 0 ? (
                  information.scheme_documents.other_doc.map((doc, index) => (
                    <TableRow key={`quote-doc-${index}`}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{doc.filename}</TableCell>
                      <TableCell>
                        <MuiIconButton
                          color="darkBlue"
                          onClick={() =>
                            window.open(doc.filepath, "_blank", "noreferrer")
                          }
                        >
                          {getFileIcons(getFileExtension(doc.filename))}
                        </MuiIconButton>
                      </TableCell>
                      <TableCell>
                        {formatDate("dd/MM/yyyy", doc.created_at)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No Records Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
      </Paper>
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => `
    padding: ${theme.spacing(3)};

    .info-row {
      margin-bottom: 8px;
      padding: 16px 8px;
      background-color: #f5f4f4;
    }
  `}
`;

const Heading = styled.div`
  ${({ theme }) => `
    padding: ${theme.spacing(3, 2)};
    border-bottom: 1px solid ${theme.colors.palette.lightGrey};
    display: flex;
    justify-content: space-between;
    align-items: center;

    .MuiButtonBase-root {
      height: 30px;
    }
  `}
`;

const TableWrapper = styled.div`
  ${({ theme }) => `
    padding: ${theme.spacing(2)};

    h3 {
      margin-bottom: ${theme.spacing(2)};
    }

    .MuiTableRow-root {
      &:nth-of-type(odd) {
        background: ${theme.colors.palette.lighterGrey}
      }
    }

    .MuiCheckbox-root {
      padding: 4px
    }

    .MuiTableCell-head {
      font-weight: 600;
      background: ${theme.colors.palette.white}
    }

    
    .MuiTableCell-root {
      color: ${theme.colors.palette.darkGrey};
      white-space: nowrap;
      font-size: 14px;
      padding: 4px 14px;

      @media (min-width: ${theme.breakpoints.values.md}px) {  
        font-size: 16px;
      }
    }
  `}
`;
