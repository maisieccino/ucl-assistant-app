/* eslint react-native/no-inline-styles: 0 */
import React from "react"
import PropTypes from "prop-types"
import { ViewPropTypes, TouchableOpacity, View } from "react-native"

import { Horizontal, CircularIcon } from "../Containers"
import { SearchResultTopText, SearchResultBottomText } from "../Typography"
import Colors from "../../constants/Colors"
import Indicator from "./Indicator"
import Styles from "../../styles/Containers"

const getIcon = (type) => {
  switch (type) {
    case `location`:
      return `map-pin`
    case `person`:
      return `user`
    default:
      return `search`
  }
}

const SearchResult = ({
  style,
  type,
  topText,
  bottomText,
  onPress,
  indicator,
  indicatorColor,
  indicatorLoading,
}) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Horizontal style={[Styles.resultCard, style]}>
        <CircularIcon name={getIcon(type)} size={24} />
        {indicator && (
          <Indicator color={indicatorColor} loading={indicatorLoading} />
        )}
        <View style={{ flex: 1 }}>
          <SearchResultTopText>{topText}</SearchResultTopText>
          <SearchResultBottomText>{bottomText}</SearchResultBottomText>
        </View>
      </Horizontal>
    </TouchableOpacity>
)

SearchResult.propTypes = {
  style: ViewPropTypes.style,
  type: PropTypes.oneOf([`location`, `person`, ``]),
  topText: PropTypes.string,
  bottomText: PropTypes.string,
  onPress: PropTypes.func,
  indicator: PropTypes.bool,
  indicatorColor: PropTypes.string,
  indicatorLoading: PropTypes.bool,
}
SearchResult.defaultProps = {
  style: {},
  type: ``,
  topText: ``,
  bottomText: ``,
  onPress: () => { },
  indicator: false,
  indicatorColor: Colors.textInputBackground,
  indicatorLoading: false,
}

export default SearchResult
