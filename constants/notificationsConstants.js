export const NOTIFICATION_TYPE_DEFAULT = "default";
export const NOTIFICATION_TYPE_STUDYSPACE_CAPACITY = "studyspace-capacity";
export const NOTIFICATION_TYPE_SERVICE_UPDATE = "service-update";
export const NOTIFICATION_TYPE_BROADCAST = "broadcast";
export const NOTIFICATION_TYPE_TIMETABLE_EVENT_REMINDER =
  "timetable-event-reminder";

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

export const NotificationChannels = {
  DEFAULT: {
    id: NOTIFICATION_TYPE_DEFAULT,
    options: {
      name: "Miscellaneous notifications",
      sound: true,
      vibrate: true,
    },
  },
  STUDYSPACE_CAPACITY: {
    id: NOTIFICATION_TYPE_STUDYSPACE_CAPACITY,
    options: {
      name: "Service updates",
      sound: false,
      vibrate: false,
      description: "UCL Assistant service updates.",
      priority: "low",
      badge: false,
    },
  },
  TIMETABLE_EVENT: {
    id: NOTIFICATION_TYPE_TIMETABLE_EVENT_REMINDER,
    options: {
      name: "Timetable event reminders",
      description: "Reminders for events on your timetable",
      sound: true,
      vibrate: true,
      priority: "max",
      badge: true,
    },
  },
};

export const actions = {
  STATE_CHANGING: NOTIFICATION_REGISTRATION_CHANGING,
  STATE_CHANGED: NOTIFICATION_STATE_CHANGED,
  STATE_CHANGE_ERROR: NOTIFICATION_STATE_CHANGE_ERROR,
};
