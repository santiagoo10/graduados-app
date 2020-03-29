import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import Loading from "../Loading";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";

export default function LoginForm(props) {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { toastRef, navigation } = props;

  const login = async () => {
    setIsLoading(true);
    if (!email || !password) {
      toastRef.current.show("Todos los campos son obligatorios.");
    } else if (!validateEmail(email)) {
      toastRef.current.show("El email no es correcto.");
    } else {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log("Login correcto.");
          navigation.navigate("my-account");
        })
        .catch(() => {
          toastRef.current.show("Email o contraseña incorrectos.");
        });
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Email"
        containerStyle={styles.inputForm}
        onChange={e => setEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        password={true}
        secureTextEntry={hiddenPassword}
        containerStyle={styles.inputForm}
        onChange={p => setPassword(p.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hiddenPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHiddenPassword(!hiddenPassword)}
          />
        }
      />
      <Button
        title="Iniciar sesión"
        containerStyle={styles.buttonContainerLogin}
        buttonStyle={styles.ButtonLogin}
        onPress={login}
      />
      <Loading text="Iniciando sesión" isVisible={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  inputForm: {
    width: "100%",
    marginTop: 20
  },
  iconRight: {
    color: "#c1c1c1"
  },
  buttonContainerLogin: {
    marginTop: 20,
    width: "95%"
  },
  ButtonLogin: {
    //backgroundColor: "#00a680"
    backgroundColor: "#319bb4"
  }
});
