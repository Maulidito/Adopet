import { StatusBar } from "expo-status-bar";
import React from "react";
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

import Flash from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

import db from "../Api/ApiDatabase";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  render() {
    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={"#57419D"} />
        <ImageBackground
          source={require("../Image/Login.png")}
          style={{ width: screenWidth, height: 120 }}
        />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Welcome </Text>
        </View>

        <View style={styles.body}>
          <TextInput
            placeholder="Username"
            style={styles.bodyTextInput}
            onChangeText={(text) => {
              this.setState({ username: text });
            }}
          />
          <TextInput
            placeholder="Password"
            style={styles.bodyTextInput}
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton} onPress={this.onLogin}>
            <Text style={styles.footerButtonText}>LOGIN</Text>
          </TouchableOpacity>
          <Text style={styles.footerText}>
            Don't have an account?
            <TouchableOpacity onPress={this.onSignUp}>
              <Text style={styles.footerTextSignUp}> Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </View>
        <Flash position="bottom" ref="LoginScreen" />
      </View>
    );
  }

  onSignUp = () => {
    return this.props.navigation.navigate("SignUpScreen");
  };

  onLogin = () => {
    db(this.state.username, this.state.password)
      .then((res) => {
        if (
          res.data.length == 1 &&
          this.state.username != "" &&
          this.state.password != ""
        ) {
          this.props.navigation.navigate("Home", res.data[0]);
        } else {
          showMessage({
            message: "Incorrect Username or Password",
            duration: 5000,
            backgroundColor: "red",
            color: "white",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5FA",
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
    backgroundColor: "#57419D",
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
    color: "#57419D",
  },
});
