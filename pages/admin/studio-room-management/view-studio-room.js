import Head from "next/head";
import { getSession } from "next-auth/react";
import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";
import Breadcrumb from "@/components/common/Breadcrumb";
import DashboardLayout from "@/components/common/Layout";
import PageTitle from "@/components/common/PageTitle";
import InnerContent from "@/components/presentation/InnerContent";
import ThemeProvider from "@/theme/ThemeProvider";
import { withAuth } from "@/utils/withAuth";
import StudioRoomInfo from "@/components/detailPages/StudioRoomInfo";
import { getStudioRoomDetail } from "@/utils/api/studio-room-management";

export default function ViewStudioRoom({ studioRoomList }) {
  return (
    <ThemeProvider>
      <Head>
        <title>Dotsquares Wellness - View Studio Room</title>
        <meta
          name="description"
          content="Dotsquares Wellness - View Studio Room"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
        <PageTitle title="Studio Room Details" subtitle="">
          <Breadcrumb />
        </PageTitle>
        <InnerContent>
          <Paper elevation={0}>
            <Heading sx={{ p: 4 }}>
              <Typography variant="h2">View Studio Room</Typography>
            </Heading>
            <StudioRoomInfo data={studioRoomList?.data} />
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

  const studioRoomList = await getStudioRoomDetail(query.id, user.token);

  return {
    props: {
      studioRoomList: studioRoomList
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
