import * as React from "react";
import styled from "@emotion/styled";
import { Typography, Grid } from "@mui/material";

export default function PageTitle({
  children,
  subtitle,
  title,
  isDashboard = false
}) {
  return (
    <Container>
      <Grid container spacing={0}>
        <Grid item xs={12} md={isDashboard ? 10 : 8}>
          <Left>
            <Typography variant="h2">{title}</Typography>
            <Typography variant="h6">{subtitle}</Typography>
          </Left>
        </Grid>
        <Grid item xs={12} md={isDashboard ? 2 : 4}>
          <Right>{children}</Right>
        </Grid>
      </Grid>
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => `
    padding: ${theme.spacing(2)};
    border-bottom: 1px solid ${theme.colors.palette.lightGrey};

    @media (min-width: ${theme.breakpoints.values.md}px) {           
      padding: ${theme.spacing(2, 4)}; 
    }   
  `}
`;

const Left = styled.div`
  ${({ theme }) => `
    h2 {
      font-size: 18px;

      @media (min-width: ${theme.breakpoints.values.md}px) {  
        font-size: 24px;
      }
    }

    h6 {
      color:  ${theme.colors.palette.mediumGrey};
      font-size: 14px;

      @media (min-width: ${theme.breakpoints.values.md}px) {  
        font-size: 16px;
      }
    }
  `}
`;

const Right = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
