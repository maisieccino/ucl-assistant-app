import {
  DECLINE_PUSH_NOTIFICATIONS,
  IS_SIGNING_IN,
  SET_EXPO_PUSH_TOKEN,
  SIGN_IN_CANCEL,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_OUT_USER,
  SET_SHOULD_TRACK_ANALYTICS,
} from "../../constants/userConstants"
import signIn, { initialState as signInState } from "./signInReducer"

export const initialState = {
  apiToken: ``,
  cn: ``,
  declinePushNotifications: false,
  department: ``,
  email: ``,
  expoPushToken: ``,
  fullName: ``,
  givenName: ``,
  scopeNumber: -1,
  signIn: signInState,
  token: ``,
  upi: ``,
  settings: {
    shouldTrackAnalytics: true
  }
}

/**
 * Combines user state together into a single state object.
 * @param {The current Redux state} state
 * @param {The dispatched action} action
 * @param {(Optional) When true, reset user values to the initial values.} clearUser
 */
const combineState = (state, action, clearUser = false) => ({
  ...(clearUser ? initialState : state),
  signIn: signIn(state.signIn, action),
})

export default (state = initialState, action = null) => {
  const { type, user } = action
  switch (type) {
    case IS_SIGNING_IN: {
      return {
        ...combineState(state, action, true),
      }
    }
    case SIGN_IN_SUCCESS: {
      return {
        ...combineState(state, action),
        ...user,
      }
    }
    case SIGN_IN_CANCEL:
    case SIGN_IN_FAILURE: {
      return combineState(state, action)
    }

    case SIGN_OUT_USER: {
      return initialState
    }

    case DECLINE_PUSH_NOTIFICATIONS: {
      return { ...state, declinePushNotifications: true }
    }

    case SET_EXPO_PUSH_TOKEN: {
      const { pushToken } = action
      return { ...state, expoPushToken: pushToken }
    }

    case SET_SHOULD_TRACK_ANALYTICS: {
      const { shouldTrack } = action
      return { ...state, settings: {...state.settings, shouldTrackAnalytics: shouldTrack} }
    }

    default: {
      return state
    }
  }
}
