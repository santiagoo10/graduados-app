import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import Loading from "../../components/Loading";

import UserGestScreen from "./UserGestScreen";
import UserLoggedScreen from "./UserLoggedScreen";

export default function MyAccountScreen({ navigation }) {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  if (login === null) {
    return <Loading isVisible={true} text="Cargando..."></Loading>;
  }
  return login ? (
    <UserLoggedScreen navigation={navigation} />
  ) : (
    <UserGestScreen navigation={navigation} />
  );
}
