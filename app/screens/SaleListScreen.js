import React from "react";
import { View, Button, Text } from "react-native";

export default function SaleList({ navigation }) {
  return (
    <View>
      <Text>Lista de beneficios!</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("sale-detail")}
      />
    </View>
  );
}
