// @flow
import {
  ROOMS_ADD_RECENT,
  ROOMS_CLEAR_RECENTS,
  ROOMS_TOGGLE_FAVOURITE,
} from "../constants/roomsConstants"

export const addRecent = (room) => ({
  room,
  type: ROOMS_ADD_RECENT,
})

export const clearRecents = () => ({
  type: ROOMS_CLEAR_RECENTS,
})

export const toggleFavourite = (room) => ({
  room,
  type: ROOMS_TOGGLE_FAVOURITE,
})
