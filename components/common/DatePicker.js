import React, { useState, useEffect } from "react";
import { parseISO, parse } from "date-fns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function isValidDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date);
}

const DatePicker = ({
  value,
  error,
  handleInputChange,
  views,
  dateFormat = "dd/MM/yyyy",
  name = "live_date"
}) => {
  const [liveDate, setLiveDate] = useState(null);

  const handleDateChange = newValue => {
    setLiveDate(newValue);

    handleInputChange({
      target: {
        name: name,
        value: newValue
      }
    });
  };

  useEffect(() => {
    if (value instanceof Date) {
      setLiveDate(value);
      return;
    }

    if (value) {
      let convertedDate = parse(value, dateFormat, new Date());

      if (isValidDate(convertedDate)) {
        setLiveDate(value);
        return;
      } else {
        convertedDate = parseISO(value);

        if (isValidDate(convertedDate)) {
          setLiveDate(value);
          return;
        }
      }
    } else {
      setLiveDate(null);
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        id="outlined-start-adornment"
        name={name}
        value={parseISO(liveDate)}
        slotProps={{
          textField: {
            helperText: error,
            error: Boolean(error)
          }
        }}
        onChange={handleDateChange}
        format={dateFormat}
        views={views ? views : ["day"]}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
