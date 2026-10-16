import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Grid, Typography, Avatar, Button } from "@mui/material";
import { capitalizeFirstLetter } from "@/utils/helpers";

export default function StudioInfo({ data }) {
  const router = useRouter();
  const [studio, setStudio] = useState({});

  useEffect(() => {
    setStudio(data || {});
  }, [data]);

  return (
    <Container>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Studio Name</strong>
        </Grid>
        <Grid item>
          <Typography>{studio?.name || "-"}</Typography>
        </Grid>
      </Grid>

      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Description</strong>
        </Grid>
        <Grid item>
          <Typography>{studio?.description || "-"}</Typography>
        </Grid>
      </Grid>

      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Location</strong>
        </Grid>
        <Grid item>
          <Typography>{studio?.location || "-"}</Typography>
        </Grid>
      </Grid>

      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Approval Status</strong>
        </Grid>
        <Grid item>
          <Typography>
            {capitalizeFirstLetter(studio?.approvalStatus) || "-"}
          </Typography>
        </Grid>
      </Grid>

      {studio?.logoUrl && (
        <Grid container className="info-row">
          <Grid item xs={5}>
            <strong>Logo</strong>
          </Grid>
          <Grid item>
            <Avatar
              src={studio.logoUrl}
              alt={studio.name}
              sx={{ width: 56, height: 56 }}
            />
          </Grid>
        </Grid>
      )}

      {studio?.creator && (
        <>
          <SectionTitle variant="h6" sx={{ mt: 4, mb: 2 }}>
            Practitioner Details
          </SectionTitle>

          <Grid container className="info-row">
            <Grid item xs={5}>
              <strong>Name</strong>
            </Grid>
            <Grid item>
              <Typography>{studio.creator.name}</Typography>
            </Grid>
          </Grid>

          <Grid container className="info-row">
            <Grid item xs={5}>
              <strong>Email</strong>
            </Grid>
            <Grid item>
              <Typography>{studio.creator.email}</Typography>
            </Grid>
          </Grid>

          <Grid container className="info-row">
            <Grid item xs={5}>
              <strong>Phone</strong>
            </Grid>
            <Grid item>
              <Typography>{studio.creator.phone}</Typography>
            </Grid>
          </Grid>
        </>
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
