import moment from "moment";

/**
 * Returns the number of minutes between the provided
 * start time and end time. Will be used in display calculations related to
 * event duration.
 *
 * @param {Date} start - start time of time period
 * @param {Date} end - end time of time period
 * @returns {Integer} - duration in minutes.
 */
export const getDurationInMinutes = (start, end) => {
  // TODO: Is it necessary  there a more efficient way to get minutes from date objects?
  let startMoment = moment(start);
  let endMoment = moment(end);

  return moment.duration(endMoment.diff(startMoment)).asMinutes();
};

/**
 * Returns the start time of an event as represented by minutes in a day.
 * For example, "01:00" would return 60 since it starts 60 minutes into a given day.
 * @param {Date} start - start time
 * @returns {Integer} - start time as minutes into a given day.
 */
export const getMinutesSinceMidnight = start => {
  let startMoment = moment(start);
  return startMoment.hours() * 60 + startMoment.minutes();
};
