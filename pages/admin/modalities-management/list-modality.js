import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import {
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  CircularProgress,
  Backdrop
} from "@mui/material";
import { Edit, Delete, RemoveRedEye } from "@mui/icons-material";
import { formatDate, getConfig, showAlert } from "@/utils/helpers";
import { Store } from "@/utils/store";
import Breadcrumb from "@/components/common/Breadcrumb";
import DashboardLayout from "@/components/common/Layout";
import PageTitle from "@/components/common/PageTitle";
import InnerContent from "@/components/presentation/InnerContent";
import ThemeProvider from "@/theme/ThemeProvider";
import { withAuth } from "@/utils/withAuth";
import { getSession } from "next-auth/react";
import Switch from "@/components/common/Switch";
import {
  deleteModularity,
  getModularityList,
  updateModularityStatus
} from "@/utils/api/modalities-management";
import MuiIconButton from "@/components/presentation/MuiIconButton";

export default function ListModality({ modularityList, settings }) {
  const store = Store();
  const PER_PAGE = getConfig(settings, "ADMIN_PAGE_LIMIT");
  const [modularities, setModularities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentList, setCurrentList] = useState([]);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (modularityList?.status && modularityList.data?.length) {
      const fullList = modularityList.data;
      setModularities(fullList);
      setCurrentList(fullList.slice(0, PER_PAGE));
    }
  }, [modularityList]);

  const handleModularityData = data => {
    const pageNumber = 1;
    const allModularities = Array.isArray(data) ? data : [];
    const paginatedList = allModularities.slice(
      (pageNumber - 1) * PER_PAGE,
      pageNumber * PER_PAGE
    );

    setCurrentPage(pageNumber);
    setCurrentList(paginatedList);
    setModularities(allModularities);
  };

  const handleEdit = id => {
    router.push({
      pathname: "/admin/modalities-management/edit-modality",
      query: { id: id }
    });
  };

  const handlePageChange = (event, page) => {
    event.preventDefault();
    setCurrentPage(page);
    const start = (page - 1) * PER_PAGE;
    setCurrentList(modularities.slice(start, start + PER_PAGE));
  };

  const handleSearch = () => {
    setLoading(true);
    const filtered = modularities.filter(mod =>
      mod.name.toLowerCase().includes(searchKeywords.toLowerCase())
    );
    setCurrentList(filtered.slice(0, PER_PAGE));
    setCurrentPage(1);
    setLoading(false);
  };

  const handleReset = () => {
    setSearchKeywords("");
    setCurrentList(modularities.slice(0, PER_PAGE));
    setCurrentPage(1);
  };

  const updateStatus = async (event, mod_id, currentStatus) => {
    event.preventDefault();

    const newStatus = currentStatus === "1" ? "0" : "1";

    try {
      setLoading(true);

      const response = await updateModularityStatus({
        id: mod_id,
        status: newStatus
      });

      if (response.status) {
        handleModularityData(response.data);

        store.setSnackbarDetails({
          status: true,
          message: response.message,
          color: "success",
          vertical: "top",
          horizontal: "right"
        });
      } else {
        store.setSnackbarDetails({
          status: true,
          message: response.message,
          color: "error",
          vertical: "top",
          horizontal: "right"
        });
      }
    } catch (error) {
      console.log("Error updating user status:", error.message);

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
  };

  const handleDelete = async mod_id => {
    const response = await deleteModularity({
      id: mod_id
    });

    if (response.status) {
      handleModularityData(response.data);
    }

    return response;
  };

  const handleDeleteAlert = id => {
    showAlert("You want to delete this modality?", handleDelete, id);
  };

  const handleView = id => {
    router.push({
      pathname: "/admin/modalities-management/view-modality",
      query: { id: id }
    });
  };

  return (
    <ThemeProvider>
      <Head>
        <title>Dotsquares Wellness - List Modalities</title>
        <meta
          name="description"
          content="Dotsquares Wellness - List Modalities"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
        <PageTitle title="Modalities Management" subtitle="">
          <Breadcrumb />
        </PageTitle>
        <InnerContent>
          <Paper elevation={0}>
            <Heading sx={{ p: 4 }}>
              <Typography variant="h2">Modalities</Typography>
              <Button
                variant="contained"
                onClick={() =>
                  router.push("/admin/modalities-management/add-modality")
                }
              >
                Add Modality
              </Button>
            </Heading>
            <Action>
              <SearchAction>
                <TextField
                  id="outlined-basic"
                  label="Search"
                  helperText="Search by name"
                  variant="outlined"
                  size="small"
                  className="custom-textfield"
                  value={searchKeywords}
                  onChange={({ target }) => setSearchKeywords(target.value)}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={handleSearch}
                >
                  Go
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </SearchAction>
            </Action>
            <TableWrapper>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Action</TableCell>
                      <TableCell>#</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Created Date</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentList.length > 0 ? (
                      currentList.map((mod, idx) => (
                        <TableRow key={mod.id}>
                          <TableCell width={130}>
                            <ButtonContainer>
                              <MuiIconButton
                                color="purple"
                                onClick={() => handleEdit(mod.id)}
                                title="Edit"
                              >
                                <Edit />
                              </MuiIconButton>
                              <MuiIconButton
                                color="cyan"
                                onClick={() => handleView(mod.id)}
                                title="View"
                              >
                                <RemoveRedEye />
                              </MuiIconButton>
                              <MuiIconButton
                                color="darkRed"
                                onClick={() => handleDeleteAlert(mod.id)}
                                title="Delete"
                              >
                                <Delete />
                              </MuiIconButton>
                            </ButtonContainer>
                          </TableCell>
                          <TableCell>
                            {(currentPage - 1) * PER_PAGE + idx + 1}
                          </TableCell>
                          <TableCell>{mod.name}</TableCell>
                          <TableCell>{mod.description}</TableCell>
                          <TableCell>
                            {formatDate("MM-dd-yyyy", mod.createdAt)}
                          </TableCell>
                          <TableCell>
                            <Switch
                              id={`modularity_status_${mod.id}`}
                              checked={mod.status === "1"}
                              disabled={loading}
                              handleChange={event =>
                                updateStatus(event, mod.id, mod.status)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          No Records Found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {modularities.length > PER_PAGE && (
                <StyledTableFooter>
                  <Typography variant="h6">
                    Showing {(currentPage - 1) * PER_PAGE + 1}-
                    {Math.min(currentPage * PER_PAGE, modularities.length)} of{" "}
                    {modularities.length} items
                  </Typography>
                  <Pagination
                    count={Math.ceil(modularities.length / PER_PAGE)}
                    page={currentPage}
                    onChange={handlePageChange}
                  />
                </StyledTableFooter>
              )}
            </TableWrapper>
          </Paper>
        </InnerContent>
        {loading && (
          <Backdrop open={loading} style={{ zIndex: 1000, color: "#fff" }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </DashboardLayout>
    </ThemeProvider>
  );
}

export const getServerSideProps = withAuth(async context => {
  const session = await getSession(context);
  const { user } = session;

  const modularityList = await getModularityList(user.token);

  return {
    props: {
      practitionerDetails: user,
      modularityList: modularityList
    }
  };
});

const Heading = styled.div`
  ${({ theme }) => `
    padding: ${theme.spacing(3, 2)};
    border-bottom: 1px solid ${theme.colors?.palette?.lightGrey || "#eee"};
    display: flex;
    justify-content: space-between;
    align-items: center;
    .MuiButtonBase-root {
      height: 30px;
    }
  `}
`;

const Action = styled.div`
  ${({ theme }) => `
    display: flex;
    justify-content: space-between;
    padding: ${theme.spacing(3, 4)};
    border-bottom: 1px solid ${theme.colors?.palette?.lightGrey || "#eee"};
    flex-direction: column;
    > .MuiButtonBase-root {
      white-space: nowrap;
      .MuiSvgIcon-root {
        font-size: 20px;
      }
    }
    @media (min-width: ${theme.breakpoints?.values?.sm || 600}px) {
      flex-direction: row;
    }
  `}
`;

const SearchAction = styled.div`
  ${({ theme }) => `
    display: flex;
    .MuiFormControl-root {
      width: 100%;
      .MuiInputBase-root {
        border-radius: 4px 0 0 4px;
      }
      .MuiOutlinedInput-root {
        .MuiSelect-select {
          padding-top: 6px;
          padding-bottom: 6px;
          height: 24px;
          font-size: 15px;
        }
        .MuiOutlinedInput-notchedOutline {
          border-radius: 0;
        }
      }
    }
    .MuiButton-root {
      min-width: auto;
      border-radius: 0 4px 4px 0;
      border-left: 0;
    }
    @media (min-width: ${theme.breakpoints?.values?.sm || 600}px) {
      .MuiFormControl-root {
        max-width: 220px;
        &.custom-textfield {
          width: 140px;
        }
      }
    }
  `}
`;

const TableWrapper = styled.div`
  ${({ theme }) => `
    padding: ${theme.spacing(3, 4)};
    .MuiTableRow-root {
      &:nth-of-type(odd) {
        background: ${theme.colors?.palette?.lighterGrey || "#fafafa"};
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
      background: ${theme.colors?.palette?.white || "#fff"};
    }
    .MuiButtonBase-root {
      margin-right: 5px;
    }
    .MuiTableCell-root {
      color: ${theme.colors?.palette?.darkGrey || "#333"};
      white-space: nowrap;
      font-size: 14px;
      padding: 10px;
      @media (min-width: ${theme.breakpoints?.values?.sm || 600}px) {
        font-size: 16px;
      }
      @media (min-width: ${theme.breakpoints?.values?.md || 900}px) {
        font-size: 14px;
      }
    }
  `}
`;

const StyledTableFooter = styled.div`
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

const ButtonContainer = styled.div`
  ${() => `    display: flex;
    align-items: center;
    justify-content: flex-start;
`}
`;
