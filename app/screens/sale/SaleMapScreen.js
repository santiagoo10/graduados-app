import React from "react";
import { ScrollView, Dimensions } from "react-native";
import MapView from "react-native-maps";

const screenWidth = Dimensions.get("window").height;

export default function SaleMap() {
  //TODO: falta consultar todos los beneficios y hacer un marker por cada uno.

  const location = {
    latitude: -31.653788758943733,
    latitudeDelta: 0.0013262862751375337,
    longitude: -60.70879757890222,
    longitudeDelta: 0.0010000000000331966,
  };

  return (
    <ScrollView>
      <MapView
        style={{ width: "100%", height: screenWidth }}
        initialRegion={location}
        //onPress={openAppMap}
      >
        <MapView.Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
      </MapView>
    </ScrollView>
  );
}
