import React, { useState } from "react";
import { Grid } from "@mui/material";
import BarChartComponent from "../common/BarChartComponent";
import InnerContent from "../presentation/InnerContent";
import StatusTile from "../presentation/StatusTile";
// import { getFinancialCount } from "@/utils/api/dashboard-management";

export default function Financial({ selectedIndex }) {
  const [financialCount] = useState({});

  // useEffect(() => {
  //   (async () => {
  //     const response = await getFinancialCount({ startDate, endDate });

  //     if (response && response.status) {
  //       setFinancialCount(response.data);
  //     }
  //   })();
  // }, [startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <InnerContent>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6} md={4} xl={3}>
          <StatusTile
            bgColor="blue"
            number={financialCount.acceptedOrders || 0}
            statusType="Total Users"
            icon="/purchase-icon.png"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} xl={3}>
          <StatusTile
            bgColor="warningLight"
            number={financialCount.ownedOrders || 0}
            statusType="Total Practitioners"
            icon="/invoice-icon.png"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} xl={3}>
          <StatusTile
            bgColor="purple"
            number={financialCount.choicePendingOrders || 0}
            statusType="Total Studios"
            icon="/purchase-icon.png"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} xl={3}>
          <StatusTile
            bgColor="grayishBlue"
            number={financialCount.storePendingOrders || 0}
            statusType="Total Classes"
            icon="/purchase-icon.png"
          />
        </Grid>
      </Grid>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} lg={6}>
          <BarChartComponent
            title="Revenue"
            id="revenueChart"
            data={financialCount.revenueData}
            selectedIndex={selectedIndex}
            type="Revenue"
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <BarChartComponent
            title="Profit"
            id="profitChart"
            data={financialCount.profitData}
            selectedIndex={selectedIndex}
            type="Profit"
          />
        </Grid>
      </Grid>
    </InnerContent>
  );
}
