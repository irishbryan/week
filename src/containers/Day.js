import React, { Component } from "react";
import styled from "styled-components";
import moment from "moment";
import { connect } from "react-redux";
import { Flex } from "rebass";

import theme from "../theme";
import { TimeVariables } from "../utils/time-variables";
import { createEvent, updateEvent, deleteEvent } from "../actions/events";

import DaySegments from "../components/DaySegments";
import DayEvents from "../components/DayEvents";

const DayWrapper = styled.div`
  flex: 1 0 0;
  position: relative;
  border-right: 1px solid ${theme.colors.darkGray};
`;

// TODO: Should take style related variables from `theme.js`
const DayHeading = styled.div`
  font-size: 20px;
  padding: 10px;
  font-weight: ${props => (props.today ? 600 : 200)};
  text-decoration: ${props => (props.today ? "underline" : "none")};
  text-align: center;
`;

class Day extends Component {
  headerRef = React.createRef();
  columnRef = React.createRef();
  state = {
    headerHeight: 0, // Used to figure out event positioning.
    columnWidth: 0 // Used to determine <Event/> horizontal snap when dragged.
  };

  componentDidMount() {
    this.setState({
      headerHeight: this.headerRef.current.clientHeight,
      columnWidth: this.columnRef.current.clientWidth
    });
  }

  /**
   * TODO: Update this to create events based on drag activity.
   * For now it creates an event lasting for 2 hour for the segment clicked.
   */
  handleSegmentClick = (day, segment) => {
    // Figure out time of day event starts at based on segment (e.g. "13:00").
    let startSegment = moment(segment, TimeVariables.TWENTY_FOUR_HOUR_FORMAT);

    let startMoment = moment(day)
      .hour(startSegment.format(TimeVariables.HOUR_FORMAT))
      .minute(startSegment.format(TimeVariables.MINUTE_FORMAT));

    let start = startMoment.toDate();
    let end = startMoment.add(2, "hour").toDate();

    // TODO: Possible it'd be better to set default event name elsewhere.
    this.props.createEvent("New meeting", start, end);
  };

  render() {
    const { day, calendar, events, updateEvent, deleteEvent } = this.props;

    return (
      <DayWrapper ref={this.columnRef}>
        <DayHeading
          ref={this.headerRef}
          today={moment(day).isSame(moment(calendar.currentDate), "day")}
        >
          {moment(day).format(TimeVariables.DAY_FORMAT)}
        </DayHeading>
        <Flex flexDirection="column">
          <DaySegments
            day={day}
            segments={calendar.timeOfDaySegments}
            handleSegmentClick={this.handleSegmentClick}
          />
        </Flex>
        <DayEvents
          day={day}
          events={events}
          headerHeight={this.state.headerHeight}
          columnWidth={this.state.columnWidth}
          updateEvent={updateEvent}
          deleteEvent={deleteEvent}
        />
      </DayWrapper>
    );
  }
}

const mapStateToProps = ({ calendar, events }) => ({
  calendar,
  events
});

const mapDispatchToPros = dispatch => ({
  createEvent: (name, start, end) => dispatch(createEvent(name, start, end)),
  updateEvent: (id, name, start, end) =>
    dispatch(updateEvent(id, name, start, end)),
  deleteEvent: id => dispatch(deleteEvent(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToPros
)(Day);
