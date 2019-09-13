import Sentry from "sentry-expo"

const initialise = () => {
  if (!__DEV__) {
    Sentry.config(
      // eslint-disable-next-line no-secrets/no-secrets
      `https://329dca168bf14b1fbcf0eb462ce86dc6@sentry.io/1379891`,
    ).install()
  }
}

const captureError = (error) => {
  if (!__DEV__) {
    Sentry.captureException(error)
  } else {
    console.error(error)
  }
}

export default {
  initialise,
  captureError,
}
