import keyMirror from "keymirror";
import moment from "moment";

export const ActionTypes = keyMirror({
  LOAD_CALENDAR: null
});

const _createLoadCalendarAction = (currentDate, days, timeOfDaySegments) => ({
  type: ActionTypes.LOAD_CALENDAR,
  currentDate,
  days,
  timeOfDaySegments
});

/**
 * Returns an array of date objects, representing the entire
 * week of the date provided.
 * @param {Date} date
 * @returns {Array} of dates.
 */
const _calculateDaysInWeek = date => {
  let startOfWeek = moment(date).startOf("isoWeek");
  let endOfWeek = moment(date).endOf("isoWeek");

  let days = [];
  let day = startOfWeek;

  while (day <= endOfWeek) {
    days.push(day.toDate());
    day = day.clone().add(1, "d");
  }

  return days;
};

/**
 * Need to generate array of 30-min time segments for each day. For now
 * doing this as part of loadCalendar action.
 *
 * TODO: Suspect there's a better way and place to do this but convenient to create
 * array as part of calendar loading for now.
 *
 * @returns {Array} Strings ("HH:mm") representing 30 min segments in day (e.g. "14:30")
 */
const _calculateTimeOfDaySegments = () => {
  let hours = [];

  for (let i = 0; i < 24; i++) {
    // TODO: Got to be a better way to get 24 hour time segments, probably using `momentjs`?
    hours.push((i < 10 ? "0" + i.toString() : i.toString()) + ":00"); // Top of hour
    hours.push((i < 10 ? "0" + i.toString() : i.toString()) + ":30"); // Bottom of hour
  }

  return hours;
};

/**
 * Calendar will display current week by default upon loading.
 * This action creator calculates current day and week information.
 */
export const loadCalendar = () => dispatch => {
  const currentDate = new Date();

  // Create an array of date objects representing current week.
  let days = _calculateDaysInWeek(currentDate);
  let hours = _calculateTimeOfDaySegments();

  dispatch(_createLoadCalendarAction(currentDate, days, hours));
};
