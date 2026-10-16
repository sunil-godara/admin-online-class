import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import ThemeProvider from "@/theme/ThemeProvider";

export default function AccessDenied() {
  const router = useRouter();
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
      <Wrapper>
        <LogoContainer>
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo"
              aria-label="logo"
              priority
              unoptimized
              height={57}
              width={176}
            />
          </Link>
        </LogoContainer>
        <Image
          src="/403.png"
          height="300"
          width={400}
          alt="errorImage"
          priority
          unoptimized
        />
        <Typography component="h1" variant="h2">
          <strong>Access Denied</strong>
        </Typography>
        <Typography>You are not authorized to perform this action.</Typography>
        <Button
          variant="contained"
          onClick={() => router.push("/account/dashboard")}
        >
          Return to the dashboard
        </Button>
      </Wrapper>
    </ThemeProvider>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => `
    padding: ${theme.spacing(4, 4, 5, 4)};
    text-align: center;
    max-width: 800px;
    border-radius: 15px;
    margin: 30px auto;
    box-shadow: 0px 4px 48px rgba(0,0,0,0.06);

    h1.MuiTypography-root {
      margin-bottom: ${theme.spacing(2)};
      margin-top: ${theme.spacing(3)};
    }

    .MuiTypography-root {
      margin-bottom: ${theme.spacing(1)}
    }

    .MuiButton-root {
      margin-top: ${theme.spacing(2)}
    }
  `}
`;

const LogoContainer = styled.div`
  ${({ theme }) => `
    margin-bottom: ${theme.spacing(4)};
    width: 176px;
    overflow: hidden;
    transition: 0.3s ease all;
    margin: 0 auto ${theme.spacing(3)};
  `}
`;
