import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  MenuItem
} from "@mui/material";
import {
  getUnassignedAccessories,
  assignAccessoryToProduct
} from "@/utils/api/ordering-portal-management";
import { Store } from "@/utils/store";

export default function AddAccessory({
  setOpen,
  sku,
  csv_header_no,
  setProductAccessory
}) {
  const store = Store();
  const [loading, setLoading] = useState(false);
  const [selectedSku, setSelectedSku] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState("");
  const [accessoryList, setAccessoryList] = useState([]);

  const handleInputChange = ({ target }) => {
    let value = target.value;

    value = typeof value === "string" ? value.split(",") : value;
    setSelectedSku(value);

    const prices = value
      .map(sku => {
        const accessory = accessoryList.find(item => item.sku === sku);
        return accessory ? accessory.price : "";
      })
      .join(",");
    setSelectedPrices(prices);
  };

  const handlePriceChange = ({ target }) => {
    setSelectedPrices(target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    setLoading(true);
    try {
      let body = {
        sku: selectedSku,
        price: selectedPrices,
        product_sku: sku,
        csv_header_no: csv_header_no
      };

      const response = await assignAccessoryToProduct(body);

      if (response.status) {
        store.setSnackbarDetails({
          status: true,
          message: response.message,
          color: "success",
          vertical: "top",
          horizontal: "right"
        });
        setProductAccessory(response.data);
        setOpen(false);
      } else {
        store.setSnackbarDetails({
          status: true,
          message: response.message,
          color: "error",
          vertical: "top",
          horizontal: "right"
        });
      }
    } catch (error) {
      store.setSnackbarDetails({
        status: true,
        message: "Something went wrong, Please try again.",
        color: "error",
        vertical: "top",
        horizontal: "right"
      });
    }
    setLoading(false);
  };

  const handleReset = async () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      if (sku) {
        const response = await getUnassignedAccessories({ sku, csv_header_no });

        if (response && response.status) {
          setAccessoryList(response.data);
        }
      }
    })();
  }, [sku]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={12} lg={12}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Accessories</FormLabel>
            <TextField
              id="accessory_sku"
              name="accessory_sku"
              select
              value={selectedSku}
              onChange={handleInputChange}
              SelectProps={{
                placeholder: "Please Select",
                displayEmpty: true,
                MenuProps: { sx: { maxHeight: 320 } },
                multiple: true
              }}
            >
              <MenuItem value={""}>Please Select</MenuItem>
              {accessoryList &&
                accessoryList.map(({ name, sku }) => (
                  <MenuItem key={sku} value={sku}>
                    {name}
                  </MenuItem>
                ))}
            </TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
            <FormLabel>Prices</FormLabel>
            <TextField
              id="price"
              name="price"
              value={selectedPrices}
              onChange={handlePriceChange}
              placeholder="Enter prices as comma-separated values"
              helperText="Enter prices as comma-separated values"
            />
          </FormControl>
        </Grid>
      </Grid>
      <ActionContainer>
        <Button variant="containedSecondary" onClick={handleReset}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </ActionContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => `
  padding: ${theme.spacing(0)};

  .MuiFormLabel-root {
    color: ${theme.colors.palette.darkGrey};
    margin-bottom: ${theme.spacing(1)};
    display: block;
    font-size: 14px;
  }

  .MuiSelect-select {
    height: 30px;
    padding: 8px;
  }

  .info-row {
    margin-bottom: ${theme.spacing(2)};
    border-bottom: 5px solid #eaeaea;
    padding-bottom: ${theme.spacing(1)};

    .MuiTypography-root {
      margin-left: ${theme.spacing(1)};
    }
  }
`}
`;

const ActionContainer = styled.div`
  ${({ theme }) => `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${theme.spacing(1)};
`}
`;
