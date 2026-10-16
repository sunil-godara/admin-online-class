import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import styled from "@emotion/styled";
import {
  Button,
  Backdrop,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  CircularProgress,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import { Edit, Delete, RemoveRedEye } from "@mui/icons-material";
import Breadcrumb from "@/components/common/Breadcrumb";
import DashboardLayout from "@/components/common/Layout";
import PageTitle from "@/components/common/PageTitle";
import Switch from "@/components/common/Switch";
import InnerContent from "@/components/presentation/InnerContent";
import MuiIconButton from "@/components/presentation/MuiIconButton";
import ThemeProvider from "@/theme/ThemeProvider";
import {
  getAllContents,
  deleteContent,
  updateContentStatus
} from "@/utils/api/content-management";
import {
  capitalizeFirstLetter,
  formatDate,
  getConfig,
  showAlert
} from "@/utils/helpers";
import { Store } from "@/utils/store";
import { withAuth } from "@/utils/withAuth";

export default function Index({ settings, contentListing, userDetails }) {
  const store = Store();
  const router = useRouter();
  const PER_PAGE = getConfig(settings, "ADMIN_PAGE_LIMIT");
  const [contentList, setContentList] = useState(contentListing);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentList, setCurrentList] = useState([]);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContentData = (data = null) => {
    const pageNumber = 1;
    const allContents = data || contentListing;

    const moreLists = [...allContents].splice(
      (pageNumber - 1) * PER_PAGE,
      pageNumber * PER_PAGE
    );

    setCurrentPage(pageNumber);
    setCurrentList(moreLists);

    if (data) {
      setContentList(data);
    } else {
      setContentList(contentListing);
    }
  };

  const handleEdit = id => {
    router.push({
      pathname: "/admin/content-management/edit-content",
      query: { id: id }
    });
  };

  const handleView = id => {
    router.push({
      pathname: "/admin/content-management/view-content",
      query: { id: id }
    });
  };

  const handlePageChange = (event, page) => {
    event.preventDefault();

    const pageNumber = page;

    const moreLists = [...contentList].slice(
      (pageNumber - 1) * PER_PAGE,
      pageNumber * PER_PAGE
    );

    setCurrentPage(pageNumber);
    setCurrentList(moreLists);
  };

  const updateStatus = async (event, id, currentStatus) => {
    event.preventDefault();

    const updatedStatus = currentStatus === "1" ? "0" : "1";

    try {
      const response = await updateContentStatus({
        id: id,
        status: updatedStatus
      });

      if (response.status) {
        handleContentData(response.data);

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
      console.error(error);
      store.setSnackbarDetails({
        status: true,
        message: "Something went wrong, Please try again.",
        color: "error",
        vertical: "top",
        horizontal: "right"
      });
    }
  };

  const handleSearch = async () => {
    setLoading(true);

    // Client-side search implementation
    if (searchKeywords.trim()) {
      const filteredData = contentList.filter(content =>
        content.title.toLowerCase().includes(searchKeywords.toLowerCase())
      );
      handleContentData(filteredData);
    } else {
      // If no search keyword, show all data
      handleContentData(contentList);
    }

    setLoading(false);
  };

  const handleReset = async () => {
    setLoading(true);
    setSearchKeywords("");

    // Reset to original data
    const response = await getAllContents(userDetails.token);
    if (response && response.status) {
      handleContentData(response.data);
    }
    setLoading(false);
  };

  const handleDelete = async id => {
    const response = await deleteContent({
      id: id
    });

    if (response && response.status) {
      handleContentData(response.data);
    }

    return response;
  };

  const handleDeleteAlert = id => {
    showAlert("You want to delete this content?", handleDelete, id);
  };

  useEffect(() => {
    handleContentData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ThemeProvider>
      <Head>
        <title>Dotsquares Wellness - Content Management</title>
        <meta
          name="description"
          content="Dotsquares Wellness - Content Management"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
        <PageTitle title="Content Management" subtitle="">
          <Breadcrumb />
        </PageTitle>
        <InnerContent>
          <Paper elevation={0}>
            <Heading sx={{ p: 4 }}>
              <Typography variant="h2">Content & Policy</Typography>
              <Button
                variant="contained"
                onClick={() =>
                  router.push("/admin/content-management/add-content")
                }
              >
                Add Content
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
                  value={searchKeywords}
                  onChange={({ target }) => setSearchKeywords(target.value)}
                  onKeyPress={e => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
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
                      <TableCell>Title</TableCell>
                      <TableCell>Content</TableCell>
                      <TableCell>Published</TableCell>
                      <TableCell>Created Date</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentList.length > 0 ? (
                      currentList.map((content, index) => (
                        <TableRow key={index}>
                          <TableCell width={130}>
                            <ButtonContainer>
                              <MuiIconButton
                                color="purple"
                                onClick={() => handleEdit(content.id)}
                                title="Edit"
                              >
                                <Edit />
                              </MuiIconButton>
                              <MuiIconButton
                                color="cyan"
                                onClick={() => handleView(content.id)}
                                title="View"
                              >
                                <RemoveRedEye />
                              </MuiIconButton>
                              <MuiIconButton
                                color="darkRed"
                                onClick={() => handleDeleteAlert(content.id)}
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
                            {capitalizeFirstLetter(content.title)}
                          </TableCell>
                          <TableCell>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: content.content.substring(0, 100)
                              }}
                              className="box bg-light-info"
                            ></div>
                          </TableCell>
                          <TableCell>
                            {content.isPublish === "1"
                              ? "Published"
                              : "Not Published"}
                          </TableCell>
                          <TableCell>
                            {formatDate("MM-dd-yyyy", content.createdAt)}
                          </TableCell>
                          <TableCell>
                            <Switch
                              id={`content_status_${content.id}`}
                              checked={content.status === "1"}
                              handleChange={event =>
                                updateStatus(event, content.id, content.status)
                              }
                            />
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
                    Showing {(currentPage - 1) * PER_PAGE}-
                    {currentPage * PER_PAGE} of {contentList.length} items
                  </Typography>
                  <Pagination
                    count={Math.ceil(contentList.length / PER_PAGE)}
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

  const response = await getAllContents(user.token);

  let contentListing = [];

  if (response) {
    contentListing = response.data;
  }

  return {
    props: {
      contentListing,
      userDetails: user
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
    }

    .MuiButton-root {
      min-width: auto;
      border-radius: 0 4px 4px 0;
      border-left: 0;
    }

    @media (min-width: ${theme.breakpoints.values.sm}px) {
      .MuiFormControl-root {
        max-width: 220px;
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
