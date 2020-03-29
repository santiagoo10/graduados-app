import React, { useState } from "react";
import { SocialIcon } from "react-native-elements";
import * as Facebook from "expo-facebook";
import * as firebase from "firebase";
import { FacebookApi } from "../../utils/Social";
import Loading from "../Loading";

export default function LoginFacebook(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { toastRef, navigation } = props;

  const login = async () => {
    await Facebook.initializeAsync(FacebookApi.application_id);

    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: FacebookApi.permissions
    });

    if (type === "success") {
      setIsLoading(true);
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase
        .auth()
        .signInWithCredential(credentials)
        .then(() => {
          console.log("Login correcto.");
          navigation.navigate("my-account");
        })
        .catch(e => {
          toastRef.current.show(
            "Error accediendo con facebook, intentelo mas tarde.",
            e
          );
        });
    } else if (type === "cancel") {
      toastRef.current.show("Inicio de sesión cancelado.");
    } else {
      toastRef.current.show("Error desconocido, intentelo mas tarde.");
    }
    setIsLoading(false);
  };
  return (
    <>
      <SocialIcon
        title="Iniciar sesión con Facebook"
        button
        type="facebook"
        onPress={login}
      />
      <Loading text="Iniciando sesión" isVisible={isLoading} />
    </>
  );
}
