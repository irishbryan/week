import { ActionTypes } from "../actions/events";
import { omit } from "lodash";

const defaultState = {
  nextID: 0, // Requirements dictate that consecutive event IDs be assigned.
  events: {}
};

const events = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_EVENT:
      return {
        nextID: state.nextID + 1,
        events: {
          ...state.events,
          [state.nextID]: {
            id: state.nextID,
            name: action.name,
            start: action.start,
            end: action.end,
            editMode: true // Should enter mode after event creation.
          }
        }
      };
    case ActionTypes.UPDATE_EVENT:
      return {
        ...state,
        events: {
          ...state.events,
          [action.id]: {
            id: action.id,
            name: action.name,
            start: action.start,
            end: action.end,
            editMode: false // Safe to disable since event was just updated.
          }
        }
      };
    case ActionTypes.DELETE_EVENT:
      return {
        ...state,
        events: omit(state.events, action.id)
      };
    default:
      return state;
  }
};

export default events;
