import { Dimensions, Platform, StyleSheet, StatusBar } from "react-native";
import Colors from "../constants/Colors";
import { BORDER_RADIUS } from "../constants/styleConstants";

const { height, width } = Dimensions.get("window");

const cardShared = {
  padding: 10,
  backgroundColor: Colors.cardBackground,
  elevation: 3,
  marginBottom: 5,
  marginTop: 5,
  borderRadius: BORDER_RADIUS,
  shadowColor: Colors.textColor,
  shadowOffset: { width: 0, height: 3 },
  shadowRadius: 3,
  shadowOpacity: 0.5,
  marginLeft: Platform.OS === "ios" ? 1 : 0,
  marginRight: Platform.OS === "ios" ? 1 : 0,
};

export default StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.pageBackground,
    height,
    width,
  },
  pageNoScrollContainer: {
    paddingTop: 10,
  },
  mainTab: {
    paddingTop: StatusBar.currentHeight,
  },
  app: {
    flex: 1,
    backgroundColor: Colors.pageBackground,
  },
  page: {
    flex: 1,
    backgroundColor: Colors.pageBackground,
    paddingLeft: 20,
    paddingRight: 20,
  },
  pageScrollView: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  pageScrollContent: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  spacer: {
    flex: 1,
  },
  card: StyleSheet.flatten([
    cardShared,
    {
      flexDirection: "column",
    },
  ]),
  oldCard: StyleSheet.flatten([
    cardShared,
    {
      flexDirection: "column",
      backgroundColor: Colors.oldCardBackground,
    },
  ]),
  resultCard: StyleSheet.flatten([
    cardShared,
    {
      marginTop: 5,
      marginBottom: 10,
      marginLeft: 2,
      marginRight: 2,
    },
  ]),
  horizontal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    alignSelf: "stretch",
    marginTop: 50,
    backgroundColor: "rgba(0,0,0,0)",
  },
  paddedIcon: {
    marginLeft: 5,
    marginRight: 5,
  },
  circularIcon: {
    marginRight: 10,
    backgroundColor: Colors.textInputBackground,
    padding: 10,
    borderRadius: 80,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderColor: Colors.textColor,
    borderWidth: 1,
  },
  liveIndicator: {
    flex: 0,
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginRight: 5,
    borderRadius: 5,
  },
  mainTabBlur: {
    left: 0,
    right: 0,
    bottom: 0,
    top: undefined,
    height: 60,
  },
});
