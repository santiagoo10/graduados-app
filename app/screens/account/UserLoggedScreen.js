import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import * as firebase from "firebase";

export default function UserLoggedScreen() {
  return (
    <View>
      <Text>Usuario logeado!</Text>
      <Button title="Cerrar sesión" onPress={() => firebase.auth().signOut()} />
    </View>
  );
}
