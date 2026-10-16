import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Grid, Button, Typography } from "@mui/material";
import { formatDate, capitalizeFirstLetter } from "@/utils/helpers";

export default function UserInfo({ data }) {
  const router = useRouter();
  const [user, setUser] = useState({});

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
          <strong>Created Date</strong>
        </Grid>
        <Grid item>
          <Typography>{formatDate("MM/dd/yyyy", user?.createdAt)}</Typography>
        </Grid>
      </Grid>

      <ActionContainer>
        <Button
          variant="containedSecondary"
          onClick={() => router.push(`/admin/user-management/list-user`)}
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
