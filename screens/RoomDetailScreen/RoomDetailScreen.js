import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { MapView } from "expo";
import PropTypes from "prop-types";
import MapsManager from "../../lib/MapsManager";
import Button from "../../components/Button";
import { Page, Horizontal } from "../../components/Containers";
import {
  BodyText,
  TitleText,
  ErrorText,
  SubtitleText,
} from "../../components/Typography";
import MapStyle from "../../styles/Map";
import ApiManager from "../../lib/ApiManager";

const styles = StyleSheet.create({
  address: {
    marginVertical: 20,
  },
  container: {
    flex: 1,
  },
  coordinatesError: {
    marginBottom: 10,
  },
  details: {
    justifyContent: "space-between",
    marginTop: 20,
  },
  equipmentList: {
    marginTop: 20,
  },
  padder: {
    height: 20,
  },
});

const initialRegion = {
  latitude: 51.5246586,
  longitude: -0.1339784,
  latitudeDelta: 0.0012,
  longitudeDelta: 0.0071,
};

class RoomDetailScreen extends Component {
  static navigationOptions = {
    title: "Room Detail",
  };
  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    token: PropTypes.string,
  };
  static defaultProps = {
    token: "",
  };
  static mapStateToProps = state => ({
    token: state.user.token,
  });
  constructor() {
    super();
    this.state = {
      roombookings: [],
      equipment: [],
      fetchEquipmentError: null,
    };
  }
  componentDidMount() {
    const { token, navigation } = this.props;
    const { room } = navigation.state.params;
    const { roomid, siteid } = room;
    this.fetchEquipment(token, roomid, siteid);
  }
  fetchEquipment = async (token, roomid, siteid) => {
    try {
      const equipment = await ApiManager.rooms.getEquipment(
        token,
        roomid,
        siteid,
      );
      this.setState({ equipment });
    } catch (error) {
      this.setState({ fetchEquipmentError: error.message });
    }
  };
  renderEquipment = ({ description, units }) => {
    if (description === "Wheelchair accessible") {
      return (
        <BodyText key={description}>
          This room is accessible via wheelchair
        </BodyText>
      );
    }
    return (
      <BodyText key={description}>
        {units} x {description}
      </BodyText>
    );
  };
  render() {
    const { equipment, fetchEquipmentError } = this.state;
    const { room } = this.props.navigation.state.params;
    const {
      roomname: name,
      classification_name: classification,
      capacity,
      location,
    } = room;
    const { address } = location;
    const addressString = address.filter(str => str.length > 0).join("\n");

    let { latitude, longitude } = initialRegion;
    let invalidCoordinates = false;

    if (
      location.coordinates &&
      location.coordinates.lat &&
      location.coordinates.lng
    ) {
      const { lat, lng } = location.coordinates;
      latitude = Number.parseFloat(lat, 10);
      longitude = Number.parseFloat(lng, 10);
    } else {
      invalidCoordinates = true;
    }

    const navigateToLocation = () =>
      invalidCoordinates
        ? MapsManager.navigateToAddress(addressString)
        : MapsManager.navigateToCoords({ lat: latitude, lng: longitude });

    return (
      <View style={styles.container}>
        <Page>
          <TitleText>{name}</TitleText>
          <Horizontal style={styles.details}>
            <BodyText>{classification}</BodyText>
            <BodyText>Capacity: {capacity}</BodyText>
          </Horizontal>
          <View style={styles.address}>
            <BodyText>{addressString}</BodyText>
          </View>
          {invalidCoordinates ? (
            <View style={styles.coordinatesError}>
              <ErrorText>
                Error: We couldn{"'"}t fetch coordinates for this venue, so the
                location displayed on the map may be incorrect.
              </ErrorText>
            </View>
          ) : null}
          <MapView
            style={MapStyle.wideMap}
            initialRegion={initialRegion}
            region={{
              latitude,
              longitude,
              latitudeDelta: initialRegion.latitudeDelta,
              longitudeDelta: initialRegion.longitudeDelta,
            }}
          >
            <MapView.Marker coordinate={{ latitude, longitude }} />
          </MapView>
          <View style={styles.navigate}>
            <Button onPress={navigateToLocation}>Directions</Button>
          </View>
          {fetchEquipmentError ? (
            <ErrorText>
              Error: We couldn{"'"}t fetch equipment data for this venue.
            </ErrorText>
          ) : null}
          {equipment.length > 0 ? (
            <View style={styles.equipmentList}>
              <SubtitleText>In This Room</SubtitleText>
              {equipment.map(this.renderEquipment)}
            </View>
          ) : null}
          <View style={styles.padder} />
        </Page>
      </View>
    );
  }
}

export default connect(
  RoomDetailScreen.mapStateToProps,
  () => ({}),
)(RoomDetailScreen);
