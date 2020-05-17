import React from "react";
import MapView from "react-native-maps";
import OpenMap from "react-native-open-maps";

export default function Map(props) {
  const { location, name, height } = props;

  const openAppMap = () => {
    OpenMap({
      latitude: location.latitude,
      longitude: location.longitude,
      zoom: 19,
      query: name,
    });
  };

  return (
    <MapView
      style={{ width: "100%", height: height }}
      initialRegion={location}
      onPress={openAppMap}
      scrollEnabled={false}
    >
      <MapView.Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
      />
    </MapView>
  );
}
