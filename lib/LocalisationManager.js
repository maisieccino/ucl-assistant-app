// eslint-disable-next-line import/no-extraneous-dependencies
import * as Localization from "expo-localization"
import Timezones from "../constants/Timezones"

const getTimezone = () => Localization.timezone
const isLondon = () => getTimezone() === Timezones.London

export default {
  getTimezone,
  isLondon,
}
