import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export default function Layout({ children }) {
  return (
    <LayoutContainer>
      <ImageContainer>
        <Background>
          <Content>
            <Typography variant="h2">Empowering</Typography>
            <Typography variant="h1">Wellness</Typography>
            <Typography variant="h2" component="p">
              practitioners and studios through seamless technology, <br />
              enabling healing connections and mindful growth.
            </Typography>
          </Content>
          <Image
            src="/yoga.jpeg"
            // placeholder="blur"
            alt="heroImage"
            aria-label="heroImage"
            // layout="fill"
            fill
            priority
            unoptimized
          />
        </Background>
      </ImageContainer>
      <Main>
        <FormContainer>
          <LogoContainer>
            <Link href="/">
              <Image
                src="/logo.png"
                alt="logo"
                height={60}
                width={51}
                priority
                unoptimized
              />
              <Image
                src="/companyName.png"
                alt="Dotsquares"
                height={33}
                width={130}
                priority
                unoptimized
              />
            </Link>
          </LogoContainer>
          {children}
        </FormContainer>
      </Main>
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
`;

const ImageContainer = styled.div`
  ${({ theme }) => `
    position: relative;
    width: 100%;
    overflow: hidden;

    .MuiCheckbox-root {
      .MuiSvgIcon-root {
        color: ${theme.colors.palette.darkerBlue};
      }
    }
  `}
`;

const Background = styled.div`
  ${({ theme }) => `
    height: 300px;
    position: relative;
    padding: ${theme.spacing(5, 5, 6, 5)};

    &::after {
      background: ${theme.colors.palette.darkerBlue}b3;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;

    }

    img {
      object-fit: cover;
      background-size: cover;
      background-repeat: no-repeat;
    }

    @media (min-width: ${theme.breakpoints.values.md}px) {
      height: 100vh;
      min-height: 100%;
    }
  `}
`;

const Content = styled.div`
  ${({ theme }) => `
    z-index: 99;
    position: absolute;

    &::after {
      width: 150px;
      background: ${theme.colors.palette.white};
      height: 8px;
      content: "";
      position: absolute;
      border-radius: 10px;
      bottom: -30px;
    }

    .MuiTypography-root {
      color: ${theme.colors.palette.white}
    }

    h1 {
      font-size: 90px;
      line-height: 1.3;
      margin-bottom: ${theme.spacing(1)};
    }

    h2 {
      font-size: 50px;
      font-weight: 600;
    }

    p {
      font-weight: 300;
      line-height: 1.3;
    }
  `}
`;

const Main = styled.div`
  flex: 0 0 700px;
  max-width: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoContainer = styled.div`
  ${({ theme }) => `
    margin-bottom: ${theme.spacing(4)};
    width: 176px;
    overflow: hidden;
    transition: 0.3s ease all;
    margin: 0 auto ${theme.spacing(3)};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
    }
  `}
`;

const FormContainer = styled.div`
  flex: 0 0 400px;
  max-width: 400px;
`;
