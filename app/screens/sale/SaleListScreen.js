import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ActionButton from "react-native-action-button";
import ListSales from "../../components/sale/ListSales";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
import UserNoLogged from "../../components/account/UserNoLoged";
const db = firebase.firestore(firebaseApp);

export default function SaleListScreen(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [sales, setSales] = useState([]);
  const [startSale, setStartSale] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReloadSales, setIsReloadSales] = useState(false);
  const [totalSales, setTotalSales] = useState(0);
  const limitSales = 5;
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
  }, []);

  //recupera los datos de ofertas
  useEffect(() => {
    db.collection("sales")
      .get()
      .then((snap) => {
        setTotalSales(snap.size);

        (async () => {
          const resultSales = [];
          const salesDB = db
            .collection("sales")
            .orderBy("createAt", "desc")
            .limit(limitSales);

          await salesDB
            .get()
            .then((response) => {
              if (response.docs.length > 0) {
                const start = response.docs[response.docs.length - 1];
                setStartSale(start.data().createAt);
              }

              response.forEach((doc) => {
                let sale = doc.data();
                sale.id = doc.id;
                resultSales.push({ sale });
              });
              setSales(resultSales);
            })
            .catch((e) => console.log("ERROR: ", e));
        })();
      });
    setIsReloadSales(false);
  }, [isReloadSales]);

  const handleLoadMore = async () => {
    const resultSales = [];
    sales.length < totalSales && setIsLoading(true);
    const salesDB = db
      .collection("sales")
      .orderBy("createAt", "desc")
      .startAfter(startSale)
      .limit(limitSales);

    await salesDB
      .get()
      .then((response) => {
        if (response.docs.length > 0) {
          const start = response.docs[response.docs.length - 1];
          setStartSale(start.data().createAt);
        } else {
          setIsLoading(false);
        }
        response.forEach((doc) => {
          let sale = doc.data();
          sale.id = doc.id;
          resultSales.push({ sale });
        });
        //le agrego los nuevos resultados
        setSales([...sales, ...resultSales]);
      })
      .catch((e) => console.log("ERROR: ", e));
  };

  if (!user) {
    return <UserNoLogged navigation={navigation} />;
  }

  return (
    <View style={styles.viewBody}>
      <ListSales
        sales={sales}
        isLoading={isLoading}
        handleLoadMore={handleLoadMore}
        navigation={navigation}
      ></ListSales>

      {user && (
        <AddSaleButton
          navigation={navigation}
          setIsReloadSales={setIsReloadSales}
        />
      )}
    </View>
  );
}

function AddSaleButton(props) {
  const { navigation, setIsReloadSales } = props;
  return (
    <ActionButton
      buttonColor="#319bb4"
      onPress={() => navigation.navigate("sale-add", { setIsReloadSales })}
    />
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
});
