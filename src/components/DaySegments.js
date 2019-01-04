import React, { Component, Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import { TimeVariables } from "../utils/time-variables";

// Height is -1 from variable since we apply 1px border-bottom.
const Segment = styled.div`
  border-bottom: 1px solid ${theme.colors.gray};
  height: ${(TimeVariables.SEGMENT_PIXEL_HEIGHT) + "px"};
`;

class DaySegments extends Component {
  render() {
    const { day, segments } = this.props;
    return (
      <Fragment>
        {segments.map(segment => (
          <Segment
            key={segment}
            onClick={() => this.props.handleSegmentClick(day, segment)}
          />
        ))}
      </Fragment>
    );
  }
}

DaySegments.propTypes = {
  day: PropTypes.object.isRequired,
  segments: PropTypes.array.isRequired
};

export default DaySegments;
