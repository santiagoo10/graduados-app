import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import ActionButton from "react-native-action-button";
import * as firebase from "firebase";
export default function SaleListScreen(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []);

  return (
    <View style={styles.viewBody}>
      <Text>Lista de beneficios!</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("sale-detail")}
      />

      {user && <AddSaleButton navigation={navigation} />}
    </View>
  );
}

function AddSaleButton(props) {
  const { navigation } = props;
  return (
    <ActionButton
      buttonColor="#319bb4"
      onPress={() => navigation.navigate("sale-add")}
    />
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  }
});
