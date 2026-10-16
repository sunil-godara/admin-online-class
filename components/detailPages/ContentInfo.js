import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { formatDate, capitalizeFirstLetter } from "@/utils/helpers";

export default function ContentInfo({ data }) {
  const router = useRouter();
  const information = data;

  return (
    <Container>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Title</strong>
        </Grid>
        <Grid item>
          <Typography>{capitalizeFirstLetter(information.title)}</Typography>
        </Grid>
      </Grid>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Content</strong>
        </Grid>
        <Grid item xs={7}>
          <div
            dangerouslySetInnerHTML={{ __html: information.content }}
            className="box bg-light-info"
          ></div>
        </Grid>
      </Grid>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Status</strong>
        </Grid>
        <Grid item>
          <Typography>
            {information.status == 0 ? "In Active" : "Active"}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Is Published</strong>
        </Grid>
        <Grid item>
          <Typography>
            {information.isPublish == 0 ? "Unpublished" : "Published"}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Created At</strong>
        </Grid>
        <Grid item>
          <Typography>
            {formatDate("mm-dd-yyyy", information.createdAt)}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className="info-row">
        <Grid item xs={5}>
          <strong>Updated At</strong>
        </Grid>
        <Grid item>
          <Typography>
            {formatDate("mm-dd-yyyy", information.updatedAt)}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <ActionContainer>
        <Button
          variant="containedSecondary"
          onClick={() => router.push("/admin/content-management/list-content")}
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
