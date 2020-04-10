import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Dimensions, StyleSheet } from "react-native";
import CarouselImages from "../../components/CarouselImages";
import Map from "../../components/Map";
import * as firebase from "firebase";
import { Rating, ListItem } from "react-native-elements";

const screenWidth = Dimensions.get("window").width;

export default function SaleDetail(props) {
  const { navigation, route } = props;
  const { sale } = route.params.item;
  const [imagesSale, setImagesSale] = useState([]);

  useEffect(() => {
    const arrayUrls = [];
    (async () => {
      await Promise.all(
        sale.images.map(async (idImage) => {
          await firebase
            .storage()
            .ref(`sale-images/${idImage}`)
            .getDownloadURL()
            .then((imageUrl) => {
              arrayUrls.push(imageUrl);
            });
        })
      );
      setImagesSale(arrayUrls);
    })();
  }, []);

  return (
    <ScrollView style={styles.viewBody}>
      <CarouselImages
        arrayImages={imagesSale}
        width={screenWidth}
        height={200}
      />
      <TitleSale name={sale.name} description={sale.description} />
      <InfoSale
        location={sale.location}
        name={sale.name}
        address={sale.address}
      />
    </ScrollView>
  );
}

function TitleSale(props) {
  const { name, description } = props;
  const rating = 3;
  return (
    <View style={styles.viewTitle}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nameSale}>{name}</Text>
        <Rating
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
        />
      </View>
      <Text style={styles.descriptionSale}>{description}</Text>
    </View>
  );
}

function InfoSale(props) {
  const { location, name, address } = props;
  const listInfo = [
    {
      text: address,
      iconName: "map-marker",
      iconType: "material-community",
      action: null,
    },
    {
      text: "111 222 333",
      iconName: "phone",
      iconType: "material-community",
      action: null,
    },
    {
      text: "sgobolzico@hotmail.com",
      iconName: "at",
      iconType: "material-community",
      action: null,
    },
  ];

  return (
    <View style={styles.viewInfo}>
      <Text style={styles.titleInfo}>Información sobre el beneficio</Text>
      <Map location={location} name={name} height={100} />
      {listInfo.map((item, index) => (
        <ListItem
          key={index}
          title={item.text}
          leftIcon={{
            name: item.iconName,
            type: item.iconType,
            color: "#319bb4",
          }}
          contentContainerStyle={styles.containerListItem}
          containerStyle={{
            backgroundColor: "transparent",
            justifyContent: "center",
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
  viewTitle: {
    margin: 15,
  },
  nameSale: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rating: {
    position: "absolute",
    right: 0,
  },
  descriptionSale: {
    marginTop: 15,
    color: "grey",
  },
  viewInfo: {
    margin: 10,
    marginTop: 25,
  },
  titleInfo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  containerListItem: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1,
  },
});
