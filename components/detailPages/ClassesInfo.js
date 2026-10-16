import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Grid, Button, Typography } from "@mui/material";
import { formatDate, capitalizeFirstLetter } from "@/utils/helpers";

export default function ClassesInfo({ data }) {
  const router = useRouter();
  const [classes, setClasses] = useState({});

  useEffect(() => {
    setClasses(data || {});
  }, [data]);

  return (
    <Container>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Title</strong>
        </Grid>
        <Grid item>
          <Typography>{classes?.title || "-"}</Typography>
        </Grid>
      </Grid>

      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Description</strong>
        </Grid>
        <Grid item>
          <Typography>{classes?.description || "-"}</Typography>
        </Grid>
      </Grid>

      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Tags</strong>
        </Grid>
        <Grid item>
          <Typography>{classes?.tags || "-"}</Typography>
        </Grid>
      </Grid>

      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Location</strong>
        </Grid>
        <Grid item>
          <Typography>{classes?.location || "-"}</Typography>
        </Grid>
      </Grid>

      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Date & Time</strong>
        </Grid>
        <Grid item>
          <Typography>
            {classes?.dateTime
              ? formatDate("MM/dd/yyyy hh:mm a", classes.dateTime)
              : "-"}
          </Typography>
        </Grid>
      </Grid>

      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Duration</strong>
        </Grid>
        <Grid item>
          <Typography>
            {classes?.durationMins ? `${classes.durationMins} mins` : "-"}
          </Typography>
        </Grid>
      </Grid>

      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Capacity</strong>
        </Grid>
        <Grid item>
          <Typography>{classes?.capacity || "-"}</Typography>
        </Grid>
      </Grid>

      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Price</strong>
        </Grid>
        <Grid item>
          <Typography>{classes?.price ? `$${classes.price}` : "-"}</Typography>
        </Grid>
      </Grid>

      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Resource Links</strong>
        </Grid>
        <Grid item>
          <Typography>
            {classes?.resourceLinks ? (
              <a
                href={classes.resourceLinks}
                target="_blank"
                rel="noopener noreferrer"
              >
                {classes.resourceLinks}
              </a>
            ) : (
              "-"
            )}
          </Typography>
        </Grid>
      </Grid>

      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Modalities</strong>
        </Grid>
        <Grid item>
          <Typography>
            {classes.classModalities && classes.classModalities.length > 0
              ? classes.classModalities.map(m => m.modality?.name).join(", ")
              : "-"}
          </Typography>
        </Grid>
      </Grid>

      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Commission Rate</strong>
        </Grid>
        <Grid item>
          <Typography>
            {classes?.commissionRateOverride
              ? `${classes.commissionRateOverride}%`
              : "-"}
          </Typography>
        </Grid>
      </Grid>

      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Created Date</strong>
        </Grid>
        <Grid item>
          <Typography>
            {classes?.createdAt
              ? formatDate("MM-dd-yyyy", classes.createdAt)
              : "-"}
          </Typography>
        </Grid>
      </Grid>

      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Approval Status</strong>
        </Grid>
        <Grid item>
          <Typography>
            {capitalizeFirstLetter(classes?.approvalStatus) || "-"}
          </Typography>
        </Grid>
      </Grid>

      {classes.practitioner ? (
        <>
          <SectionTitle variant="h6" sx={{ mt: 4, mb: 2 }}>
            Practitioner Details
          </SectionTitle>

          <Grid container className="info-row">
            <Grid item xs={5}>
              <strong>Name</strong>
            </Grid>
            <Grid item>
              <Typography>
                {capitalizeFirstLetter(classes.practitioner.name)}
              </Typography>
            </Grid>
          </Grid>

          <Grid container className="info-row">
            <Grid item xs={5}>
              <strong>Email</strong>
            </Grid>
            <Grid item>
              <Typography>{classes.practitioner.email}</Typography>
            </Grid>
          </Grid>

          <Grid container className="info-row">
            <Grid item xs={5}>
              <strong>Phone</strong>
            </Grid>
            <Grid item>
              <Typography>{classes.practitioner.phone}</Typography>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          No Practitioner Details
        </Typography>
      )}
      {classes.studio ? (
        <>
          <SectionTitle variant="h6" sx={{ mt: 4, mb: 2 }}>
            Studio Details
          </SectionTitle>

          <Grid container className="info-row">
            <Grid item xs={5}>
              <strong>Name</strong>
            </Grid>
            <Grid item>
              <Typography>{classes.studio.name}</Typography>
            </Grid>
          </Grid>

          <Grid container className="info-row">
            <Grid item xs={5}>
              <strong>Location</strong>
            </Grid>
            <Grid item>
              <Typography>{classes.studio.location}</Typography>
            </Grid>
          </Grid>

          <Grid container className="info-row">
            <Grid item xs={5}>
              <strong>Approval Status</strong>
            </Grid>
            <Grid item>
              <Typography>
                {capitalizeFirstLetter(classes.studio.approvalStatus)}
              </Typography>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          No Studio Details
        </Typography>
      )}

      {classes.room ? (
        <>
          <SectionTitle variant="h6" sx={{ mt: 4, mb: 2 }}>
            Room Details
          </SectionTitle>

          <Grid container className="info-row">
            <Grid item xs={5}>
              <strong>Name</strong>
            </Grid>
            <Grid item>
              <Typography>{classes.room.name}</Typography>
            </Grid>
          </Grid>

          <Grid container className="info-row">
            <Grid item xs={5}>
              <strong>Capacity</strong>
            </Grid>
            <Grid item>
              <Typography>{classes.room.capacity}</Typography>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          No Room Details
        </Typography>
      )}

      <ActionContainer>
        <Button variant="containedSecondary" onClick={() => router.back()}>
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

const SectionTitle = styled(Typography)`
  && {
    font-weight: 600;
  }
`;
