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

const PickerContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",

  ".react-datepicker-wrapper": {
    width: "100%",

    ".react-datepicker__input-container": {
      input: {
        cursor: "text",
        height: "35px",
        border: "1px solid #ebebeb",
        padding: "6px 10px 5px 10px",
        width: "100%"
      },

      ".MuiSvgIcon-root": {
        color: "rgba(0, 0, 0, 0.54)",
        width: "18px",
        height: "18px",
        fontSize: "1.7142857142857142rem",
        right: 0,
        top: 0,
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
    color: "#e92020"
  }
}));

function isValidDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date);
}

const DateRange = ({
  startDateValue,
  endDateValue,
  handleInputChange,
  dateFormat = "dd/MM/yyyy",
  showMonthYearPicker = false,
  view = "day",
  showYearPicker = false,
  isSearch = false,
  error,
  readOnly = false,
  dateRange
}) => {
  const [startDate, setStartDate] = useState(new Date("2014/02/08"));
  const [endDate, setEndDate] = useState(new Date("2014/02/10"));

  const handleKeyDown = event => {
    event.preventDefault();
  };

  const handleDateChange = (newValue, type) => {
    if (type === "startDate") {
      setStartDate(newValue);
    } else {
      setEndDate(newValue);
    }

    if (typeof handleInputChange !== "undefined") {
      handleInputChange({
        target: {
          name: type,
          value: newValue || ""
        }
      });
    }
  };

  useEffect(() => {
    if (startDateValue instanceof Date && endDateValue instanceof Date) {
      setStartDate(startDateValue);
      setEndDate(endDateValue);
      return;
    }

    if (startDateValue) {
      let convertedDate = parse(startDateValue, dateFormat, new Date());

      if (isValidDate(convertedDate)) {
        setStartDate(new Date(startDateValue));
      } else {
        convertedDate = parseISO(startDateValue);

        if (isValidDate(convertedDate)) {
          setStartDate(new Date(startDateValue));
        }
      }
    } else {
      setStartDate(null);
    }

    if (endDateValue) {
      let convertedDate = parse(endDateValue, dateFormat, new Date());

      if (isValidDate(convertedDate)) {
        setEndDate(new Date(endDateValue));
      } else {
        convertedDate = parseISO(endDateValue);

        if (isValidDate(convertedDate)) {
          setEndDate(new Date(endDateValue));
        }
      }
    } else {
      setEndDate(null);
    }
  }, [startDateValue, endDateValue]); // eslint-disable-line react-hooks/exhaustive-deps

  registerLocale("en-GB", enGB);

  return (
    <PickerContainer data-view={view} data-search={isSearch}>
      <DatePickerComponent
        dateFormat={dateFormat}
        selected={startDate}
        onChange={date => handleDateChange(date, "startDate")}
        showIcon={true}
        placeholderText={"Start Date"}
        showMonthYearPicker={showMonthYearPicker}
        showYearPicker={showYearPicker}
        icon={<CalendarToday />}
        toggleCalendarOnIconClick
        readOnly={readOnly}
        onKeyDown={handleKeyDown}
        minDate={dateRange && dateRange[0] ? dateRange[0] : null}
        maxDate={dateRange && dateRange[1] ? dateRange[1] : null}
      />
      <DatePickerComponent
        dateFormat={dateFormat}
        selected={endDate}
        onChange={date => handleDateChange(date, "endDate")}
        showIcon={true}
        placeholderText={"End Date"}
        showMonthYearPicker={showMonthYearPicker}
        showYearPicker={showYearPicker}
        icon={<CalendarToday />}
        toggleCalendarOnIconClick
        readOnly={readOnly}
        onKeyDown={handleKeyDown}
        minDate={dateRange && dateRange[0] ? dateRange[0] : null}
        maxDate={dateRange && dateRange[1] ? dateRange[1] : null}
      />
      {error && <FormHelperText className="error-text">{error}</FormHelperText>}
    </PickerContainer>
  );
};

export default DateRange;
