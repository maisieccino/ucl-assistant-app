import { WebBrowser } from "expo";

const openLink = url => WebBrowser.openBrowserAsync(url);

export default {
  openLink,
};
