/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import { parseISO, parse } from "date-fns";
import { enGB } from "date-fns/locale";
import {
  default as DatePickerComponent,
  registerLocale
} from "react-datepicker";
import { FormHelperText } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import { styled } from "@mui/system";
import "react-datepicker/dist/react-datepicker.css";

const PickerContainer = styled("div")(({ error }) => ({
  ".react-datepicker-wrapper": {
    width: "100%",

    ".react-datepicker__input-container": {
      input: {
        cursor: "text",
        height: "55px",
        border: error ? "1px solid #d32f2f" : "1px solid #ebebeb",
        padding: "6px 10px 5px 10px",
        width: "100%",
        "&:focus": {
          outline: error ? "1px solid #d32f2f" : "1px solid #1976d2",
          borderColor: error ? "#d32f2f" : "#1976d2"
        }
      },

      ".MuiSvgIcon-root": {
        color: error ? "#d32f2f" : "rgba(0, 0, 0, 0.54)",
        width: "18px",
        height: "18px",
        fontSize: "1.7142857142857142rem",
        right: 0,
        top: 10,
        cursor: "pointer"
      }
    }
  },

  ".react-datepicker-popper": {
    zIndex: 9
  },

  "&[data-view='month']": {
    ".react-datepicker__tab-loop": {
      ".react-datepicker-popper": {
        ".react-datepicker": {
          ".react-datepicker__navigation": {
            display: "none"
          },

          ".react-datepicker__month-container": {
            ".react-datepicker__header": {
              color: "#f0f0f0"
            }
          }
        }
      }
    }
  },

  "&[data-search='true']": {
    ".react-datepicker-wrapper": {
      width: "100%",

      ".react-datepicker__input-container": {
        input: {
          height: "35px"
        },

        ".MuiSvgIcon-root": {
          top: 0
        }
      }
    }
  },

  ".error-text": {
    color: "#d32f2f",
    margin: "3px 14px 0",
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 1.66,
    letterSpacing: "0.03333em"
  }
}));

function isValidDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date);
}

const CommonDatePicker = ({
  value,
  handleInputChange,
  dateFormat = "dd/MM/yyyy",
  name = "live_date",
  placeholderText,
  showMonthYearPicker = false,
  view = "day",
  showYearPicker = false,
  isSearch = false,
  error,
  readOnly = false,
  dateRange
}) => {
  const [liveDate, setLiveDate] = useState(null);

  const handleKeyDown = event => {
    event.preventDefault();
  };

  const handleDateChange = newValue => {
    setLiveDate(newValue);

    handleInputChange({
      target: {
        name: name,
        value: newValue || ""
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
        setLiveDate(new Date(value));
        return;
      } else {
        convertedDate = parseISO(value);

        if (isValidDate(convertedDate)) {
          setLiveDate(new Date(value));
          return;
        }
      }
    } else {
      setLiveDate(null);
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  registerLocale("en-GB", enGB);

  return (
    <PickerContainer
      data-view={view}
      data-search={isSearch}
      error={Boolean(error)}
    >
      <DatePickerComponent
        dateFormat={dateFormat}
        selected={liveDate}
        onChange={handleDateChange}
        showIcon={true}
        placeholderText={placeholderText}
        showMonthYearPicker={showMonthYearPicker}
        showYearPicker={showYearPicker}
        icon={<CalendarToday />}
        toggleCalendarOnIconClick
        readOnly={readOnly}
        onKeyDown={handleKeyDown}
        minDate={dateRange && dateRange[0] ? dateRange[0] : null}
        maxDate={dateRange && dateRange[1] ? dateRange[1] : null}
        // customInput={
        //   <input
        //     type="text"
        //     value={liveDate ? format(liveDate, dateFormat) : ""}
        //     readOnly
        //     className="custom-input"
        //   />
        // }
      />
      {error && <FormHelperText className="error-text">{error}</FormHelperText>}
    </PickerContainer>
  );
};

export default CommonDatePicker;
