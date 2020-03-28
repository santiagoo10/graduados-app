import React from "react";
import { ScrollView, StyleSheet, View, Text, Image } from "react-native";
import { Divider } from "react-native-elements";

export default function LoginScreen({ navigation }) {
  return (
    <ScrollView>
      <Image
        source={require("../../../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.viewContainer}>
        <Text>Form Login...</Text>
        <CreateAccount navigation={navigation}></CreateAccount>
      </View>
      <Divider style={styles.divider}></Divider>
      <View style={styles.viewContainer}>
        <Text>Login Facebook...</Text>
      </View>
    </ScrollView>
  );
}

function CreateAccount({ navigation }) {
  return (
    <Text style={styles.textRegister}>
      ¿Aún no tienes una cuenta?{" "}
      <Text
        style={styles.buttonRegister}
        onPress={() => navigation.navigate("register")}
      >
        Regístrate
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40
  },
  textRegister: {
    marginTop: 40,
    marginLeft: 40
  },
  buttonRegister: {
    color: "#00a680",
    fontWeight: "bold"
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 40
  }
});
