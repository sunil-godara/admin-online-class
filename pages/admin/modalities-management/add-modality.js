import Head from "next/head";
import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";
import Breadcrumb from "@/components/common/Breadcrumb";
import DashboardLayout from "@/components/common/Layout";
import PageTitle from "@/components/common/PageTitle";
import AddEditModalityForm from "@/components/form/AddEditModalityForm";
import InnerContent from "@/components/presentation/InnerContent";
import ThemeProvider from "@/theme/ThemeProvider";
import { withAuth } from "@/utils/withAuth";

export default function AddModality() {
  return (
    <ThemeProvider>
      <Head>
        <title>Dotsquares Wellness - Add Modality</title>
        <meta name="description" content="Dotsquares Wellness - Add Modality" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
        <PageTitle title="Modality Details" subtitle="">
          <Breadcrumb />
        </PageTitle>
        <InnerContent>
          <Paper elevation={0}>
            <Heading sx={{ p: 4 }}>
              <Typography variant="h2">Add Modality</Typography>
            </Heading>
            <AddEditModalityForm />
          </Paper>
        </InnerContent>
      </DashboardLayout>
    </ThemeProvider>
  );
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {}
  };
});

const Heading = styled.div`
  ${({ theme }) => `
    padding: ${theme.spacing(3, 4)};
    border-bottom: 1px solid ${theme.colors.palette.lightGrey};

    h2 {
      font-size: 20px;

      @media (min-width: ${theme.breakpoints.values.md}px) {
        font-size: 24px;
      }
    }
  `}
`;
