import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
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
import { RemoveRedEye } from "@mui/icons-material";
import Breadcrumb from "@/components/common/Breadcrumb";
import DashboardLayout from "@/components/common/Layout";
import PageTitle from "@/components/common/PageTitle";
import InnerContent from "@/components/presentation/InnerContent";
import MuiIconButton from "@/components/presentation/MuiIconButton";
import ThemeProvider from "@/theme/ThemeProvider";
import { withAuth } from "@/utils/withAuth";
import { formatDate, getConfig } from "@/utils/helpers";
import { getStudioRoomList } from "@/utils/api/studio-room-management";

export default function ListStudioRoom({ studioRoomList, settings }) {
  const PER_PAGE = getConfig(settings, "ADMIN_PAGE_LIMIT");
  const [studioLists, setStudioLists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentList, setCurrentList] = useState([]);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (studioRoomList?.status) {
      handleStudioData(studioRoomList.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStudioData = data => {
    const pageNumber = 1;
    const allStudios = Array.isArray(data) ? data : [];
    const moreLists = allStudios.slice(
      (pageNumber - 1) * PER_PAGE,
      pageNumber * PER_PAGE
    );
    setCurrentPage(pageNumber);
    setCurrentList(moreLists);
    setStudioLists(allStudios);
  };

  const handlePageChange = (event, page) => {
    event.preventDefault();
    const pageNumber = page;
    const moreLists = studioLists.slice(
      (pageNumber - 1) * PER_PAGE,
      pageNumber * PER_PAGE
    );
    setCurrentPage(pageNumber);
    setCurrentList(moreLists);
  };

  const handleSearch = () => {
    setLoading(true);
    let filtered = studioLists;
    if (searchKeywords) {
      const keyword = searchKeywords.toLowerCase();
      filtered = studioLists.filter(room => {
        const nameMatch = room.name?.toLowerCase().includes(keyword);
        const studioMatch = room.studio?.name?.toLowerCase().includes(keyword);
        const locationMatch = room.studio?.location
          ?.toLowerCase()
          .includes(keyword);
        return nameMatch || studioMatch || locationMatch;
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
    setCurrentList(studioLists.slice(0, PER_PAGE));
    setLoading(false);
  };

  const handleView = id => {
    router.push({
      pathname: "/admin/studio-room-management/view-studio-room",
      query: { id: id }
    });
  };

  return (
    <ThemeProvider>
      <Head>
        <title>Dotsquares Wellness - List Studio Room</title>
        <meta
          name="description"
          content="Dotsquares Wellness - List Studio Room"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
        <PageTitle title="Studio Room Management" subtitle="">
          <Breadcrumb />
        </PageTitle>
        <InnerContent>
          <Paper elevation={0}>
            <Heading sx={{ p: 4 }}>
              <Typography variant="h2">Studio Room</Typography>
            </Heading>
            <Action>
              <SearchAction>
                <TextField
                  id="outlined-basic"
                  label="Search"
                  helperText="Search by name or location"
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
              <TableContainer component={Paper} elevation={0}>
                <Table sx={{ minWidth: 650 }} aria-label="studio table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Action</TableCell>
                      <TableCell>#</TableCell>
                      <TableCell>Room Name</TableCell>
                      <TableCell>Capacity</TableCell>
                      <TableCell>Studio</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Created Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentList.length > 0 ? (
                      currentList.map((room, index) => (
                        <TableRow key={room.id}>
                          <TableCell width={130}>
                            <ButtonContainer>
                              <MuiIconButton
                                color="cyan"
                                onClick={() => handleView(room.id)}
                                title="View"
                              >
                                <RemoveRedEye />
                              </MuiIconButton>
                            </ButtonContainer>
                          </TableCell>
                          <TableCell>
                            {(currentPage - 1) * PER_PAGE + index + 1}
                          </TableCell>
                          <TableCell>{room.name || "-"}</TableCell>
                          <TableCell>{room.capacity || "-"}</TableCell>
                          <TableCell>{room.studio?.name || "-"}</TableCell>
                          <TableCell>{room.studio?.location || "-"}</TableCell>
                          <TableCell>
                            {formatDate("MM-dd-yyyy", room.createdAt)}
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
              {currentList.length > 0 && (
                <StyledTableFooter>
                  <Typography variant="h6">
                    Showing {(currentPage - 1) * PER_PAGE + 1}-
                    {Math.min(currentPage * PER_PAGE, studioLists?.length)} of{" "}
                    {studioLists?.length} items
                  </Typography>
                  <Pagination
                    count={Math.ceil(studioLists?.length / PER_PAGE)}
                    page={currentPage}
                    variant="outlined"
                    shape="rounded"
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

  const studioRoomList = await getStudioRoomList(user.token);

  return {
    props: {
      studioRoomList: studioRoomList
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
