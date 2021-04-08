import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import FlashMessage, { showMessage } from "react-native-flash-message";

const screenHeight = Dimensions.get("screen").height;
const SignUpScreen = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Description, setDescription] = useState("");
  const [sex, setSex] = useState("Male");
  const [favorite, setFavorite] = useState("Cat");

  console.disableYellowBox = true;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headernBody}>
        <Text style={styles.headerTitle}>Create Account</Text>
        <TextInput
          placeholder="Your Name"
          style={styles.bodyInputText}
          onChangeText={(text) => {
            setName(text);
          }}
        />
        <TextInput
          placeholder="User Name"
          style={styles.bodyInputText}
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <TextInput
          placeholder="Password"
          style={styles.bodyInputText}
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="Bio"
          style={styles.bodyinputBio}
          multiline={true}
          maxLength={120}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
        <Text style={styles.bodyTitleInput}>Gender</Text>
        <Picker
          style={styles.bodyInputText}
          onValueChange={(text) => {
            setSex(text);
          }}
          selectedValue={sex}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
        <Text style={styles.bodyTitleInput}>Favorite Animal</Text>
        <Picker
          style={styles.bodyInputText}
          onValueChange={(text) => {
            setFavorite(text);
          }}
          selectedValue={favorite}
        >
          <Picker.Item label="Cat" value="Cat" />
          <Picker.Item label="Dog" value="Dog" />
          <Picker.Item label="Bird" value="Bird" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => {
            if (
              name == "" ||
              username == "" ||
              password == "" ||
              Description == ""
            ) {
              showMessage({
                message: "Data cannot empty",
                backgroundColor: "yellow",
                color: "white",
                duration: 2000,
              });
            } else {
              InsertDatabase({ name, username, password, sex, favorite })
                .then((res) => props.navigation.navigate("LoginScreen"))
                .catch((err) => {
                  console.log("error");
                });
            }
          }}
        >
          <Text style={styles.footerButtonText}>Create Account</Text>
        </TouchableOpacity>
        {
          //<FlashMessage position="bottom" ref="SignUpScreen" />
        }
      </View>
    </ScrollView>
  );
};

async function InsertDatabase(data) {
  return await axios
    .post("https://5ff7c7d610778b001704277d.mockapi.io/api/v1/users", data)
    .then((res) =>
      showMessage({
        message: "Success",
        backgroundColor: "green",
        color: "white",
        duration: 2000,
        description: "Your account has been created",
      })
    )
    .catch((err) => err);
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#57419D",

    flexDirection: "column",
  },
  headernBody: {
    paddingTop: 60,
    paddingHorizontal: 40,
    flexGrow: 1,

    justifyContent: "space-between",
  },
  headerTitle: {
    color: "white",
    textAlign: "center",
    fontSize: 36,
    paddingBottom: 40,
  },
  bodyInputText: {
    borderRadius: 5,
    padding: 20,
    height: 60,
    marginVertical: 20,
    backgroundColor: "white",
  },
  bodyinputBio: {
    borderRadius: 5,
    padding: 20,
    height: 120,
    marginVertical: 20,
    backgroundColor: "white",

    textAlignVertical: "top",
  },
  bodyTitleInput: {
    color: "white",
  },

  footer: {
    flexGrow: 2,

    height: 100,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  footerButton: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  footerButtonText: {
    fontSize: 18,
    fontWeight: "700",
  },
});
