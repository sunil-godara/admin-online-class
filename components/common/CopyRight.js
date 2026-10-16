import * as React from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { format } from "date-fns";

export default function CopyRight() {
  return (
    <Container>
      <Typography>
        Dotsquares Wellness ©{format(new Date(), "yyyy")} All rights reserved
      </Typography>
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => `
    padding: ${theme.spacing(2, 4)};
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: ${theme.breakpoints.values.lg}px) {
      padding: ${theme.spacing(3, 4)};
    }
  `}
`;
