import React, { useEffect, useState } from "react";
import { ScrollView, Dimensions, View, Text } from "react-native";
import { Image, Icon } from "react-native-elements";
import MapView, { Marker, Callout } from "react-native-maps";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

const screenWidth = Dimensions.get("window");

export default function SaleMap() {
  //TODO: falta consultar todos los beneficios y hacer un marker por cada uno.

  const [sales, setSales] = useState([]);

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
          console.log("sales: ", sales);
        })
        .catch((e) => console.log("ERROR: ", e));
    })();
  }, []);

  const { height, width } = Dimensions.get("window");

  const location = {
    latitude: -31.653788758943733,
    latitudeDelta: 0.0053262862751375337,
    longitude: -60.70879757890222,
    longitudeDelta: 0.0050000000000331966,
  };

  const LATITUDE_DELTA = 0.28;
  const LONGITUDE_DELTA =
    LATITUDE_DELTA * (screenWidth.width / screenWidth.height);

  console.log("sales: ", sales);
  const test_url =
    "https://firebasestorage.googleapis.com/v0/b/graduados-a7240.appspot.com/o/sale-images%2F58b052f9-1cb7-48fe-822e-6798907341a1?alt=media&token=d5298279-fb3e-43af-881a-406d35119645";
  return (
    <ScrollView>
      <MapView
        style={{ width: "100%", height: screenWidth.height }}
        initialRegion={location}
        showsUserLocation
      >
        {sales.map((item, index) => (
          <Marker
            key={index}
            title={item.sale.name}
            description={item.sale.address}
            coordinate={item.sale.location}
          >
            <Callout style={{ flex: -1, position: "absolute", width: 220 }}>
              <View>
                <Image
                  source={{ uri: test_url }}
                  style={{ height: 190, width: 220 }}
                />
                <View style={{ marginLeft: 10, marginTop: 10 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    {item.sale.name}
                  </Text>
                  <Text
                    style={{ marginTop: 5, marginBottom: 10, color: "grey" }}
                  >
                    {item.sale.address}
                  </Text>
                </View>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </ScrollView>
  );
}

function MarkerView(props) {
  return (
    <View>
      <Image
        source={require("../../../assets/marker7.png")}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}
