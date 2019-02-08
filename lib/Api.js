import axios from "axios";
import { ROOMS_URL } from "../constants/API";

const roomsApi = axios.create({
  baseURL: ROOMS_URL,
});

const roomsController = {
  search: async (token = null, query) => {
    if (query && query.length < 3) {
      return {};
    }
    try {
      const results = roomsApi.get("/rooms", {
        token,
        roomname: query,
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
