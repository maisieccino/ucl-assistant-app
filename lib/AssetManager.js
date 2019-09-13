import { Feather } from "@expo/vector-icons"

const uclapi = {
  iconForeground: require(`../assets/images/icon-fg.png`),
  splash: require(`../assets/images/splash.png`),
  smallIcon: require(`../assets/images/uclapi.png`),
}

const undraw = {
  calendar: require(`../assets/images/undraw_calendar.png`),
  chilling: require(`../assets/images/undraw_chilling.png`),
  dogWalking: require(`../assets/images/undraw_dog_walking.png`),
  playfulCat: require(`../assets/images/undraw_playful_cat.png`),
  relaxation: require(`../assets/images/undraw_relaxation.png`),
  relaxingAtHome: require(`../assets/images/undraw_relaxing_at_home.png`),
  graduation: require(`../assets/images/undraw_graduation.png`),
  buildingBlocks: require(`../assets/images/undraw_building_blocks.png`),
  peopleSearch: require(`../assets/images/undraw_people_search.png`),
  studying: require(`../assets/images/undraw_studying.png`),
}

const font = {
  ...Feather.font,
  apercu: require(`../assets/fonts/somerandomfont.otf`),
  "apercu-bold": require(`../assets/fonts/somerandomfont-Bold.otf`),
  "apercu-light": require(`../assets/fonts/somerandomfont-Light.otf`),
}

export default {
  uclapi,
  undraw,
  font,
}
