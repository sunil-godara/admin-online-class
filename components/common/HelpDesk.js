import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  TextField
} from "@mui/material";

export default function HelpDesk({
  inputs,
  errors,
  isOrderFetched,
  fetchedPostCodes,
  handleInputChange,
  handleSearchByName,
  categoryList
}) {
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12} md={6} lg={5}>
        <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
          <FormLabel>Student First Name</FormLabel>
          <TextField
            placeholder="Enter Student First Name"
            id="student_first_name"
            name="student_first_name"
            helperText={errors.student_first_name}
            error={Boolean(errors.student_first_name)}
            value={inputs.student_first_name}
            onChange={handleInputChange}
            fullWidth
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={5}>
        <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
          <FormLabel>Student Last Name</FormLabel>
          <TextField
            placeholder="Enter Student Last Name"
            id="student_last_name"
            name="student_last_name"
            helperText={errors.student_last_name}
            error={Boolean(errors.student_last_name)}
            value={inputs.student_last_name}
            onChange={handleInputChange}
            fullWidth
          />
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        lg={2}
        display="flex"
        alignItems="center"
        gap={1}
      >
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={handleSearchByName}
        >
          Find
        </Button>
      </Grid>
      {fetchedPostCodes.length > 0 && (
        <Grid item xs={12} md={6} lg={6}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Please Select Your Post Code</FormLabel>
            <TextField
              id="post_code"
              name="post_code"
              select
              value={inputs.post_code}
              onChange={handleInputChange}
              helperText={errors.post_code}
              error={Boolean(errors.post_code)}
              SelectProps={{
                placeholder: "Please Select",
                displayEmpty: true,
                MenuProps: { sx: { maxHeight: 320 } }
              }}
            >
              <MenuItem value={""}>Please Select</MenuItem>
              {fetchedPostCodes.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Grid>
      )}

      {isOrderFetched && (
        <>
          <Grid item xs={12} md={6} lg={6}>
            <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
              <FormLabel>Your Order Number Is</FormLabel>
              <TextField
                placeholder="Enter Order No."
                id="order_number"
                name="order_number"
                helperText={errors.order_number}
                error={Boolean(errors.order_number)}
                value={inputs.order_number}
                onChange={handleInputChange}
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
              <FormLabel>Email Address</FormLabel>
              <TextField
                placeholder="Enter Email Address"
                id="email"
                name="email"
                helperText={errors.email}
                error={Boolean(errors.email)}
                value={inputs.email}
                onChange={handleInputChange}
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
              <FormLabel>Phone No.</FormLabel>
              <TextField
                placeholder="Enter Phone No."
                id="phone"
                name="phone"
                helperText={errors.phone}
                error={Boolean(errors.phone)}
                value={inputs.phone}
                onChange={handleInputChange}
                fullWidth
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
              <FormLabel>Product Name</FormLabel>
              <TextField
                placeholder="Enter Product Name"
                id="product_name"
                name="product_name"
                helperText={errors.product_name}
                error={Boolean(errors.product_name)}
                value={inputs.product_name}
                onChange={handleInputChange}
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
              <FormLabel>How can we help?</FormLabel>
              <TextField
                id="support_category_id"
                name="support_category_id"
                select
                value={inputs.support_category_id}
                onChange={handleInputChange}
                helperText={errors.support_category_id}
                error={Boolean(errors.support_category_id)}
                SelectProps={{
                  placeholder: "Please Select",
                  displayEmpty: true,
                  MenuProps: { sx: { maxHeight: 320 } }
                }}
              >
                <MenuItem value={""}>Please Select</MenuItem>
                {categoryList.map(({ name, id }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
              <FormLabel>Description</FormLabel>
              <TextField
                placeholder="Description"
                id="description"
                name="description"
                helperText={errors.description}
                error={Boolean(errors.description)}
                value={inputs.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={5}
              />
            </FormControl>
          </Grid>
        </>
      )}
    </Grid>
  );
}
