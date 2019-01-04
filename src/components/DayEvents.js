import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

import Event from "./Event";

const DayEvents = ({
  day,
  headerHeight,
  columnWidth,
  events,
  updateEvent,
  deleteEvent
}) => {
  /**
   * Function to filter down to events for the specified day.
   *
   * TODO: For simplicity events are stored in a single dictionary, keyed by event ID.
   * In a production environment we would optimize retrieval of events for a particular date
   * beyond what we see here, could imagine { date: { eventID: {...}, eventId: {...} }}.
   *
   * @returns {Array} of events tied to the day this component represents.
   */
  const filterDaysEvents = () => {
    let daysEvents = [];

    Object.values(events.events).forEach(event => {
      if (moment(event.start).isSame(moment(day), "day")) {
        daysEvents.push(event);
      }
    });

    return daysEvents;
  };

  return filterDaysEvents().map(event => (
    <Event
      key={event.id}
      event={event}
      headerHeight={headerHeight}
      columnWidth={columnWidth}
      updateEvent={updateEvent}
      deleteEvent={deleteEvent}
    />
  ));
};

DayEvents.propTypes = {
  day: PropTypes.object.isRequired,
  headerHeight: PropTypes.number.isRequired,
  columnWidth: PropTypes.number.isRequired,
  events: PropTypes.object.isRequired,
  updateEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired
};

export default DayEvents;
