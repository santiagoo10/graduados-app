import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Dimensions, StyleSheet } from "react-native";
import CarouselImages from "../../components/CarouselImages";
import Map from "../../components/Map";
import * as firebase from "firebase";
import { ListItem, Icon } from "react-native-elements";
import UserNoLogged from "../../components/account/UserNoLoged";

const screenWidth = Dimensions.get("window").width;

export default function SaleDetail(props) {
  const { route, navigation } = props;
  //desde la lista viene como item, y desde mapa params
  const { sale } = route.params.item ? route.params.item : route.params;
  const [imagesSale, setImagesSale] = useState([]);
  const [userLogged, setUserLogged] = useState(false);

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  console.log("sale: ", sale);

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

  console.log("userLogged: ", userLogged);
  if (!userLogged) {
    return <UserNoLogged navigation={navigation} />;
  }

  return (
    <ScrollView style={styles.viewBody}>
      <CarouselImages
        arrayImages={imagesSale}
        width={screenWidth}
        height={200}
      />
      <TitleSale name={sale.name} description={sale.description} />
      <InfoSale
        store={sale.store}
        address={sale.address}
        location={sale.location}
      />
    </ScrollView>
  );
}

function TitleSale(props) {
  const { name, description } = props;
  return (
    <View style={styles.viewTitle}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nameSale}>{name}</Text>
      </View>
      <Text style={styles.descriptionSale}>{description}</Text>
    </View>
  );
}

function InfoSale(props) {
  const { store, address, location } = props;
  const listInfo = [
    {
      text: address,
      iconName: "map-marker",
      iconType: "material-community",
      action: null,
    },
    {
      text: store?.phone,
      iconName: "phone",
      iconType: "material-community",
      action: null,
    },
    {
      text: store?.email,
      iconName: "at",
      iconType: "material-community",
      action: null,
    },
  ];

  return (
    <View style={styles.viewInfo}>
      <View style={styles.viewTitleInline}>
        <Icon
          type="material-community"
          name="store"
          size={24}
          iconStyle={{ marginBottom: 18 }}
        />
        <Text style={styles.titleInfo}>{store?.name}</Text>
      </View>

      <Map location={location} name={store?.name} height={100} />
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
  descriptionSale: {
    marginTop: 15,
    color: "grey",
  },
  viewInfo: {
    margin: 10,
    marginTop: 25,
  },
  viewTitleInline: {
    paddingHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  titleInfo: {
    fontSize: 20,
    paddingHorizontal: 4,
    fontWeight: "bold",
    marginBottom: 20,
  },
  containerListItem: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1,
  },
});
