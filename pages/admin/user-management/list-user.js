import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import styled from "@emotion/styled";
import {
  Button,
  Backdrop,
  CircularProgress,
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
import { Delete, RemoveRedEye } from "@mui/icons-material";
import Breadcrumb from "@/components/common/Breadcrumb";
import DashboardLayout from "@/components/common/Layout";
import PageTitle from "@/components/common/PageTitle";
import Switch from "@/components/common/Switch";
import InnerContent from "@/components/presentation/InnerContent";
import MuiIconButton from "@/components/presentation/MuiIconButton";
import ThemeProvider from "@/theme/ThemeProvider";
import {
  updateUserStatus,
  deleteUser,
  getUserList
} from "@/utils/api/user-management";
import {
  showAlert,
  capitalizeFirstLetter,
  getConfig,
  formatDate
} from "@/utils/helpers";
import { Store } from "@/utils/store";
import { withAuth } from "@/utils/withAuth";

export default function ListUser({ userRoles, settings }) {
  const store = Store();
  const router = useRouter();
  const PER_PAGE = getConfig(settings, "ADMIN_PAGE_LIMIT");
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentList, setCurrentList] = useState([]);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUserData = data => {
    const pageNumber = 1;
    const allUsers = Array.isArray(data) ? data : [];
    const moreLists = allUsers.slice(
      (pageNumber - 1) * PER_PAGE,
      pageNumber * PER_PAGE
    );
    setCurrentPage(pageNumber);
    setCurrentList(moreLists);
    setUserList(allUsers);
  };

  const updateStatus = async (event, user_id, currentStatus) => {
    event.preventDefault();

    const newStatus = currentStatus === "1" ? "0" : "1";
    const reason =
      newStatus === "0"
        ? "User requested deactivation"
        : "Reactivated by admin";

    try {
      setLoading(true);

      const response = await updateUserStatus({
        userId: user_id,
        status: newStatus,
        reason
      });

      if (response.status) {
        handleUserData(response.data);

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

  const handleView = id => {
    router.push({
      pathname: "/admin/user-management/view-user",
      query: { id: id }
    });
  };

  const handleDelete = async user_id => {
    const response = await deleteUser({
      userId: user_id
    });

    if (response.status) {
      handleUserData(response.data);
    }

    return response;
  };

  const handleDeleteAlert = id => {
    showAlert("You want to delete this user?", handleDelete, id);
  };

  const handlePageChange = (event, page) => {
    event.preventDefault();

    const pageNumber = page;

    const moreLists = [...userList].slice(
      (pageNumber - 1) * PER_PAGE,
      pageNumber * PER_PAGE
    );

    setCurrentPage(pageNumber);
    setCurrentList(moreLists);
  };

  const handleSearch = () => {
    setLoading(true);
    let filtered = userList;
    if (searchKeywords) {
      filtered = userList.filter(user => {
        const keyword = searchKeywords.toLowerCase();
        const nameMatch =
          user.name && user.name.toLowerCase().includes(keyword);
        const emailMatch =
          user.email && user.email.toLowerCase().includes(keyword);
        return nameMatch || emailMatch;
      });
    }
    setCurrentPage(1);
    setCurrentList(filtered.slice(0, PER_PAGE));
    setLoading(false);
  };

  const handleReset = () => {
    setLoading(true);
    setSearchKeywords("");
    setCurrentPage(1);
    setCurrentList(userList.slice(0, PER_PAGE));
    setLoading(false);
  };

  useEffect(() => {
    if (userRoles && Array.isArray(userRoles.data)) {
      handleUserData(userRoles.data);
    }
  }, [userRoles]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ThemeProvider>
      <Head>
        <title>Dotsquares Wellness - List Users</title>
        <meta name="description" content="Dotsquares Wellness - List Users" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
        <PageTitle title="User Management" subtitle="">
          <Breadcrumb />
        </PageTitle>

        <InnerContent>
          <Paper elevation={0}>
            <Heading sx={{ p: 4 }}>
              <Typography variant="h2">Users</Typography>
            </Heading>
            <Action>
              <SearchAction>
                <TextField
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                  size="small"
                  className="custom-textfield"
                  value={searchKeywords}
                  onChange={({ target }) => setSearchKeywords(target.value)}
                  helperText="Search by name or email"
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
              <TableContainer component={Paper} elevation={0}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Action</TableCell>
                      <TableCell>#</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Created Date</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentList.length > 0 ? (
                      currentList.map((user, index) => (
                        <TableRow key={user.id}>
                          <TableCell width={130}>
                            <ButtonContainer>
                              <MuiIconButton
                                color="cyan"
                                onClick={() => handleView(user.id)}
                                title="View"
                              >
                                <RemoveRedEye />
                              </MuiIconButton>
                              <MuiIconButton
                                color="darkRed"
                                onClick={() => handleDeleteAlert(user.id)}
                                title="Delete"
                              >
                                <Delete />
                              </MuiIconButton>
                            </ButtonContainer>
                          </TableCell>
                          <TableCell>
                            {(currentPage - 1) * PER_PAGE + index + 1}
                          </TableCell>
                          <TableCell>
                            {capitalizeFirstLetter(user.name)}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.phone}</TableCell>
                          <TableCell>
                            {formatDate("MM-dd-yyyy", user.createdAt)}
                          </TableCell>
                          <TableCell>
                            <Switch
                              id={`user_status_${user.id}`}
                              checked={user.status === "1"}
                              disabled={loading}
                              handleChange={event =>
                                updateStatus(event, user.id, user.status)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} align="center">
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
                    Showing {(currentPage - 1) * PER_PAGE}-
                    {currentPage * PER_PAGE} of {userList.length} items
                  </Typography>
                  <Pagination
                    count={Math.ceil(userList.length / PER_PAGE)}
                    page={currentPage}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                  />
                </TableFooter>
              )}
            </TableWrapper>
          </Paper>
        </InnerContent>
      </DashboardLayout>
      {loading && (
        <Backdrop open={loading} style={{ zIndex: 1000, color: "#fff" }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </ThemeProvider>
  );
}

export const getServerSideProps = withAuth(async context => {
  const session = await getSession(context);
  const { user } = session;

  const userList = await getUserList(user.token);

  return {
    props: {
      userDetails: user,
      userRoles: userList
    }
  };
});

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

const Action = styled.div`
  ${({ theme }) => `
    display: flex;
    justify-content: space-between;
    padding: ${theme.spacing(3, 4)};
    border-bottom: 1px solid ${theme.colors.palette.lightGrey};
    flex-direction: column;

    > .MuiButtonBase-root {
      white-space: nowrap;

      .MuiSvgIcon-root {
        font-size: 20px;
      }
    }

    @media (min-width: ${theme.breakpoints.values.sm}px) {
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

    @media (min-width: ${theme.breakpoints.values.sm}px) {
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

const ButtonContainer = styled.div`
  ${() => `    display: flex;
    align-items: center;
    justify-content: flex-start;
`}
`;
