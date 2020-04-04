import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

const widthScreen = Dimensions.get("window").width;

export default function AddSaleForm(props) {
  const { navigation, toastRef, setIsLoading } = props;
  const [imagesSelected, setImagesSelected] = useState([]);
  const [saleName, setSaleName] = useState("");
  const [saleAddress, setSaleAddress] = useState("");
  const [saleDescription, setSaleDescription] = useState("");

  return (
    <ScrollView>
      <ImageSale imageSale={imagesSelected[0]} />
      <FormAdd
        setSaleName={setSaleName}
        setSaleAddress={setSaleAddress}
        setSaleDescription={setSaleDescription}
      />
      <UploadImagen
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
        toastRef={toastRef}
      />
    </ScrollView>
  );
}

function ImageSale(props) {
  const { imageSale } = props;
  console.log(imageSale);
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
        aspect: [4, 3]
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

  const removeImage = image => {
    Alert.alert(
      "Eliminar imágen",
      "¿Estas seguro de que quieres eliminar la imágen?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: () =>
            setImagesSelected(
              imagesSelected.filter(imageUrl => imageUrl !== image)
            )
        }
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
  const { setSaleName, setSaleAddress, setSaleDescription } = props;

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre de la oferta"
        containerStyle={styles.input}
        onChange={e => setSaleName(e.nativeEvent.text)}
      />
      <Input
        placeholder="Dirección"
        containerStyle={styles.input}
        onChange={e => setSaleAddress(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: "#c2c2c2",
          onPress: () => console.log("seleccione la ubicación")
        }}
      />
      <Input
        placeholder="Descripcion de la oferta"
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChange={e => setSaleDescription(e.nativeEvent.text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20
  },
  viewImages: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3"
  },
  miniature: {
    width: 70,
    height: 70,
    marginRight: 10
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10
  },
  input: {
    marginBottom: 10
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0
  }
});
