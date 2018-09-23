import {
  PEOPLE_IS_SEARCHING,
  PEOPLE_SEARCH_CLEAR,
  PEOPLE_SEARCH_FAILURE,
  PEOPLE_SEARCH_SUCCESS,
  PEOPLE_IS_FETCHING,
  PEOPLE_FETCH_SUCCESS,
  PEOPLE_FETCH_FAILURE,
  PEOPLE_MAX_RECENTS,
  PEOPLE_CLEAR_RECENTS,
} from "../constants/peopleConstants";

const deepCompare = (fst, snd) => {
  const keys = Object.keys(fst);
  if (keys.length !== Object.keys(snd).length) {
    return false;
  }
  return keys.reduce((res, key) => res && fst[key] === snd[key], true);
};

const addToRecents = (recents = [], person) => {
  if (recents.filter(recent => deepCompare(recent, person)).length > 0) {
    return recents;
  }
  const newRecents = [person, ...recents];
  while (newRecents.length > PEOPLE_MAX_RECENTS) {
    newRecents.pop();
  }
  return newRecents;
};

export const initialState = {
  isSearching: false,
  isFetching: false,
  searchError: "",
  fetchError: "",
  searchResults: [],
  recents: [],
  person: {},
};

export default (state = initialState, action = null) => {
  const { type, results, error, person } = action;

  switch (type) {
    case "CLEAR": {
      return { ...initialState };
    }

    case PEOPLE_IS_SEARCHING: {
      return { ...state, isSearching: true, searchError: "" };
    }

    case PEOPLE_SEARCH_FAILURE: {
      return {
        ...state,
        searchResults: [],
        isSearching: false,
        searchError: error,
      };
    }

    case PEOPLE_SEARCH_SUCCESS: {
      return { ...state, searchResults: results, isSearching: false };
    }

    case PEOPLE_SEARCH_CLEAR: {
      return { ...state, searchResults: [] };
    }

    case PEOPLE_IS_FETCHING: {
      return { ...state, isFetching: true, fetchError: "" };
    }

    case PEOPLE_FETCH_FAILURE: {
      return { ...state, isFetching: false, fetchError: error };
    }

    case PEOPLE_FETCH_SUCCESS: {
      const newRecents = addToRecents(state.recents, person);
      return { ...state, isFetching: false, person, recents: newRecents };
    }

    case PEOPLE_CLEAR_RECENTS: {
      return { ...state, recents: [] };
    }

    default:
      return state;
  }
};
