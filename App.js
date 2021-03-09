import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Index from "./Screen/Index";
import { createStore } from "redux";
import { createStackNavigator } from "@react-navigation/stack";

export default class App extends React.Component {
  render() {
    return <Index></Index>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
