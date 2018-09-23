import { actions } from "../constants/notificationsConstants";

export const initialState = {
  registered: false,
  stateChanging: false,
  stateChangeError: "",
  notifications: [],
};

export default (state = initialState, action = null) => {
  const { type, registered, error } = action;
  switch (type) {
    case actions.STATE_CHANGING: {
      return {
        ...state,
        stateChanging: true,
        stateChangeError: "",
      };
    }

    case actions.STATE_CHANGED: {
      return {
        ...state,
        stateChanging: false,
        registered,
      };
    }

    case actions.STATE_CHANGE_ERROR: {
      return {
        stateChanging: false,
        stateChangeError: error,
      };
    }

    default: {
      return state;
    }
  }
};
