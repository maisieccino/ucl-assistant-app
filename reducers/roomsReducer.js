import {
  ROOMS_ADD_RECENT,
  ROOMS_CLEAR_RECENTS,
  ROOMS_MAX_RECENTS,
} from "../constants/roomsConstants";

import { addToRecents } from "./utils";

export const initialState = {
  recents: [],
};

export default (state = initialState, action = null) => {
  const { type, room } = action;
  switch (type) {
    case ROOMS_ADD_RECENT: {
      const newRecents = addToRecents(state.recents, room, ROOMS_MAX_RECENTS);
      return { ...state, recents: newRecents };
    }

    case ROOMS_CLEAR_RECENTS: {
      return { ...state, recents: [] };
    }

    default:
      return state;
  }
};
