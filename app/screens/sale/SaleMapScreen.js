import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, ScrollView, Dimensions, View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Image, Icon } from "react-native-elements";
import MapView, { Marker, Callout } from "react-native-maps";
import UserNoLogged from "../../components/account/UserNoLoged";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get("window");

export default function SaleMap(props) {
  const [sales, setSales] = useState([]);
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const [reloadData, setReloadData] = useState(false);

  const centerLocation = {
    latitude: -31.653788758943733,
    latitudeDelta: 0.0053262862751375337,
    longitude: -60.70879757890222,
    longitudeDelta: 0.0050000000000331966,
  };

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useFocusEffect(
    useCallback(() => {
      if (userLogged) {
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
      }
      setReloadData(false);
    }, [userLogged, reloadData])
  );

  if (!userLogged) {
    return <UserNoLogged navigation={navigation} />;
  }

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
            <MarkerCallout navigation={navigation} sale={sale} />
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
  const { sale, navigation } = props;
  const [imageSale, setImageSale] = useState(null);

  useEffect(() => {
    const image = sale.images[0];
    firebase
      .storage()
      .ref(`sale-images/${image}`)
      .getDownloadURL()
      .then((result) => {
        setImageSale(result);
      })
      .catch((e) => console.log("error userEffect: ", e));
  });
  return (
    <Callout
      style={styles.callout}
      onPress={() => navigation.push("sale-detail", { sale })}
    >
      <View>
        <Image
          source={imageSale && { uri: imageSale }}
          style={styles.calloutImage}
        />
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
