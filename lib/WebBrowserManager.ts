import * as WebBrowser from "expo-web-browser"

const openLink = (
  url: string,
): Promise<WebBrowser.WebBrowserResult> => WebBrowser.openBrowserAsync(url)

export default {
  openLink,
}
