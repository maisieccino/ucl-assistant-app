import axios from "axios";
import { ROOMS_URL, WORKSPACES_URL } from "../constants/API";

const roomsController = {
  search: async (token = null, query) => {
    if (query && query.length < 3) {
      return {};
    }
    try {
      const results = axios.get(ROOMS_URL, {
        params: {
          roomname: query,
        },
        headers: {
          authorization: `Bearer ${token}`,
          "uclapi-roombookings-version": "1",
        },
      });
      return results;
    } catch (error) {
      console.error(error);
    }
  },
};

const workspacesApi = axios.create({
  baseURL: WORKSPACES_URL,
});

const workspacesController = {
  getLiveImage: async (token = null, surveyId, mapId) => {
    try {
      const result = workspacesApi.get("/getliveimage/map.svg", {
        params: {
          survey_id: surveyId,
          map_id: mapId,
        },
        headers: {
          authorization: `Bearer ${token}`,
          "uclapi-workspaces-version": "1",
        },
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  },
};

export default {
  rooms: roomsController,
  workspaces: workspacesController,
};
