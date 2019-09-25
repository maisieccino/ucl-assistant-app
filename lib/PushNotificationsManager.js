import axios from "axios"
import { Notifications } from "expo"
import Constants from "expo-constants"
import * as Permissions from "expo-permissions"

import { ASSISTANT_API_URL } from "../constants/API"
import ErrorManager from "./ErrorManager"

const registerForPushNotifications = async (token) => {
  if (!Constants.isDevice) {
    console.log(`Remote notifications do not work in simulators, only on physical devices`)
    return null
  }

  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS,
  )

  let finalStatus = existingStatus

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== `granted`) {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== `granted`) {
    console.log(`User did not grant push notifications permissions`)
    return null
  }

  // Get the token that uniquely identifies this device
  const pushToken = await Notifications.getExpoPushTokenAsync()

  try {
    const resp = await axios.post(`${ASSISTANT_API_URL}/notifications/register`, {
      data: { token: pushToken },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(`Registered for push notifications: `, await resp.data)
  } catch (error) {
    console.log(
      `${ASSISTANT_API_URL}/notifications/register`,
      { token: pushToken },
      `Bearer ${token}`
    )
    ErrorManager.captureError(error)
    throw error
  }
  return null
}

export default {
  registerForPushNotifications,
}
