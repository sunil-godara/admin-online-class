import { useEffect, useState } from "react";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import {
  Backdrop,
  Button,
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
import { Edit } from "@mui/icons-material";
import Breadcrumb from "@/components/common/Breadcrumb";
import DashboardLayout from "@/components/common/Layout";
import PageTitle from "@/components/common/PageTitle";
import InnerContent from "@/components/presentation/InnerContent";
import MuiIconButton from "@/components/presentation/MuiIconButton";
import ThemeProvider from "@/theme/ThemeProvider";
import { getAllSettings } from "@/utils/api/setting";
import { capitalizeFirstLetter, formatDate, getConfig } from "@/utils/helpers";
import { withAuth } from "@/utils/withAuth";

export default function SettingList({
  settingDataList,
  settings,
  userDetails
}) {
  const router = useRouter();
  const PER_PAGE = getConfig(settings, "ADMIN_PAGE_LIMIT");
  const [settingList, setSettingList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentList, setCurrentList] = useState([]);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSettingData = data => {
    const pageNumber = 1;
    const allDocuments = Array.isArray(data) ? data : [];

    const moreLists = allDocuments.slice(
      (pageNumber - 1) * PER_PAGE,
      pageNumber * PER_PAGE
    );

    setCurrentPage(pageNumber);
    setCurrentList(moreLists);
    setSettingList(allDocuments);
  };

  useEffect(() => {
    if (settingDataList && Array.isArray(settingDataList.data)) {
      handleSettingData(settingDataList.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingDataList]);

  const handlePageChange = (event, page) => {
    event.preventDefault();

    const pageNumber = page;
    const moreLists = [...settingList].slice(
      (pageNumber - 1) * PER_PAGE,
      pageNumber * PER_PAGE
    );

    setCurrentPage(pageNumber);
    setCurrentList(moreLists);
  };

  const handleSearch = async () => {
    setLoading(true);

    if (searchKeywords.trim()) {
      const keyword = searchKeywords.toLowerCase();

      const filteredData = settingList.filter(
        setting =>
          setting.slug.toLowerCase().includes(keyword) ||
          setting.title.toLowerCase().includes(keyword)
      );

      handleSettingData(filteredData);
    } else {
      handleSettingData(settingList);
    }

    setLoading(false);
  };

  const handleReset = async () => {
    setLoading(true);
    setSearchKeywords("");
    const response = await getAllSettings(userDetails.token);

    if (response && response.status) {
      handleSettingData(response.data);
    }
    setLoading(false);
  };

  const handleEdit = id => {
    router.push({
      pathname: "/admin/site-setting/edit-setting",
      query: { id }
    });
  };

  return (
    <ThemeProvider>
      <Head>
        <title>Dotsquares Wellness - Site Setting</title>
        <meta name="description" content="Dotsquares Wellness - Site Setting" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
        <PageTitle title="Site Settings Management" subtitle="">
          <Breadcrumb />
        </PageTitle>
        <InnerContent>
          <Paper elevation={0}>
            <Heading sx={{ p: 4 }}>
              <Typography variant="h2">Site Settings</Typography>
            </Heading>
            <Action>
              <SearchAction>
                <TextField
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                  size="small"
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
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Action</TableCell>
                      <TableCell>#</TableCell>
                      <TableCell>Setting Key</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Setting Value</TableCell>
                      <TableCell>Updated Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentList.length > 0 ? (
                      currentList.map((setting, index) => (
                        <TableRow key={index}>
                          <TableCell width={50}>
                            <ButtonContainer>
                              <MuiIconButton
                                color="purple"
                                onClick={() => handleEdit(setting.id)}
                                title="Edit"
                              >
                                <Edit />
                              </MuiIconButton>
                            </ButtonContainer>
                          </TableCell>
                          <TableCell>
                            {(currentPage - 1) * PER_PAGE + index + 1}
                          </TableCell>
                          <TableCell>{setting.slug}</TableCell>
                          <TableCell>
                            {capitalizeFirstLetter(setting.title)}
                          </TableCell>
                          <TableCell>{setting.configValue}</TableCell>
                          <TableCell>
                            {formatDate("MM-dd-yyyy", setting.updatedAt)}
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
              {currentList.length > 0 && (
                <TableFooter>
                  <Typography variant="h6">
                    Showing {(currentPage - 1) * PER_PAGE}-
                    {currentPage * PER_PAGE} of {settingList.length} items
                  </Typography>
                  <Pagination
                    count={Math.ceil(settingList.length / PER_PAGE)}
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

  const settingData = await getAllSettings(user.token);

  return {
    props: {
      userDetails: user,
      settingDataList: settingData || []
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
  ${() => `
    display: flex;
    align-items: center;
    justify-content: flex-start;
`}
`;
