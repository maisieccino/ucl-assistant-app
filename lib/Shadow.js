import { Platform } from "react-native" // eslint-disable-line import/no-extraneous-dependencies

const Shadow = elevation => Platform.OS === `android` ? {
  elevation,
} : {
    shadowOpacity: 0.0015 * elevation + 0.18,
    shadowRadius: 0.54 * elevation,
    shadowOffset: {
      height: 0.6 * elevation,
    },
    shadowColor: `#000`,
  }

export default Shadow
