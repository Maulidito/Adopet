import React from "react";
import { View, StyleSheet } from "react-native";

const Card = ({ children }) => {
  return (
    <View
      style={{
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: "white",
        marginVertical: 40,
      }}
    >
      {children}
    </View>
  );
};
const styles = StyleSheet.create({});
export default Card;
