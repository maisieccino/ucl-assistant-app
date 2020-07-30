import { Action } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { AppStateType } from "../../configureStore"
import { PEOPLE_URL } from "../../constants/API"
import type { Person } from "../../types/uclapi"
import {
  PeopleActionTypes, PEOPLE_CLEAR_RECENTS,
  PEOPLE_IS_SEARCHING,
  PEOPLE_SEARCH_CLEAR,
  PEOPLE_SEARCH_FAILURE,
  PEOPLE_SEARCH_SUCCESS,
} from "../constants/peopleConstants"

export type PeopleThunkAction = ThunkAction<
  Promise<unknown>,
  AppStateType,
  unknown,
  Action<PeopleActionTypes>
>
export type PeopleDispatch = ThunkDispatch<unknown, unknown, PeopleActionTypes>

export const setIsSearching = (): PeopleActionTypes => ({
  type: PEOPLE_IS_SEARCHING,
})

export const searchFailure = (error: string): PeopleActionTypes => ({
  error,
  type: PEOPLE_SEARCH_FAILURE,
})

export const searchSuccess = (results: Array<Person>): PeopleActionTypes => ({
  results,
  type: PEOPLE_SEARCH_SUCCESS,
})

export const searchClear = (): PeopleActionTypes => ({
  type: PEOPLE_SEARCH_CLEAR,
})

export const search = (
  token = ``,
  query = ``,
): PeopleThunkAction => async (dispatch: PeopleDispatch): Promise<void> => {
  if (query && query.length <= 3) {
    return null
  }
  dispatch(setIsSearching())
  try {
    const res = await fetch(
      `${PEOPLE_URL}?query=${encodeURIComponent(query)}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    )
    const json = await res.json()
    if (!res.ok) {
      throw new Error(json.error || `There was a problem`)
    }
    dispatch(searchSuccess(json.content.people))
    return null
  } catch (error) {
    dispatch(
      searchFailure(error.message),
    )
    return null
  }
}

export const clearRecentResults = (): PeopleActionTypes => ({
  type: PEOPLE_CLEAR_RECENTS,
})
