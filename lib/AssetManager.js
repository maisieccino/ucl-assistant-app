import { Feather } from "@expo/vector-icons"

const undraw = {
  calendar: require(`./assets/images/undraw_calendar.png`),
  relaxation: require(`./assets/images/undraw_relaxation.png`),
  graduation: require(`./assets/images/undraw_graduation.png`),
  buildingBlocks: require(`./assets/images/undraw_building_blocks.png`),
}

const font = {
  ...Feather.font,
  apercu: require(`./assets/fonts/somerandomfont.otf`),
  "apercu-bold": require(`./assets/fonts/somerandomfont-Bold.otf`),
  "apercu-light": require(`./assets/fonts/somerandomfont-Light.otf`),
}

export default {
  undraw,
  font,
}
