import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { tryLocalSign } from "../Context/Action/Action";

const ResolveAuthScreen = ({ navigation, tryLocalSign }) => {
  useEffect(() => {
    tryLocalSign(
      () => navigation.replace("Home"),
      () => navigation.replace("Login")
    );
  }, []);
  return null;
};
const styles = StyleSheet.create({});

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ tryLocalSign }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ResolveAuthScreen);
