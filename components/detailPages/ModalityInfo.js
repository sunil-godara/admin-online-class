import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Grid, Button, Typography } from "@mui/material";
import { formatDate } from "@/utils/helpers";

export default function ModalityInfo({ data }) {
  const router = useRouter();
  const [modularity, setModularity] = useState({});

  useEffect(() => {
    setModularity(data || {});
  }, [data]);

  return (
    <Container>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Name</strong>
        </Grid>
        <Grid item xs={7}>
          <Typography>{modularity.name || "-"}</Typography>
        </Grid>
      </Grid>

      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Description</strong>
        </Grid>
        <Grid item xs={7}>
          <Typography>{modularity.description || "-"}</Typography>
        </Grid>
      </Grid>

      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Created Date</strong>
        </Grid>
        <Grid item xs={7}>
          <Typography>
            {formatDate("MM/dd/yyyy", modularity?.createdAt)}
          </Typography>
        </Grid>
      </Grid>

      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Status</strong>
        </Grid>
        <Grid item xs={7}>
          <Typography>
            {modularity.status === "1" ? "Active" : "Inactive"}
          </Typography>
        </Grid>
      </Grid>

      <ActionContainer>
        <Button
          variant="containedSecondary"
          onClick={() =>
            router.push(`/admin/modalities-management/list-modality`)
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
