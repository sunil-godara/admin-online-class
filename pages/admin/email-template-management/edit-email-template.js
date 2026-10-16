import Head from "next/head";
import { getSession } from "next-auth/react";
import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";
import Breadcrumb from "@/components/common/Breadcrumb";
import DashboardLayout from "@/components/common/Layout";
import PageTitle from "@/components/common/PageTitle";
import EmailTemplateForm from "@/components/form/EmailTemplateForm";
import InnerContent from "@/components/presentation/InnerContent";
import ThemeProvider from "@/theme/ThemeProvider";
import { getEmailTemplateDetail } from "@/utils/api/email-templates";
import { withAuth } from "@/utils/withAuth";

export default function EditEmailTemplate({ templateDetails }) {
  return (
    <ThemeProvider>
      <Head>
        <title>Edutech - EFFICIENT, EFFECTIVE, ETHICAL</title>
        <meta
          name="description"
          content="Edutech - EFFICIENT, EFFECTIVE, ETHICAL"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
        <PageTitle title="Email Templates" subtitle="">
          <Breadcrumb />
        </PageTitle>
        <InnerContent>
          <Paper elevation={0}>
            <Heading sx={{ p: 4 }}>
              <Typography variant="h2">Edit Email Template</Typography>
            </Heading>
            <EmailTemplateForm templateDetails={templateDetails} />
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

  const templateDetails = await getEmailTemplateDetail(query.id, token);

  return {
    props: {
      templateDetails: templateDetails
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
