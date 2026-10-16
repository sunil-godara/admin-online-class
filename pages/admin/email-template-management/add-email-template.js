import Head from "next/head";
import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";
import Breadcrumb from "@/components/common/Breadcrumb";
import DashboardLayout from "@/components/common/Layout";
import PageTitle from "@/components/common/PageTitle";
import EmailTemplateForm from "@/components/form/EmailTemplateForm";
import InnerContent from "@/components/presentation/InnerContent";
import ThemeProvider from "@/theme/ThemeProvider";
import { withAuth } from "@/utils/withAuth";

export default function AddEmailTemplate() {
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
              <Typography variant="h2">Add Email Template</Typography>
            </Heading>
            <EmailTemplateForm />
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
