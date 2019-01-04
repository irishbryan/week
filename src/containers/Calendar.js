import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Flex } from "rebass";

import { loadCalendar } from "../actions/calendar";

import Day from "./Day";
import CalendarHeader from "../components/CalendarHeader";
import TimeOfDay from "../components/TimeOfDay";

class Calendar extends Component {
  componentDidMount() {
    this.props.loadCalendar();
  }

  render() {
    const { calendar } = this.props;
    return (
      <Fragment>
        <CalendarHeader date={calendar.currentDate} />
        <Flex>
          <TimeOfDay timeSegments={calendar.timeOfDaySegments} />
          {calendar.days.map(day => (
            <Day key={day} day={day} />
          ))}
        </Flex>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ calendar, events }) => ({
  calendar,
  events
});

const mapDispatchToProps = dispatch => ({
  loadCalendar: () => dispatch(loadCalendar())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
