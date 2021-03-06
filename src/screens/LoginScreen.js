import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import { onLogin, clearErrorMessage } from "../Context/Action/Action";
import { bindActionCreators } from "redux";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  LogBox,
} from "react-native";
import { PrimaryColor,BackgroundColor } from "../components/Colors";
const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const LoginScreen = ({
  onLogin,
  clearErrorMessage,
  errMessage,
  navigation,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  navigation.addListener("blur", () => {
    clearErrorMessage();
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={PrimaryColor} />
      <ImageBackground
        source={require("../images/Login.png")}
        style={{ width: screenWidth, height: 120 }}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome </Text>
      </View>

      <View style={styles.body}>
        <TextInput
          testID="txtiUsername"
          placeholder="Username"
          style={styles.bodyTextInput}
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <TextInput
          testID="txtiPassword"
          placeholder="Password"
          style={styles.bodyTextInput}
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
      </View>
      {errMessage ? (
        <Text style={styles.errMessageStyle}>{errMessage}</Text>
      ) : null}

      <View style={styles.footer}>
        <TouchableOpacity
          testID="btnLogin"
          style={styles.footerButton}
          onPress={() => {
            onLogin({ username, password });
          }}
        >
          <Text style={styles.footerButtonText}>LOGIN</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Don't have an account?
          <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
            <Text style={styles.footerTextSignUp}> Sign Up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};
const mapStateToProps = (state) => state.Reducer;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ onLogin, clearErrorMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: BackgroundColor,
    flexDirection: "column",
    height: screenHeight,
  },
  header: {
    paddingBottom: 20,
    flexGrow: 0,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerTitle: { fontSize: 36, fontWeight: "700" },
  body: {
    flexGrow: 1.5,

    justifyContent: "space-evenly",
    paddingHorizontal: 50,
  },
  bodyTextInput: {
    borderRadius: 5,
    backgroundColor: "white",
    elevation: 5,
    height: 60,
    padding: 20,
  },
  footer: {
    flexGrow: 1,

    paddingHorizontal: 50,
    justifyContent: "center",
  },
  footerButton: {
    backgroundColor: PrimaryColor,
    borderRadius: 5,
    height: 60,
    justifyContent: "center",
    elevation: 5,
  },
  footerButtonText: {
    color: "white",
    textAlign: "center",
  },
  footerText: {
    textAlign: "center",
    paddingTop: 10,
  },
  footerTextSignUp: {
    color: PrimaryColor,
  },
  errMessageStyle: {
    alignSelf: "center",
    color: "red",
  },
});
