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
  Backdrop,
  Select,
  MenuItem
} from "@mui/material";
import { Delete, RemoveRedEye } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import Breadcrumb from "@/components/common/Breadcrumb";
import DashboardLayout from "@/components/common/Layout";
import PageTitle from "@/components/common/PageTitle";
import Switch from "@/components/common/Switch";
import MuiIconButton from "@/components/presentation/MuiIconButton";
import InnerContent from "@/components/presentation/InnerContent";
import ThemeProvider from "@/theme/ThemeProvider";
import {
  capitalizeFirstLetter,
  formatDate,
  getConfig,
  showAlert
} from "@/utils/helpers";
import { Store } from "@/utils/store";
import { withAuth } from "@/utils/withAuth";
import {
  deletePractitioner,
  getPractitionerList,
  updatePractitionerApprovalStatus,
  updatePractitionerCommission,
  updatePractitionerStatus
} from "@/utils/api/practitioner-management";

export default function ListPractitioner({ practitionerList, settings }) {
  const store = Store();
  const PER_PAGE = getConfig(settings, "ADMIN_PAGE_LIMIT");
  const [practitionerLists, setPractitionerLists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentList, setCurrentList] = useState([]);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [editCommissionId, setEditCommissionId] = useState(null);
  const [commissionRate, setCommissionRate] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (practitionerList?.status) {
      handlePractitionerData(practitionerList.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCommissionSave = async pract => {
    if (!commissionRate) return;
    try {
      setLoading(true);
      const response = await updatePractitionerCommission({
        profileId: pract.practitionerProfile.id,
        commissionRate: parseFloat(commissionRate)
      });
      if (response.status) {
        const updatedList = practitionerLists.map(p =>
          p.id === pract.id
            ? {
                ...p,
                practitionerProfile: {
                  ...p.practitionerProfile,
                  commissionRate: response.data.commissionRate
                }
              }
            : p
        );
        handlePractitionerData(updatedList);
        setEditCommissionId(null);
        setCommissionRate("");
        store.setSnackbarDetails({
          status: true,
          message: "Commission updated successfully",
          color: "success",
          vertical: "top",
          horizontal: "right"
        });
      } else {
        throw new Error(response.message || "Something went wrong");
      }
    } catch (err) {
      store.setSnackbarDetails({
        status: true,
        message: err.message,
        color: "error",
        vertical: "top",
        horizontal: "right"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePractitionerData = data => {
    const pageNumber = 1;
    const allPractitioners = Array.isArray(data) ? data : [];
    const moreLists = allPractitioners.slice(
      (pageNumber - 1) * PER_PAGE,
      pageNumber * PER_PAGE
    );
    setCurrentPage(pageNumber);
    setCurrentList(moreLists);
    setPractitionerLists(allPractitioners);
  };

  const handlePageChange = (event, page) => {
    event.preventDefault();
    const pageNumber = page;
    const moreLists = practitionerLists.slice(
      (pageNumber - 1) * PER_PAGE,
      pageNumber * PER_PAGE
    );
    setCurrentPage(pageNumber);
    setCurrentList(moreLists);
  };

  const handleSearch = () => {
    setLoading(true);
    let filtered = practitionerLists;
    if (searchKeywords) {
      const keyword = searchKeywords.toLowerCase();

      filtered = practitionerLists.filter(pract => {
        const nameMatch =
          pract.name && pract.name.toLowerCase().includes(keyword);

        const modalityNames =
          pract.practitionerModalities
            ?.map(pracModality => pracModality.modality?.name?.toLowerCase())
            .filter(Boolean)
            .join(", ") || "";

        const modalitiesMatch = modalityNames.includes(keyword);

        const locationMatch =
          pract.practitionerProfile?.location &&
          pract.practitionerProfile.location.toLowerCase().includes(keyword);

        return nameMatch || modalitiesMatch || locationMatch;
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
    setCurrentList(practitionerLists.slice(0, PER_PAGE));
    setLoading(false);
  };

  const updateStatus = async (event, prac_id, currentStatus) => {
    event.preventDefault();

    const newStatus = currentStatus === "1" ? "0" : "1";
    const reason =
      newStatus === "0" ? "Practitioner deactivated" : "Reactivated by admin";

    try {
      setLoading(true);

      const response = await updatePractitionerStatus({
        userId: prac_id,
        status: newStatus,
        reason
      });

      if (response.status) {
        handlePractitionerData(response.data);

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

  const handleDelete = async user_id => {
    const response = await deletePractitioner({
      userId: user_id
    });

    if (response.status) {
      handlePractitionerData(response.data);
    }

    return response;
  };

  const handleDeleteAlert = id => {
    showAlert("You want to delete this practitioner?", handleDelete, id);
  };

  const handleView = id => {
    router.push({
      pathname: "/admin/practitioner-management/view-practitioner",
      query: { id: id }
    });
  };

  const updateApprovalAction = async (status, profileId) => {
    try {
      setLoading(true);
      const response = await updatePractitionerApprovalStatus({
        profileId: profileId,
        approvalStatus: status
      });

      if (response.status) {
        const updatedProfile = response.data;

        const updatedList = practitionerLists.map(pract =>
          pract.id === updatedProfile.user.id
            ? {
                ...pract,
                ...updatedProfile.user,
                practitionerProfile: {
                  ...pract.practitionerProfile,
                  ...updatedProfile
                },
                modalities: updatedProfile.modalities || []
              }
            : pract
        );

        handlePractitionerData(updatedList);
      } else {
        throw new Error(response.message || "Something went wrong");
      }
    } catch (err) {
      store.setSnackbarDetails({
        status: true,
        message: err.message,
        color: "error",
        vertical: "top",
        horizontal: "right"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <Head>
        <title>Dotsquares Wellness - List Practitioners</title>
        <meta
          name="description"
          content="Dotsquares Wellness - List Practitioners"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
        <PageTitle title="Practitioner Management" subtitle="">
          <Breadcrumb />
        </PageTitle>
        <InnerContent>
          <Paper elevation={0}>
            <Heading sx={{ p: 4 }}>
              <Typography variant="h2">Practitioners</Typography>
            </Heading>
            <Action>
              <SearchAction>
                <TextField
                  id="outlined-basic"
                  label="Search"
                  helperText="Search by name, modality, or location"
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
                <Table sx={{ minWidth: 650 }} aria-label="practitioner table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Action</TableCell>
                      <TableCell>#</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Modalities</TableCell>
                      <TableCell>Created Date</TableCell>
                      <TableCell>Commission</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Approval</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentList.length > 0 ? (
                      currentList.map((pract, index) => (
                        <TableRow key={pract.id}>
                          <TableCell width={130}>
                            <ButtonContainer>
                              <MuiIconButton
                                color="cyan"
                                onClick={() => handleView(pract.id)}
                                title="View"
                              >
                                <RemoveRedEye />
                              </MuiIconButton>
                              <MuiIconButton
                                color="darkRed"
                                onClick={() => handleDeleteAlert(pract.id)}
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
                            {capitalizeFirstLetter(pract.name)}
                          </TableCell>
                          <TableCell>{pract.email}</TableCell>
                          <TableCell>{pract.phone}</TableCell>
                          <TableCell>
                            {pract.practitionerModalities?.length > 0
                              ? pract.practitionerModalities
                                  .map(pm => pm.modality?.name)
                                  .filter(Boolean)
                                  .join(", ")
                              : "-"}
                          </TableCell>
                          <TableCell>
                            {formatDate("MM-dd-yyyy", pract.createdAt)}
                          </TableCell>
                          <TableCell>
                            {editCommissionId === pract.id ? (
                              <>
                                <TextField
                                  type="number"
                                  size="small"
                                  variant="outlined"
                                  inputProps={{ min: 0, step: 0.01 }}
                                  value={commissionRate}
                                  onChange={e =>
                                    setCommissionRate(e.target.value)
                                  }
                                  sx={{ width: 60, mr: 1 }}
                                />
                                <IconButton
                                  size="small"
                                  disabled={loading}
                                  onClick={() => handleCommissionSave(pract)}
                                  sx={{ color: "#1976d2", p: "4px" }}
                                >
                                  <CheckIcon />
                                </IconButton>
                              </>
                            ) : (
                              <>
                                {pract.practitionerProfile?.commissionRate
                                  ? `${pract.practitionerProfile.commissionRate}%`
                                  : "-"}
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    setEditCommissionId(pract.id);
                                    setCommissionRate(
                                      pract.practitionerProfile
                                        ?.commissionRate || ""
                                    );
                                  }}
                                  sx={{ color: "#1976d2", ml: 1, p: "4px" }}
                                >
                                  <EditIcon />
                                </IconButton>
                              </>
                            )}
                          </TableCell>
                          <TableCell>
                            <Switch
                              id={`pract_status_${pract.id}`}
                              checked={pract.status === "1"}
                              disabled={loading}
                              handleChange={event =>
                                updateStatus(event, pract.id, pract.status)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Select
                              value={
                                pract?.practitionerProfile?.approvalStatus || ""
                              }
                              onChange={e =>
                                updateApprovalAction(
                                  e.target.value,
                                  pract?.practitionerProfile?.id
                                )
                              }
                              size="small"
                              disabled={loading}
                              displayEmpty
                            >
                              <MenuItem value="" disabled>
                                Select
                              </MenuItem>
                              <MenuItem value="approved">Approved</MenuItem>
                              <MenuItem value="rejected">Rejected</MenuItem>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={10} align="center">
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
                    {Math.min(
                      currentPage * PER_PAGE,
                      practitionerLists?.length
                    )}{" "}
                    of {practitionerLists?.length} items
                  </Typography>
                  <Pagination
                    count={Math.ceil(practitionerLists?.length / PER_PAGE)}
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

  const practitionerList = await getPractitionerList(user.token);

  return {
    props: {
      practitionerDetails: user,
      practitionerList: practitionerList
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
