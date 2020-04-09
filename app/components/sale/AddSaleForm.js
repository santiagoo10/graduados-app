import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import MapView from "react-native-maps";
import Modal from "../Modal";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

import { uuidv4 } from "../../utils/uuid";
const db = firebase.firestore(firebaseApp);

const widthScreen = Dimensions.get("window").width;

export default function AddSaleForm(props) {
  const { navigation, toastRef, setIsLoading } = props;
  const [imagesSelected, setImagesSelected] = useState([]);
  const [saleName, setSaleName] = useState("");
  const [saleAddress, setSaleAddress] = useState("");
  const [saleDescription, setSaleDescription] = useState("");
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationSale, setLocationSale] = useState(null);

  const addSale = () => {
    if (!saleName || !saleAddress || !saleDescription) {
      toastRef.current.show(
        "Todos los campos del formulario son obligatorios",
        3000
      );
    } else if (imagesSelected.length === 0) {
      toastRef.current.show("La oferta debe tener al menos una imagen", 3000);
    } else if (!locationSale) {
      toastRef.current.show("Debes localizar la oferta en el mapa", 3000);
    } else {
      setIsLoading(true);
      uploadImageStorage(imagesSelected).then((arrayImages) => {
        db.collection("sales")
          .add({
            name: saleName,
            address: saleAddress,
            description: saleDescription,
            location: locationSale,
            images: arrayImages,
            createAt: new Date(),
            createBy: firebaseApp.auth().currentUser.uid,
          })
          .then(() => {
            setIsLoading(false);
            navigation.navigate("sale-list");
          })
          .catch((err) => {
            setIsLoading(false);
            toastRef.current.show("Error al subir la oferta");
          });
      });
    }
  };

  //recorre todas las imagenes y las sube a firebase, retorna los nombres de las imagenes
  const uploadImageStorage = async (imageArray) => {
    const imagesBlob = [];
    await Promise.all(
      imageArray.map(async (image) => {
        const response = await fetch(image);
        const blob = await response.blob();
        const uuid = uuidv4();
        const ref = firebase.storage().ref("sale-images").child(uuid);
        await ref
          .put(blob)
          .then((result) => {
            imagesBlob.push(result.metadata.name);
          })
          .catch((e) => console.log("error put: ", e));
      })
    );
    return imagesBlob;
  };

  return (
    <ScrollView>
      <ImageSale imageSale={imagesSelected[0]} />
      <FormAdd
        setSaleName={setSaleName}
        setSaleAddress={setSaleAddress}
        setSaleDescription={setSaleDescription}
        setIsVisibleMap={setIsVisibleMap}
        locationSale={locationSale}
      />
      <UploadImagen
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
        toastRef={toastRef}
      />
      <Button
        title="Crear oferta"
        onPress={addSale}
        buttonStyle={styles.buttonAdd}
      />
      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setLocationSale={setLocationSale}
        toastRef={toastRef}
      />
    </ScrollView>
  );
}

function ImageSale(props) {
  const { imageSale } = props;
  return (
    <View style={styles.viewPhoto}>
      {imageSale ? (
        <Image
          source={{ uri: imageSale }}
          style={{ width: widthScreen, height: 200 }}
        />
      ) : (
        <Image
          source={require("../../../assets/no-image.png")}
          style={{ width: widthScreen, height: 200 }}
        />
      )}
    </View>
  );
}

function UploadImagen(props) {
  const { imagesSelected, setImagesSelected, toastRef } = props;

  const imageSelect = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;

    if (resultPermissionCamera === "denied") {
      toastRef.current.show(
        "Es necesario aceptar los permisos de la galería. Si los has rechazados tienes que ir a ajustes y activarlos manualmente.",
        4000
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (result.cancelled) {
        toastRef.current.show(
          "Has cerrado la galería sin seleccionar ninguna imágen.",
          3000
        );
      } else {
        setImagesSelected([...imagesSelected, result.uri]);
      }
    }
  };

  const removeImage = (image) => {
    Alert.alert(
      "Eliminar imágen",
      "¿Estas seguro de que quieres eliminar la imágen?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () =>
            setImagesSelected(
              imagesSelected.filter((imageUrl) => imageUrl !== image)
            ),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.viewImages}>
      {imagesSelected.length < 4 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}
      {imagesSelected.map((imageSale, index) => (
        <Avatar
          key={index}
          onPress={() => removeImage(imageSale)}
          style={styles.miniature}
          source={{ uri: imageSale }}
        />
      ))}
    </View>
  );
}

function FormAdd(props) {
  const {
    setSaleName,
    setSaleAddress,
    setSaleDescription,
    setIsVisibleMap,
    locationSale,
  } = props;

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre de la oferta"
        containerStyle={styles.input}
        onChange={(e) => setSaleName(e.nativeEvent.text)}
      />
      <Input
        placeholder="Dirección"
        containerStyle={styles.input}
        onChange={(e) => setSaleAddress(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: locationSale ? "#319bb4" : "#c2c2c2",
          onPress: () => setIsVisibleMap(true),
        }}
      />
      <Input
        placeholder="Descripcion de la oferta"
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChange={(e) => setSaleDescription(e.nativeEvent.text)}
      />
    </View>
  );
}

function Map(props) {
  const { isVisibleMap, setIsVisibleMap, setLocationSale, toastRef } = props;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const resultPermission = await Permissions.askAsync(Permissions.LOCATION);

      statusPermission = resultPermission.permissions.location.status;
      if (statusPermission !== "granted") {
        toastRef.current.show(
          "Tienes que aceptar los permisos de localización, para crear una oferta.",
          5000
        );
      } else {
        let loc = await Location.getCurrentPositionAsync({});

        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
      }
    })();
  }, []);

  const confirmLocation = () => {
    setLocationSale(location);
    toastRef.current.show("Localización guardada correctamente.");
    setIsVisibleMap(false);
  };

  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <View>
        {location && (
          <MapView
            style={styles.map}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={(region) => {
              setLocation(region);
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              draggable
            />
          </MapView>
        )}
        <View style={styles.mapButton}>
          <Button
            title="Guardar Ubicación"
            onPress={confirmLocation}
            containerStyle={styles.mapButtonSaveContainer}
            buttonStyle={styles.mapButtonSave}
          />
          <Button
            title="Cancelar Ubicación"
            onPress={() => setIsVisibleMap(false)}
            containerStyle={styles.mapButtonCancelContainer}
            buttonStyle={styles.mapButtonCancel}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20,
  },
  viewImages: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
  miniature: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  map: {
    width: "100%",
    height: 550,
  },
  mapButton: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  mapButtonSaveContainer: {
    paddingRight: 5,
  },
  mapButtonSave: {
    backgroundColor: "#319bb4",
  },
  mapButtonCancelContainer: {
    paddingLeft: 5,
  },
  mapButtonCancel: {
    backgroundColor: "#a60d0d",
  },
  buttonAdd: {
    backgroundColor: "#319bb4",
    margin: 20,
  },
});
