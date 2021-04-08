import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Index from "./src/screens/Index";
import { createStore } from "redux";
import { createStackNavigator } from "@react-navigation/stack";

const App = () => {
  return <Index></Index>;
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
