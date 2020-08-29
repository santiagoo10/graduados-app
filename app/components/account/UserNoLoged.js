import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon, Button } from "react-native-elements";

export default function UserNoLogged(props) {
  const { navigation } = props;

  return (
    <View style={styles.viewBody}>
      <Icon
        type="material-community"
        name="alert-outline"
        size={80}
        color="#319bb4"
      />
      <Text style={styles.title}>
        Necesitas estar logeado para ver esta sección
      </Text>
      <Button
        title="Ir al login"
        containerStyle={styles.containerStyle}
        buttonStyle={styles.buttonStyle}
        onPress={() => navigation.navigate("Cuenta", { screen: "login" })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  buttonStyle: {
    backgroundColor: "#319bb4",
  },
  containerStyle: {
    marginTop: 20,
    width: "80%",
  },
});
