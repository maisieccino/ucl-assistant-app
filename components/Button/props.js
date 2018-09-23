import PropTypes from "prop-types";
import { ViewPropTypes } from "react-native";

export const propTypes = {
  onPress: PropTypes.func,
  loading: PropTypes.bool,
  style: ViewPropTypes.style,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

export const defaultProps = {
  onPress: () => {},
  loading: false,
  style: {},
  children: "",
  disabled: false,
};
