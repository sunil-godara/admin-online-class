import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const BarChartComponent = ({
  id,
  title = "",
  label = "",
  borderWidth = 1,
  data = [],
  selectedIndex,
  type
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let labelTitle = "";

    switch (selectedIndex) {
      case 1:
        labelTitle = `${type} by months in current year`;
        break;
      case 2:
        labelTitle = `${type} in Past 5 years`;
        break;
      case 3:
        labelTitle = `${type} by days in selected month`;
        break;
      case 4:
        labelTitle = `${type} in custom date range`;
        break;
      default:
        labelTitle = `${type} by Year`;
    }
    // Get the canvas context and create the chart
    const ctx = document.getElementById(`${id}-chart`).getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map(row => row.label),
        datasets: [
          {
            label: label,
            data: data.map(row => row.value),
            backgroundColor: data.map(row =>
              row.value >= 0 ? "rgb(32, 151, 210)" : "#ff6242"
            ),
            borderColor: data.map(row =>
              row.value >= 0 ? "rgb(32, 151, 210)" : "#ff6242"
            ),
            borderWidth: borderWidth
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top"
          },
          title: {
            display: true,
            text: labelTitle
          }
        }
      }
    });

    // Save the chart instance to the ref
    chartRef.current = myChart;

    // Cleanup function to destroy the chart on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <Container>
        <Header>
          <Typography variant="h2">{title}</Typography>
        </Header>
        <canvas id={`${id}-chart`}></canvas>;
      </Container>
    </>
  );
};

export default BarChartComponent;

const Container = styled.div`
  ${({ theme }) => `
    padding: ${theme.spacing(2)};
    background: ${theme.colors.palette.white};
    border-radius: 10px;
    height: 100%;
    box-shadow: 1px 10px 25px #dedede;

    @media (min-width: ${theme.breakpoints.values.lg}px) {
      padding: ${theme.spacing(4)};
    }

    h2 {
      font-size: 18px;

      @media (min-width: ${theme.breakpoints.values.lg}px) {
        font-size: 24px;
      }
    }

    img {
      max-width: 100%;
      height: auto;
    }
  `}
`;

const Header = styled.div`
  ${({ theme }) => `
    margin-bottom: ${theme.spacing(4)};

    .MuiList-root {
      display: flex;
      padding: 0;
      overflow: auto;
      margin-top: ${theme.spacing(3)};

      .MuiListItem-root {
        width: auto;
        cursor: pointer;
        border-radius: 20px;
        font-size: 14px;
        height: 32px;
        white-space: nowrap;

        &.Mui-selected {
          background: ${theme.colors.palette.darkBlue};
          color: ${theme.colors.palette.white};
        }
      }
    }
   `}
`;
