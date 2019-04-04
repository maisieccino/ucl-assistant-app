import {
  ROOMS_ADD_RECENT,
  ROOMS_CLEAR_RECENTS,
} from "../constants/roomsConstants";

export const addRecent = room => ({
  type: ROOMS_ADD_RECENT,
  room,
});

export const clearRecents = () => ({
  type: ROOMS_CLEAR_RECENTS,
});
