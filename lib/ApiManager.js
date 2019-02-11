import axios from "axios";
import { ROOMS_URL } from "../constants/API";

const roomsController = {
  search: async (token = null, query) => {
    if (query && query.length < 3) {
      return {};
    }
    try {
      const results = axios.get(ROOMS_URL, {
        params: {
          token,
          roomname: query,
        },
        headers: {
          "uclapi-roombookings-version": "1",
        },
      });
      return results;
    } catch (error) {
      console.error(error);
    }
  },
};

export default {
  rooms: roomsController,
};
