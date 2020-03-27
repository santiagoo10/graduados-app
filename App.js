import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Graduados App!</Text>
      <Button
        icon={<Icon name="arrow-right" size={15} color="white" />}
        iconRight
        title="Button with right icon"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
