import { Localization } from "expo";

const TZ_LONDON = "Europe/London";

const getTimezone = () => Localization.timezone;
const isLondon = () => getTimezone() === TZ_LONDON;

module.exports = {
  getTimezone,
  isLondon,
};
