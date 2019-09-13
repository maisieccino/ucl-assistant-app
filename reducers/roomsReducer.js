import {
  ROOMS_ADD_RECENT,
  ROOMS_CLEAR_RECENTS,
  ROOMS_MAX_RECENTS,
  ROOMS_TOGGLE_FAVOURITE,
} from "../constants/roomsConstants"

import { addToRecents } from "./utils"

export const initialState = {
  recents: [],
  favourites: [],
}

export default (state = initialState, action = null) => {
  const { type } = action
  switch (type) {
    case ROOMS_ADD_RECENT: {
      const { room } = action
      const newRecents = addToRecents(state.recents, room, ROOMS_MAX_RECENTS)
      return { ...state, recents: newRecents }
    }

    case ROOMS_CLEAR_RECENTS: {
      return { ...state, recents: [] }
    }

    case ROOMS_TOGGLE_FAVOURITE: {
      const { id } = action
      if (id) {
        if (!Array.isArray(state.favourites)) {
          return {
            ...state,
            favourites: [id],
          }
        }
        return {
          ...state,
          favourites: state.favourites.includes(id)
            ? state.favourites.filter((x) => x !== id)
            : [...state.favourites, id],
        }
      }
      return state
    }

    default:
      return state
  }
}
