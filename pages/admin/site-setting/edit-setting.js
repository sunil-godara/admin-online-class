import Head from "next/head";
import { getSession } from "next-auth/react";
import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";
import Breadcrumb from "@/components/common/Breadcrumb";
import DashboardLayout from "@/components/common/Layout";
import PageTitle from "@/components/common/PageTitle";
import SiteSettingForm from "@/components/form/editSetting";
import InnerContent from "@/components/presentation/InnerContent";
import ThemeProvider from "@/theme/ThemeProvider";
import { getSettingDetail } from "@/utils/api/setting";
import { withAuth } from "@/utils/withAuth";

export default function EditSetting({ settingDetails }) {
  return (
    <ThemeProvider>
      <Head>
        <title>Dotsquares Wellness - Edit Site Setting</title>
        <meta
          name="description"
          content="Dotsquares Wellness - Edit Site Setting"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DashboardLayout>
        <PageTitle title="Site Setting Details" subtitle="">
          <Breadcrumb />
        </PageTitle>

        <InnerContent>
          <Paper elevation={0}>
            <Heading sx={{ p: 4 }}>
              <Typography variant="h2">Edit Setting</Typography>
            </Heading>

            {settingDetails ? (
              <SiteSettingForm settingDetails={settingDetails} />
            ) : (
              <Typography variant="body1" sx={{ p: 4 }}>
                Setting not found or failed to load.
              </Typography>
            )}
          </Paper>
        </InnerContent>
      </DashboardLayout>
    </ThemeProvider>
  );
}

export const getServerSideProps = withAuth(async context => {
  const { query } = context;
  const session = await getSession(context);
  const { user } = session;

  const settingDetails = await getSettingDetail(query.id, user.token);

  return {
    props: {
      settingDetails
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
