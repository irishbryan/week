import { ActionTypes } from "../actions/calendar";

const defaultState = {
  currentDate: new Date(),
  days: [],
  timeOfDaySegments: []
};

const calendar = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_CALENDAR:
      return {
        ...state,
        currentDate: action.currentDate,
        days: action.days,
        timeOfDaySegments: action.timeOfDaySegments
      };
    default:
      return state;
  }
};

export default calendar;
