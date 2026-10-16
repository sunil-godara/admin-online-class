import * as React from "react";
import styled from "@emotion/styled";
import CopyRight from "./CopyRight";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

export default function Layout({ children }) {
  return (
    <LayoutContainer>
      <SideBar />
      <Main>
        <TopBar />
        {children}
        <CopyRight />
      </Main>
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  ${({ theme }) => `
    height: auto;
    display: flex;
    background: ${theme.colors.palette.cream};

    @media (min-width: ${theme.breakpoints.values.md}px) {           
      height: 100vh;
    }
  `}
`;

const Main = styled.div`
  flex: 1;
  overflow: hidden;
`;
