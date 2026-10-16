import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Grid, Typography, Button } from "@mui/material";
import { capitalizeFirstLetter } from "@/utils/helpers";

export default function StudioInfo({ data }) {
  const router = useRouter();
  const [room, setRoom] = useState({});

  useEffect(() => {
    setRoom(data || {});
  }, [data]);

  return (
    <Container>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Room Name</strong>
        </Grid>
        <Grid item>
          <Typography>{room?.name || "-"}</Typography>
        </Grid>
      </Grid>

      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Capacity</strong>
        </Grid>
        <Grid item>
          <Typography>{room?.capacity || "-"}</Typography>
        </Grid>
      </Grid>

      {room?.studio ? (
        <>
          <SectionTitle variant="h6" sx={{ mt: 4, mb: 2 }}>
            Studio Details
          </SectionTitle>

          <Grid container className="info-row">
            <Grid item xs={5}>
              <strong>Name</strong>
            </Grid>
            <Grid item>
              <Typography>{room.studio.name || "-"}</Typography>
            </Grid>
          </Grid>

          <Grid container className="info-row">
            <Grid item xs={5}>
              <strong>Location</strong>
            </Grid>
            <Grid item>
              <Typography>{room.studio.location || "-"}</Typography>
            </Grid>
          </Grid>

          <Grid container className="info-row">
            <Grid item xs={5}>
              <strong>Approval Status</strong>
            </Grid>
            <Grid item>
              <Typography>
                {capitalizeFirstLetter(room.studio.approvalStatus) || "-"}
              </Typography>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          No Studio Details
        </Typography>
      )}

      {room?.studio?.creator ? (
        <>
          <SectionTitle variant="h6" sx={{ mt: 4, mb: 2 }}>
            Creator Details
          </SectionTitle>

          <Grid container className="info-row">
            <Grid item xs={5}>
              <strong>Name</strong>
            </Grid>
            <Grid item>
              <Typography>
                {capitalizeFirstLetter(room.studio.creator.name)}
              </Typography>
            </Grid>
          </Grid>

          <Grid container className="info-row">
            <Grid item xs={5}>
              <strong>Email</strong>
            </Grid>
            <Grid item>
              <Typography>{room.studio.creator.email}</Typography>
            </Grid>
          </Grid>

          <Grid container className="info-row">
            <Grid item xs={5}>
              <strong>Phone</strong>
            </Grid>
            <Grid item>
              <Typography>{room.studio.creator.phone}</Typography>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          No Creator Details
        </Typography>
      )}

      <ActionContainer>
        <Button
          variant="containedSecondary"
          onClick={() =>
            router.push(`/admin/studio-room-management/list-studio-room`)
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

const SectionTitle = styled(Typography)`
  && {
    font-weight: 600;
  }
`;
