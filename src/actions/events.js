import keyMirror from "keymirror";

export const ActionTypes = keyMirror({
  CREATE_EVENT: null,
  UPDATE_EVENT: null,
  DELETE_EVENT: null
});

const _createCreateEventAction = (name, start, end) => ({
  type: ActionTypes.CREATE_EVENT,
  name,
  start,
  end
});

const _createUpdateEventAction = (id, name, start, end) => ({
  type: ActionTypes.UPDATE_EVENT,
  id,
  name,
  start,
  end
});

const _createDeleteEventAction = id => ({
  type: ActionTypes.DELETE_EVENT,
  id
});

/**
 * Results in a new event being added to redux.
 * @param {String} name
 * @param {Date} start
 * @param {Date} end
 */
export const createEvent = (name, start, end) => dispatch => {
  dispatch(_createCreateEventAction(name, start, end));
};

/**
 * Updates an existing event based on provided ID.
 * @param {Integer} id
 * @param {String} name
 * @param {Date} start
 * @param {Date} end
 */
export const updateEvent = (id, name, start, end) => dispatch => {
  dispatch(_createUpdateEventAction(id, name, start, end));
};

/**
 * Remove specified event from redux store.
 * @param {Integer} id
 */
export const deleteEvent = id => dispatch => {
  dispatch(_createDeleteEventAction(id));
};
