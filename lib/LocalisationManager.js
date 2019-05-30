import { Localization } from "expo";
import Timezones from "../constants/Timezones";

const getTimezone = () => Localization.timezone;
const isLondon = () => getTimezone() === Timezones.London;

module.exports = {
  getTimezone,
  isLondon,
};
