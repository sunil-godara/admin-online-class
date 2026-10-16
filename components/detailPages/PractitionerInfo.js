import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import {
  Grid,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";
import MuiIconButton from "../presentation/MuiIconButton";
import { formatDate, capitalizeFirstLetter } from "@/utils/helpers";

export default function PractitionerInfo({
  data
  // handleDeleteClass,
  // handleDeleteStudio
}) {
  const router = useRouter();
  const [user, setUser] = useState({});

  // const handleDeleteClassAlert = id => {
  //   showAlert("Do you want to delete this class?", handleDeleteClass, id);
  // };

  // const handleDeleteStudioAlert = id => {
  //   showAlert("Do you want to delete this studio?", handleDeleteStudio, id);
  // };

  const handleViewClass = id => {
    router.push({
      pathname: "/admin/class-management/view-class",
      query: { id: id }
    });
  };

  const handleViewStudio = id => {
    router.push({
      pathname: "/admin/studio-management/view-studio",
      query: { id: id }
    });
  };

  useEffect(() => {
    setUser(data || {});
  }, [data]);

  return (
    <Container>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Name</strong>
        </Grid>
        <Grid item>
          <Typography>{capitalizeFirstLetter(user?.name)}</Typography>
        </Grid>
      </Grid>

      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Email</strong>
        </Grid>
        <Grid item>
          <Typography>{user?.email}</Typography>
        </Grid>
      </Grid>

      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Phone</strong>
        </Grid>
        <Grid item>
          <Typography>{user?.phone}</Typography>
        </Grid>
      </Grid>

      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Status</strong>
        </Grid>
        <Grid item>
          <Typography>
            {user?.status === "1" ? "Active" : "Inactive"}
          </Typography>
        </Grid>
      </Grid>

      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Registration Date</strong>
        </Grid>
        <Grid item>
          <Typography>{formatDate("MM/dd/yyyy", user?.createdAt)}</Typography>
        </Grid>
      </Grid>

      {user?.practitionerProfile && (
        <>
          <Grid container className="info-row">
            <Grid item xs={5}>
              <strong>Bio</strong>
            </Grid>
            <Grid item>
              <Typography>{user.practitionerProfile.bio || "-"}</Typography>
            </Grid>
          </Grid>

          <Grid container className="info-row">
            <Grid item xs={5}>
              <strong>Modalities</strong>
            </Grid>
            <Grid item>
              <Typography>
                {user.modalities && user.modalities.length > 0
                  ? user.modalities.map(mod => mod.name).join(", ")
                  : "-"}
              </Typography>
            </Grid>
          </Grid>

          <Grid container className="info-row">
            <Grid item xs={5}>
              <strong>Certifications</strong>
            </Grid>
            <Grid item>
              <Typography>
                {user.practitionerProfile.certifications || "-"}
              </Typography>
            </Grid>
          </Grid>

          <Grid container className="info-row">
            <Grid item xs={5}>
              <strong>Commission Rate</strong>
            </Grid>
            <Grid item xs={7}>
              <Typography>
                {user.practitionerProfile.commissionRate || "-"}%
              </Typography>
            </Grid>
          </Grid>

          <Grid container className="info-row">
            <Grid item xs={5}>
              <strong>Approval Status</strong>
            </Grid>
            <Grid item>
              <Typography>
                {capitalizeFirstLetter(user.practitionerProfile.approvalStatus)}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}

      {user?.studios?.length > 0 && (
        <>
          <SectionTitle variant="h6" sx={{ mt: 4, mb: 2 }}>
            Studio
          </SectionTitle>
          <TableWrapper>
            <TableContainer component={Paper} elevation={0}>
              <Table sx={{ minWidth: 650 }} aria-label="studio table">
                <TableHead>
                  <TableRow>
                    <TableCell>Action</TableCell>
                    <TableCell>#</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.studios.map((studio, index) => (
                    <TableRow key={studio.id}>
                      <TableCell width={130}>
                        <ButtonContainer>
                          <MuiIconButton
                            color="cyan"
                            onClick={() => handleViewStudio(studio.id)}
                            title="View"
                          >
                            <RemoveRedEye />
                          </MuiIconButton>
                          {/* <MuiIconButton
                            color="darkRed"
                            onClick={() => handleDeleteStudioAlert(studio.id)}
                            title="Delete"
                          >
                            <Delete />
                          </MuiIconButton> */}
                        </ButtonContainer>
                      </TableCell>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{studio.name}</TableCell>
                      <TableCell>{studio.location}</TableCell>
                      <TableCell>{studio.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TableWrapper>
        </>
      )}

      {user?.classes?.length > 0 && (
        <>
          <SectionTitle variant="h6" sx={{ mt: 4, mb: 2 }}>
            Classes
          </SectionTitle>
          <TableWrapper>
            <TableContainer component={Paper} elevation={0}>
              <Table sx={{ minWidth: 650 }} aria-label="classes table">
                <TableHead>
                  <TableRow>
                    <TableCell>Action</TableCell>
                    <TableCell>#</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Modality</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Date & Time</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Approval</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.classes && user.classes.length > 0 ? (
                    user.classes.map((classes, index) => (
                      <TableRow key={classes.id}>
                        <TableCell width={130}>
                          <ButtonContainer>
                            <MuiIconButton
                              color="cyan"
                              onClick={() => handleViewClass(classes.id)}
                              title="View"
                            >
                              <RemoveRedEye />
                            </MuiIconButton>
                            {/* <MuiIconButton
                              color="darkRed"
                              onClick={() => handleDeleteClassAlert(classes.id)}
                              title="Delete"
                            >
                              <Delete />
                            </MuiIconButton> */}
                          </ButtonContainer>
                        </TableCell>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{classes.title}</TableCell>
                        <TableCell>
                          {classes.classModalities?.length > 0
                            ? classes.classModalities
                                .map(m => m.modality?.name)
                                .join(", ")
                            : "-"}
                        </TableCell>
                        <TableCell>{classes.location}</TableCell>
                        <TableCell>
                          {formatDate("MM/dd/yyyy hh:mm a", classes.dateTime)}
                        </TableCell>
                        <TableCell>{classes.durationMins} mins</TableCell>
                        <TableCell>${classes.price}</TableCell>
                        <TableCell>
                          {capitalizeFirstLetter(classes.approvalStatus)}
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
          </TableWrapper>
        </>
      )}

      <ActionContainer>
        <Button
          variant="containedSecondary"
          onClick={() =>
            router.push(`/admin/practitioner-management/list-practitioner`)
          }
        >
          Back
        </Button>
      </ActionContainer>
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

const ButtonContainer = styled.div`
  ${() => `    display: flex;
    align-items: center;
    justify-content: flex-start;
`}
`;

const SectionTitle = styled(Typography)`
  && {
    font-weight: 600;
  }
`;
