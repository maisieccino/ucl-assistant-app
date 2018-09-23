/* eslint react-native/split-platform-components: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Platform, ToastAndroid } from "react-native";
import { FloatingHeartButton } from "../../components/Button";
import { toggleFavourite } from "../../actions/studyspacesActions";

class FavouriteButton extends Component {
  static propTypes = {
    toggleFavourite: PropTypes.func,
    id: PropTypes.number,
    favourites: PropTypes.arrayOf(PropTypes.number),
  };

  static defaultProps = {
    id: -1,
    toggleFavourite: () => {},
    favourites: [],
  };

  static mapStateToProps = state => ({
    favourites: state.studyspaces.favourites,
  });

  static mapDispatchToProps = dispatch => ({
    toggleFavourite: id => dispatch(toggleFavourite(id)),
  });

  componentDidUpdate(prevProps) {
    const wasFavourite = prevProps.favourites.includes(this.props.id);
    const isFavourite = this.props.favourites.includes(this.props.id);
    if (!wasFavourite && isFavourite && Platform.OS === "android") {
      ToastAndroid.show("Added to favourites", ToastAndroid.SHORT);
    }
  }

  render() {
    const isFavourite = this.props.favourites.includes(this.props.id);
    const { id } = this.props;
    return (
      <FloatingHeartButton
        active={isFavourite}
        onPress={() => this.props.toggleFavourite(id)}
      />
    );
  }
}

export default connect(
  FavouriteButton.mapStateToProps,
  FavouriteButton.mapDispatchToProps,
)(FavouriteButton);
