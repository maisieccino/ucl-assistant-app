import { PEOPLE_URL } from "../constants/API"
import {
  PEOPLE_CLEAR_RECENTS,
  PEOPLE_FETCH_FAILURE,
  PEOPLE_FETCH_SUCCESS,
  PEOPLE_IS_FETCHING,
  PEOPLE_IS_SEARCHING,
  PEOPLE_SEARCH_CLEAR,
  PEOPLE_SEARCH_FAILURE,
  PEOPLE_SEARCH_SUCCESS,
} from "../constants/peopleConstants"

export const setIsSearching = () => ({
  type: PEOPLE_IS_SEARCHING,
})

export const searchFailure = (error) => ({
  error,
  type: PEOPLE_SEARCH_FAILURE,
})

export const searchSuccess = (results) => ({
  results,
  type: PEOPLE_SEARCH_SUCCESS,
})

export const searchClear = () => ({
  type: PEOPLE_SEARCH_CLEAR,
})

export const search = (token = null, query) => async (dispatch) => {
  if (query && query.length <= 3) {
    return {}
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
    return dispatch(searchSuccess(json.content.people))
  } catch (error) {
    return dispatch(
      searchFailure(typeof error === `string` ? error : error.message),
    )
  }
}

export const setIsFetching = () => ({
  type: PEOPLE_IS_FETCHING,
})

export const fetchFailure = (error) => ({
  error,
  type: PEOPLE_FETCH_FAILURE,
})

export const fetchSuccess = (person) => ({
  person,
  type: PEOPLE_FETCH_SUCCESS,
})

export const fetchPerson = (token = null, email) => async (dispatch) => {
  dispatch(setIsFetching())
  try {
    const res = await fetch(
      `${PEOPLE_URL}?query=${encodeURIComponent(email)}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    )
    const json = await res.json()
    if (!res.ok) {
      throw new Error(json.error || `There was a problem!`)
    }
    return dispatch(fetchSuccess(json.content.people[0]))
  } catch (error) {
    return dispatch(
      fetchFailure(typeof error === `string` ? error : error.message),
    )
  }
}

export const clear = () => ({
  type: `CLEAR`,
})

export const clearRecents = () => ({
  type: PEOPLE_CLEAR_RECENTS,
})
