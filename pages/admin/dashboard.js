import { useEffect, useState } from "react";
import Head from "next/head";
import {
  format,
  getYear,
  subYears,
  startOfYear,
  startOfMonth,
  endOfMonth,
  getMonth
} from "date-fns";
import styled from "@emotion/styled";
import { Grid, List, ListItem } from "@mui/material";
import DashboardLayout from "@/components/common/Layout";
import PageTitle from "@/components/common/PageTitle";
import ThemeProvider from "@/theme/ThemeProvider";
import { Store } from "@/utils/store";
import Breadcrumb from "@/components/common/Breadcrumb";
import { withAuth } from "@/utils/withAuth";
import Financial from "@/components/dashboard/Financial";
import CommonDatePicker from "@/components/common/CommonDatePicker";
import DateRange from "@/components/common/DateRange";

export default function Dashboard({ previousPath }) {
  const store = Store();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleClick = (event, index) => {
    const currentDate = new Date();

    switch (index) {
      case 1: {
        const currentYear = getYear(currentDate);
        setStartDate(`01/01/${currentYear}`);
        setEndDate(format(currentDate, "dd/MM/yyyy"));
        console.log(startDate, endDate);
        break;
      }
      case 2: {
        const dateFiveYearsAgo = subYears(currentDate, 5);
        const startOfLastFiveYears = startOfYear(dateFiveYearsAgo);
        const formattedDate = format(startOfLastFiveYears, "dd/MM/yyyy");
        setStartDate(formattedDate);
        setEndDate(format(currentDate, "dd/MM/yyyy"));
        break;
      }
      case 3:
      case 4: {
        setStartDate(null);
        setEndDate(null);
        break;
      }
    }

    setSelectedIndex(index);
  };

  const handleDateChange = ({ target }, type) => {
    if (type === "searchByMonth") {
      const currentYear = getYear(target.value);
      const selectedMonth = getMonth(target.value);
      const date = new Date(currentYear, selectedMonth);
      const currentStartDate = startOfMonth(date);
      const currentEndDate = endOfMonth(date);
      const formattedStartDate = format(currentStartDate, "dd/MM/yyyy");
      const formattedEndDate = format(currentEndDate, "dd/MM/yyyy");

      setStartDate(formattedStartDate);
      setEndDate(formattedEndDate);
    } else {
      if (target.name === "startDate") {
        setStartDate(format(target.value, "dd/MM/yyyy"));
      } else {
        setEndDate(format(target.value, "dd/MM/yyyy"));
      }
    }
  };

  useEffect(() => {
    if (previousPath === `${process.env.APP_URL}/admin/login`) {
      store.setSnackbarDetails({
        status: true,
        message: "You have been logged in successfully.",
        color: "success",
        vertical: "top",
        horizontal: "right"
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ThemeProvider>
      <Head>
        <title>Dotsquares Wellness - Dashboard</title>
        <meta name="description" content="Dotsquares Wellness - Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
        <PageTitle
          title="Dashboard"
          subtitle="Dashboard & statistics"
          isDashboard
        >
          <Breadcrumb />
        </PageTitle>
        <DashboardContainer>
          <Grid
            container
            spacing={0}
            columnSpacing={3}
            className="filter-container"
          >
            <Grid
              item
              xs={12}
              md={12}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              <List variant="inline">
                <ListItem
                  selected={selectedIndex === 1}
                  onClick={event => handleClick(event, 1)}
                >
                  YTD
                </ListItem>
                <ListItem
                  selected={selectedIndex === 2}
                  onClick={event => handleClick(event, 2)}
                >
                  Past 5 years
                </ListItem>
                <ListItem
                  selected={selectedIndex === 3}
                  onClick={event => handleClick(event, 3)}
                >
                  Month by Month
                </ListItem>
                <ListItem
                  selected={selectedIndex === 4}
                  onClick={event => handleClick(event, 4)}
                >
                  Custom Date Range
                </ListItem>
              </List>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              {selectedIndex === 3 && (
                <CommonDatePicker
                  value={startDate}
                  views={["month"]}
                  dateFormat="MMM"
                  name="relevant_month"
                  placeholderText="Search By Month"
                  handleInputChange={event =>
                    handleDateChange(event, "searchByMonth")
                  }
                  showMonthYearPicker={true}
                  view="month"
                  isSearch={true}
                />
              )}
              {selectedIndex === 4 && (
                <DateRange
                  dateFormat="dd/MM/yyyy"
                  handleInputChange={event =>
                    handleDateChange(event, "dateRange")
                  }
                />
              )}
            </Grid>
          </Grid>
          <Financial
            startDate={startDate}
            endDate={endDate}
            selectedIndex={selectedIndex}
          />
        </DashboardContainer>
      </DashboardLayout>
    </ThemeProvider>
  );
}

export const getServerSideProps = withAuth(async context => {
  return {
    props: {
      previousPath: context.req.headers.referer || ""
    }
  };
});

const DashboardContainer = styled.div`
  ${({ theme }) => `
    .filter-container {
      border-bottom: 1px solid #f5f5f5;
      box-shadow: 8px 8px 8px #e2e2e2;
      padding: 16px 24px;
    }

    .MuiList-root {
      display: flex;
      padding: 0;
      width: 100%;
      justify-content: flex-end;
      margin-bottom: 16px;

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
