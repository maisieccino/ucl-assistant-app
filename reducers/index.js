import user, { initialState as userState } from "./userReducer";
import timetable, { initialState as timetableState } from "./timetableReducers";
import people, { initialState as peopleState } from "./peopleReducer";
import rooms, { initialState as roomsState } from "./roomsReducer";
import studyspaces, {
  initialState as studyspacesState,
} from "./studyspacesReducer";
import notifications, {
  initialState as notificationsState,
} from "./notificationsReducer";

export const initialState = {
  user: userState,
  timetable: timetableState,
  people: peopleState,
  rooms: roomsState,
  studyspaces: studyspacesState,
  notifications: notificationsState,
};

export default { user, timetable, people, rooms, studyspaces, notifications };
