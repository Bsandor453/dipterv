import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const App = () => {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <Button title="Tap me!" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
