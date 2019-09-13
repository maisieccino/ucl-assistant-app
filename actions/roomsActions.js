// @flow
import {
  ROOMS_ADD_RECENT,
  ROOMS_CLEAR_RECENTS,
  ROOMS_TOGGLE_FAVOURITE,
} from "../constants/roomsConstants"

export const addRecent = (room) => ({
  type: ROOMS_ADD_RECENT,
  room,
})

export const clearRecents = () => ({
  type: ROOMS_CLEAR_RECENTS,
})

export const toggleFavourite = (id: String) => ({
  id,
  type: ROOMS_TOGGLE_FAVOURITE,
})
