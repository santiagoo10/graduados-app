import React from "react";
import { StyleSheet, ScrollView, Image, Text, View } from "react-native";
import { Button } from "react-native-elements";

export default function UserGestScreen({ navigation }) {
  return (
    <ScrollView style={styles.viewBody}>
      <Image
        source={require("../../../assets/user-gest.jpg")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Consulta tu cuenta de Graduados!</Text>
      <Text style={styles.description}>
        Beneficios exclusivos para graduados de la Universidad nacional Del
        Litoral
      </Text>
      <View style={styles.viewBtn}>
        <Button
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.containerStyle}
          title="Ver tu perfil"
          onPress={() => navigation.navigate("login")}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  viewBody: {
    backgroundColor: "white"
  },
  image: {
    height: 300,
    width: "100%",
    marginTop: 40,
    marginBottom: 40
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center"
  },
  description: {
    marginBottom: 20,
    textAlign: "center"
  },
  viewBtn: {
    flex: 1,
    alignItems: "center"
  },
  buttonStyle: {
    backgroundColor: "#00a680"
  },
  containerStyle: {
    width: "70%"
  }
});
