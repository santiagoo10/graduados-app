import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as firebase from "firebase";

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
    <View>
      <Text>Detalle del sale!</Text>
    </View>
  );
}
