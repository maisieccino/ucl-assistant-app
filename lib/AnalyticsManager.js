import Constants from "expo-constants";
import * as Amplitude from "expo-analytics-amplitude";

const AMPLITUDE_API_KEY =
  Constants.manifest.extra &&
  Constants.manifest.extra.amplitude &&
  Constants.manifest.extra.amplitude.apiKey
    ? Constants.manifest.extra.amplitude.apiKey
    : null;

const initialise = () => {
  if (AMPLITUDE_API_KEY) {
    Amplitude.initialize(AMPLITUDE_API_KEY);
  }
};

const setUserId = userId => {
  // make sure this is unique
  if (userId) {
    Amplitude.setUserId(userId);
  }
};

const setUserProperties = ({ ...userProperties }) => {
  Amplitude.setUserProperties({ ...userProperties });
};

const clearUserProperties = () => {
  Amplitude.clearUserProperties();
};

const logEvent = (eventName, eventProperties) => {
  if (eventProperties) {
    Amplitude.logEventWithProperties(eventName, eventProperties);
  } else {
    Amplitude.logEvent(eventName);
  }
};

export default {
  initialise,
  setUserId,
  setUserProperties,
  clearUserProperties,
  logEvent,
};
