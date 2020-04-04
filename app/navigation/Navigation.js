import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import AccountScreen from "../screens/account/MyAccountScreen";
import LoginScreen from "../screens/account/LoginScreen";
import RegisterScreen from "../screens/account/RegisterScreen";

import SaleListScreen from "../screens/sale/SaleListScreen";
import SaleAddScreen from "../screens/sale/SaleAddScreen";
import SaleDetailScreen from "../screens/sale/SaleDetailScreen";
import SaleMapScreen from "../screens/sale/SaleMapScreen";

const Tab = createBottomTabNavigator();
const AccountStack = createStackNavigator();
const SaleStack = createStackNavigator();

function AccountStackScreen() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="my-account"
        component={AccountScreen}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route)
        })}
      />
      <AccountStack.Screen
        name="login"
        component={LoginScreen}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route)
        })}
      />
      <AccountStack.Screen
        name="register"
        component={RegisterScreen}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route)
        })}
      />
    </AccountStack.Navigator>
  );
}

function SaleListStackScreen() {
  return (
    <SaleStack.Navigator>
      <SaleStack.Screen
        name="sale-list"
        component={SaleListScreen}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route)
        })}
      />
      <SaleStack.Screen
        name="sale-add"
        component={SaleAddScreen}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route)
        })}
      />
      <SaleStack.Screen
        name="sale-detail"
        component={SaleDetailScreen}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route)
        })}
      />
    </SaleStack.Navigator>
  );
}

function SaleMapStackScreen() {
  return (
    <SaleStack.Navigator>
      <SaleStack.Screen
        name="sale-map"
        component={SaleMapScreen}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route)
        })}
      />
    </SaleStack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Beneficios"
        tabBarOptions={{
          activeTintColor: "#319bb4",
          inactiveTintColor: "gray"
        }}
      >
        <Tab.Screen
          name="Beneficios"
          component={SaleListStackScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen
          name="Mapa"
          component={SaleMapStackScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="map" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen
          name="Cuenta"
          component={AccountStackScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
function getHeaderTitle(route) {
  switch (route.name) {
    case "sale-list":
      return "Beneficios";
    case "sale-add":
      return "Agregar";
    case "sale-detail":
      return "Detalle";
    case "sale-map":
      return "Mapas";
    case "my-account":
      return "Mi cuenta";
    case "login":
      return "Ingresar";
    case "register":
      return "Registro de graduado";
  }
}
