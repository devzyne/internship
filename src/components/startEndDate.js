import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import {
  getDateAfterDays,
  getDateAfterDaysFromDate,
} from "../utils/validationUtils";

const StartEndDate = ({
  handleStartDateChange,
  handleEndDateChange,
  selectedStartDate,
  selectedEndDate,
}) => {
  const minStartDate = getDateAfterDays(1);
  const maxStartDate = getDateAfterDays(365);
  const [minEndDate, setMinEndDate] = useState(
    getDateAfterDaysFromDate(minStartDate, 1)
  );
  const [maxEndDate, setMaxEndDate] = useState(
    getDateAfterDaysFromDate(minStartDate, 366)
  );
  const onStartDateChanged = (startdate) => {
    setMaxEndDate(getDateAfterDaysFromDate(startdate, 366));
    setMinEndDate(getDateAfterDaysFromDate(startdate, 1));
    if (handleStartDateChange) {
      handleStartDateChange(startdate);
    }
  };

  const onEndDateChanged = (enddate) => {
    if (handleEndDateChange) {
      handleEndDateChange(enddate);
    }
  };

  return (
    <>
      <Form.Group
        controlId="start-date"
        type="date"
        onChange={(e) => onStartDateChanged(e.target.value)}
      >
        <Form.Label>Select Date</Form.Label>
        <Form.Control
          type="date"
          min={minStartDate}
          max={maxStartDate}
          value={selectedStartDate}
        />
      </Form.Group>
      <Form.Group
        controlId="end-date"
        onChange={(e) => onEndDateChanged(e.target.value)}
      >
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          value={selectedEndDate}
          min={minEndDate}
          max={maxEndDate}
        />
      </Form.Group>
    </>
  );
};

export default StartEndDate;
