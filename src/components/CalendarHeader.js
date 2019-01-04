import moment from "moment";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box, Heading } from "rebass";
import { TimeVariables } from "../utils/time-variables";

const Year = styled.span`
  font-size: 25px;
  font-weight: 200;
  margin-left: 10px;
`;

const CalendarHeader = ({ date }) => (
  <Box p={[2, 2, 3]} bg="brand">
    <Heading color="white">
      {moment(date).format(TimeVariables.MONTH_FORMAT)}
      <Year>{moment(date).format(TimeVariables.YEAR_FORMAT)}</Year>
    </Heading>
  </Box>
);

CalendarHeader.propTypes = {
  date: PropTypes.object.isRequired
};

export default CalendarHeader;
