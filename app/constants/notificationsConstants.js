export const NOTIFICATION_TYPE_DEFAULT = "default";
export const NOTIFICATION_TYPE_STUDYSPACE_CAPACITY = "studyspace-capacity";
export const NOTIFICATION_TYPE_SERVICE_UPDATE = "service-update";

export const NOTIFICATION_REGISTRATION_CHANGING =
  "NOTIFICATION_REGISTRATION_CHANGING";
export const NOTIFICATION_STATE_CHANGED = "NOTIFICATION_STATE_CHANGED ";
export const NOTIFICATION_STATE_CHANGE_ERROR =
  "NOTIFICATION_STATE_CHANGE_ERROR ";

export const NotificationType = {
  DEFAULT: NOTIFICATION_TYPE_DEFAULT,
  STUDYSPACE_CAPACITY: NOTIFICATION_TYPE_STUDYSPACE_CAPACITY,
  SERVICE_UPDATE: NOTIFICATION_TYPE_SERVICE_UPDATE,
};

export const actions = {
  STATE_CHANGING: NOTIFICATION_REGISTRATION_CHANGING,
  STATE_CHANGED: NOTIFICATION_STATE_CHANGED,
  STATE_CHANGE_ERROR: NOTIFICATION_STATE_CHANGE_ERROR,
};
