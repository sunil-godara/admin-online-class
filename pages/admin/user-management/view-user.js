import Head from "next/head";
import { getSession } from "next-auth/react";
import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";
import Breadcrumb from "@/components/common/Breadcrumb";
import DashboardLayout from "@/components/common/Layout";
import PageTitle from "@/components/common/PageTitle";
import UserInfo from "@/components/detailPages/UserInfo";
import InnerContent from "@/components/presentation/InnerContent";
import ThemeProvider from "@/theme/ThemeProvider";
import { getUsersDetail } from "@/utils/api/user-management";
import { withAuth } from "@/utils/withAuth";

export default function ViewUser({ userDetails }) {
  return (
    <ThemeProvider>
      <Head>
        <title>Dotsquares Wellness - View User</title>
        <meta name="description" content="Dotsquares Wellness - View User" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
        <PageTitle title="User Details" subtitle="">
          <Breadcrumb />
        </PageTitle>
        <InnerContent>
          <Paper elevation={0}>
            <Heading sx={{ p: 4 }}>
              <Typography variant="h2">View User</Typography>
            </Heading>
            <UserInfo data={userDetails.data} />
          </Paper>
        </InnerContent>
      </DashboardLayout>
    </ThemeProvider>
  );
}

export const getServerSideProps = withAuth(async context => {
  const query = { ...context.query };

  const session = await getSession(context);
  const { user } = session;

  const userDetails = await getUsersDetail(query.id, user.token);

  return {
    props: {
      userDetails: userDetails
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
