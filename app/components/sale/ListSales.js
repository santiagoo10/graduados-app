import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";
import * as firebase from "firebase";

export default function ListSales(props) {
  const { sales, isLoading, handleLoadMore } = props;
  return (
    <View>
      {sales ? (
        <FlatList
          data={sales}
          renderItem={(sale) => <Sale sale={sale} />}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0} // cdo llega al final pide los proximos 8
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loaderSales}>
          <ActivityIndicator size="large" />
          <Text>Cargando beneficios</Text>
        </View>
      )}
    </View>
  );
}

function Sale(props) {
  const { sale } = props;
  const { name, address, description, images } = sale.item.sale;
  const [imageSale, setImageSale] = useState(null);

  useEffect(() => {
    const image = images[0];
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
    <TouchableOpacity onPress={() => console.log("ir al sale")}>
      <View style={styles.viewSale}>
        <View style={styles.viewSaleImage}>
          <Image
            resizeMode="cover"
            source={imageSale ? { uri: imageSale } : null}
            style={styles.imageSale}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View>
          <Text style={styles.saleName}>{name}</Text>
          <Text style={styles.saleAddress}>{address}</Text>
          <Text style={styles.saleDescription}>
            {description.substr(0, 60)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function FooterList(props) {
  const { isLoading } = props;
  if (isLoading) {
    return (
      <View style={styles.loadingSales}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundSales}>
        <Text>No quedan ofertas por cargar</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingSales: {
    marginTop: 20,
    alignItems: "center",
  },
  viewSale: {
    flexDirection: "row",
    margin: 10,
  },
  viewSaleImage: {
    marginRight: 15,
  },
  imageSale: {
    width: 80,
    height: 80,
  },
  saleName: {
    fontWeight: "bold",
  },
  saleAddress: {
    paddingTop: 2,
    color: "grey",
  },
  saleDescription: {
    paddingTop: 2,
    color: "grey",
    width: 300,
  },
  loaderSales: {
    marginTop: 10,
    marginBottom: 10,
  },
  notFoundSales: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
});
