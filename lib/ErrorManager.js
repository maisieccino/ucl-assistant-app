import Constants from 'expo-constants'
import * as Sentry from "sentry-expo"

const initialise = () => {
  if (!__DEV__) {
    const { extra: { sentry: { dsn } = {} } = {} } = Constants.manifest
    Sentry.init({
      dsn,
    })

    const { revisionId } = Constants.manifest
    if (typeof revisionId === `string` && revisionId.length > 0) {
      Sentry.setRelease(revisionId)
    }
  }
}

const addDetail = (details) => {
  if (!__DEV__) {
    Sentry.addBreadcrumb({
      ...details,
    })
  } else {
    console.info(`ErrorManager.addDetail`, details)
  }
}

const captureError = (error, details) => {
  if (!__DEV__) {
    if (details) {
      Sentry.withScope((scope) => {
        if (typeof details === `object`) {
          Object.entries(details).forEach(([attr, val]) => {
            scope.setExtra(attr, val)
          })
        } else {
          scope.setExtra(`details`, details)
        }
        Sentry.captureException(error)
      })
    } else {
      Sentry.captureException(error)
    }
  } else {
    console.error(`ErrorManager.captureError`, error)
  }
}

const setUser = (user) => {
  if (!__DEV__ && user) {
    Sentry.setUser(user)
  }
}

export default {
  addDetail,
  captureError,
  initialise,
  setUser,
}
