import Head from "next/head";
import { getSession } from "next-auth/react";
import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";
import Breadcrumb from "@/components/common/Breadcrumb";
import DashboardLayout from "@/components/common/Layout";
import PageTitle from "@/components/common/PageTitle";
import AddEditLegalContentForm from "@/components/form/AddEditLegalContent";
import InnerContent from "@/components/presentation/InnerContent";
import ThemeProvider from "@/theme/ThemeProvider";
import { getContentDetail } from "@/utils/api/content-management";
import { withAuth } from "@/utils/withAuth";

export default function EditLegalContent({ contentDetails }) {
  return (
    <ThemeProvider>
      <Head>
        <title>Dotsquares Wellness - Edit Legal Content</title>
        <meta
          name="description"
          content="Dotsquares Wellness - Edit Legal Content"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
        <PageTitle title="Legal Content Details" subtitle="">
          <Breadcrumb />
        </PageTitle>
        <InnerContent>
          <Paper elevation={0}>
            <Heading sx={{ p: 4 }}>
              <Typography variant="h2">Edit Legal Content</Typography>
            </Heading>
            <AddEditLegalContentForm contentDetails={contentDetails} />
          </Paper>
        </InnerContent>
      </DashboardLayout>
    </ThemeProvider>
  );
}

export const getServerSideProps = withAuth(async context => {
  const query = { ...context.query };

  const session = await getSession(context);

  const {
    user: { token }
  } = session;

  const contentDetails = await getContentDetail(query.id, token);

  return {
    props: {
      contentDetails: contentDetails
    }
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
