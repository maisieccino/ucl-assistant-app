import { Linking } from "react-native";

const navigateToCoords = ({ lat, lng }) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  Linking.openURL(url);
};

const navigateToAddress = address => {
  const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
  Linking.openURL(url);
};

export default {
  navigateToAddress,
  navigateToCoords,
};
