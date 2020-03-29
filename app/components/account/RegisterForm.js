import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";
import Loading from "../Loading";

export default function RegisterForm(props) {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [hiddenRepeatPassword, setHiddenRepeatPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);

  const { toastRef, navigation } = props;

  const register = async () => {
    setIsVisibleLoading(true);
    if (!email || !password || !repeatPassword) {
      toastRef.current.show("Todos los campos son obligatorios.");
    } else if (!validateEmail(email)) {
      toastRef.current.show("El email no es valido.");
    } else if (password !== repeatPassword) {
      toastRef.current.show("Las contraseñas no son iguales.");
    } else {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log("Usuario creado correctamente.");
          navigation.navigate("my-account");
        })
        .catch(() =>
          toastRef.current.show("Error al crear el usuario, intente nuevamente")
        );
    }
    setIsVisibleLoading(false);
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
      <Input
        placeholder="Repetir Contraseña"
        password={true}
        secureTextEntry={hiddenRepeatPassword}
        containerStyle={styles.inputForm}
        onChange={rp => setRepeatPassword(rp.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hiddenRepeatPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHiddenRepeatPassword(!hiddenRepeatPassword)}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.buttonContainerRegister}
        buttonStyle={styles.ButtonRegister}
        onPress={register}
      />
      <Loading text="Creando cuenta" isVisible={isVisibleLoading} />
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
  buttonContainerRegister: {
    marginTop: 20,
    width: "95%"
  },
  ButtonRegister: {
    //backgroundColor: "#00a680"
    backgroundColor: "#319bb4"
  }
});
