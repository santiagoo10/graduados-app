import React from "react";
import { ScrollView, StyleSheet, View, Text, Image } from "react-native";
import { Divider } from "react-native-elements";

export default function LoginScreen({ navigation }) {
  return (
    <ScrollView>
      <Image
        source={require("../../../assets/logo.png")}
        style={style.logo}
        resizeMode="contain"
      />
      <View style={style.viewContainer}>
        <Text>Form Login...</Text>
        <Text>Create Account...</Text>
      </View>
      <Divider style={Style.divider}></Divider>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 40
  }
});
