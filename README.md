# Graduados App

App Mobile de beneficios para graduados de la UNL

## Users

Expo: gmail / 4896257Ex
Heroku: gmail / 4896257.Hk

## instalación entorno

- instalar nodeJS (version LTS)
- instalar yarn (se instala con brew)
- instalar react native
  yarn global add expo-cli
- instalar andriod studio (solo para emulador ANDROID)
- instalar xCode (solo para emulador iOS)

## librerias

- yarn add react-native-elements

- navegacion

yarn add @react-navigation/native

expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

yarn add @react-navigation/stack

yarn add @react-navigation/bottom-tabs

##Firebase

- creamos un proyecto , vamos a utilizar
  - Authentication : para manejo de usuarios.
  - Batabase : para almacen de datos.
  - Storage : para archivos/imagenes.

* Añadimos una app web

* en el code creamos utils/FireBase.js y agregamos la config

  var firebaseConfig = {
  apiKey: "AIzaSyCzwJuySBcbP3NfGoxkE2jgKasOUmH6SxY",
  authDomain: "graduados-a7240.firebaseapp.com",
  databaseURL: "https://graduados-a7240.firebaseio.com",
  projectId: "graduados-a7240",
  storageBucket: "graduados-a7240.appspot.com",
  messagingSenderId: "714619466530",
  appId: "1:714619466530:web:34cc5fb2b5dd61c77a6b7b"
  };

- agregamos paquete de firebase

## Para que no se oculten cajas de textos al levantar el teclado

yarn add react-native-keyboard-aware-scroll-view

## Para mostrar mensajes toast

yarn add react-native-easy-toast

## Login mediante facebook

- creamos la app en developers.facebook siguiendo la doc de expo para las dos plataformas android - ios
- habilitamos en firebase login por facebook
- instalamos el paquete expo-facebook yarn add expo-facebook

## Trabajo con camara

- instalamos expo install expo-permissions
- instalamos expo install expo-image-picker

## Componente de botones +

- yarn add react-native-action-button

## Componente de mapas MapVew (expo)

- expo install react-native-maps
  https://docs.expo.io/versions/latest/sdk/map-view/

## Instalar componente locations para obtener geo-position

- expo install expo-location

## Instalar uuid para la generacion de ids (no funciono)

- yarn add uuid

## componente para carousel de imagenes

- yarn add react-native-banner-carousel

## componente para navegar hacia un punto con la app por defecto del movil(maps, goole)

- yarn add react-native-open-maps
