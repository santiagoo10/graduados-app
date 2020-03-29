import React, { useRef } from "react";
import { ScrollView, StyleSheet, View, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import LoginForm from "../../components/account/LoginForm";
import LoginFacebook from "../../components/account/LoginFacebook";
import Toast from "react-native-easy-toast";

export default function LoginScreen({ navigation }) {
  const toastRef = useRef();

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../../../assets/logo-unl-3.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef} navigation={navigation} />
        <CreateAccount navigation={navigation}></CreateAccount>
      </View>
      <Divider style={styles.divider}></Divider>
      <View style={styles.viewContainer}>
        <LoginFacebook toastRef={toastRef} navigation={navigation} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.5} />
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
  container: {
    backgroundColor: "white"
  },
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
    //color: "#00a680",
    color: "#319bb4",
    fontWeight: "bold"
  },
  divider: {
    //backgroundColor: "#00a680",
    backgroundColor: "#319bb4",
    margin: 40
  }
});
