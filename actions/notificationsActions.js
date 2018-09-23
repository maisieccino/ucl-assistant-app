import { Notifications, Permissions } from "expo";
import { actions } from "../constants/notificationsConstants";
import { NOTIFICATIONS_URL } from "../constants/API";

export const registrationChanging = () => ({
  type: actions.STATE_CHANGING,
});

export const registrationStateChanged = registered => ({
  type: actions.STATE_CHANGED,
  registered,
});

export const registrationStateError = error => ({
  type: actions.STATE_CHANGE_ERROR,
  error,
});

export const registerForNotifications = token => async dispatch => {
  console.log(token);
  await dispatch(registrationChanging());
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS,
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    return dispatch(registrationStateChanged(false));
  }
  const pushToken = await Notifications.getExpoPushTokenAsync();
  try {
    const res = await fetch(`${NOTIFICATIONS_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({ token: pushToken }),
    });
    if (!res.ok) {
      return dispatch(registrationStateError(await res.text()));
    }
    return dispatch(registrationStateChanged(true));
  } catch (error) {
    return dispatch(registrationStateError(error.message));
  }
};
