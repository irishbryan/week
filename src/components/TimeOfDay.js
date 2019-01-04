import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Flex } from "rebass";

const TimeSegment = styled.div`
  padding: 3px 0px 3px 0px;
  font-size: 14px;
  text-align: right;
`;

const TimeOfDay = ({ timeSegments }) => (
  <Flex flexDirection="column" mt={"30px"}>
    {timeSegments.map((segment, index) => (
      // To keep UI clean, only render top of hour segments, and do a break for bottom of hour.
      <TimeSegment key={segment}>
        {index % 2 === 0 ? segment : <br />}
      </TimeSegment>
    ))}
  </Flex>
);

TimeOfDay.propTypes = {
  timeSegments: PropTypes.array.isRequired
};

export default TimeOfDay;
