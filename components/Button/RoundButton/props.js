import PropTypes from "prop-types";
import { ViewPropTypes } from "react-native";

export const propTypes = {
  onPress: PropTypes.func,
  loading: PropTypes.bool,
  styles: ViewPropTypes.style,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
};

export const defaultProps = {
  onPress: () => {},
  loading: false,
  styles: {},
  children: "",
  disabled: false,
  icon: "bell",
};
