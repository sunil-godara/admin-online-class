import { useEffect, useState } from "react";
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
import { assignTicketToUser } from "@/utils/api/support-management";
import { ticketAssignRules } from "@/utils/constants/rules";
import { ticketAssignFields } from "@/utils/constants/support-constants";
import { Store } from "@/utils/store";
import {
  formValidation,
  fieldValidation
} from "@/utils/validations/validation";

export default function AssignTicket({
  TicketId,
  setOpen,
  setTicketId,
  userStaffList
}) {
  const store = Store();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState(ticketAssignFields);
  const [errors, setErrors] = useState(ticketAssignFields);
  const [staffList, setStaffList] = useState({});

  const handleInputChange = ({ target }) => {
    setInputs(inputs => ({
      ...inputs,
      [target.name]: target.value
    }));

    let errorMessage = ticketAssignRules[target.name]
      ? fieldValidation(ticketAssignRules[target.name], target.value)
      : "";

    setErrors({
      ...errors,
      [target.name]: errorMessage ? errorMessage : ""
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const validationErrors = formValidation(inputs, ticketAssignRules);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        let body = {
          ...inputs,
          customer_support_id: TicketId
        };

        const response = await assignTicketToUser(body);

        if (response.status === true) {
          store.setSnackbarDetails({
            status: true,
            message: response.message,
            color: "success",
            vertical: "top",
            horizontal: "right"
          });
          setInputs(ticketAssignFields);
        } else {
          store.setSnackbarDetails({
            status: true,
            message: response.message,
            color: "error",
            vertical: "top",
            horizontal: "right"
          });

          if (response.data) {
            setErrors(response.data);
          }
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
    }
  };

  const handleReset = async () => {
    setErrors("");
    setOpen(false);
    setTicketId("");
  };

  useEffect(() => {
    if (userStaffList && Object.keys(userStaffList).length) {
      setStaffList(userStaffList);
    }
  }, [userStaffList]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={12} lg={12}>
          <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} required>
            <FormLabel>Users</FormLabel>
            <TextField
              id="user_id"
              name="user_id"
              select
              value={inputs.user_id}
              onChange={handleInputChange}
              helperText={errors.user_id}
              error={Boolean(errors.user_id)}
              SelectProps={{
                placeholder: "Please Select",
                displayEmpty: true,
                MenuProps: { sx: { maxHeight: 320 } }
              }}
            >
              <MenuItem value={""}>Please Select</MenuItem>
              {staffList.users &&
                staffList.users.map(({ name, id }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
            </TextField>
          </FormControl>
        </Grid>
      </Grid>
      <ActionContainer>
        <Button variant="containedSecondary" onClick={handleReset}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress /> : "Assign"}
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
