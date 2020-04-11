import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Dimensions, View, Text } from "react-native";
import { Image, Icon } from "react-native-elements";
import MapView, { Marker, Callout } from "react-native-maps";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get("window");

export default function SaleMap() {
  const [sales, setSales] = useState([]);

  const centerLocation = {
    latitude: -31.653788758943733,
    latitudeDelta: 0.0053262862751375337,
    longitude: -60.70879757890222,
    longitudeDelta: 0.0050000000000331966,
  };

  //recupera los datos de ofertas
  useEffect(() => {
    (async () => {
      const resultSales = [];
      const salesDB = db.collection("sales");

      await salesDB
        .get()
        .then((response) => {
          response.forEach((doc) => {
            let sale = doc.data();
            sale.id = doc.id;
            resultSales.push({ sale });
          });
          setSales(resultSales);
        })
        .catch((e) => console.log("ERROR: ", e));
    })();
  }, []);

  return (
    <ScrollView>
      <MapView
        style={{ width: "100%", height: screenWidth.height }}
        initialRegion={centerLocation}
        showsUserLocation
      >
        {sales.map(({ sale }, index) => (
          <Marker
            key={index}
            title={sale.name}
            description={sale.address}
            coordinate={sale.location}
          >
            <MarkerView />
            <MarkerCallout sale={sale} />
          </Marker>
        ))}
      </MapView>
    </ScrollView>
  );
}

function MarkerView(props) {
  return (
    <View>
      <Icon
        name="map-marker-radius"
        type="material-community"
        size={20}
        color="#319bb4"
        reverse
      />
    </View>
  );
}

function MarkerCallout(props) {
  const { sale } = props;
  //TODO: falta conseguir la imagen real
  const test_url =
    "https://firebasestorage.googleapis.com/v0/b/graduados-a7240.appspot.com/o/sale-images%2F58b052f9-1cb7-48fe-822e-6798907341a1?alt=media&token=d5298279-fb3e-43af-881a-406d35119645";

  return (
    <Callout style={styles.callout}>
      <View>
        <Image source={{ uri: test_url }} style={styles.calloutImage} />
        <View style={styles.calloutView}>
          <Text style={styles.calloutName}>{sale.name}</Text>
          <Text style={styles.calloutAddress}>{sale.address}</Text>
        </View>
      </View>
    </Callout>
  );
}

const styles = StyleSheet.create({
  callout: {
    flex: -1,
    position: "absolute",
    width: 220,
  },
  calloutView: {
    marginLeft: 10,
    marginTop: 10,
  },
  calloutImage: {
    height: 190,
    width: 220,
  },
  calloutName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  calloutAddress: {
    marginTop: 5,
    marginBottom: 10,
    color: "grey",
  },
});
