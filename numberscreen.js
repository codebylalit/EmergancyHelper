import React from "react";
import { View, Text, Button, StyleSheet, Linking } from "react-native";

const NumberScreen = ({ route }) => {
  const { name, number } = route.params;

  const handleCall = () => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.number}>{number}</Text>
      <Button title="Call" onPress={handleCall} color="#007bff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  number: {
    color:"black",
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default NumberScreen;
