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

import { Picker } from "@react-native-picker/picker";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { onEdit, onSignup, clearErrorMessage } from "../Context/Action/Action";

const SignUpScreen = ({
  onEdit,
  onSignup,
  errMessage,
  navigation,
  clearErrorMessage,
  user,
  route,
}) => {
  const toastAnim = route.params ? route.params.toastAnim : null;

  const isEmpty = (object) => {
    return Object.keys(object).length == 0;
  };

  const [data, setData] = useState(
    !isEmpty(user)
      ? user
      : {
          name: "",
          username: "",
          password: "",
          Description: "",
          sex: "Male",
          favorite: "Cat",
        }
  );

  navigation.addListener(
    "blur",
    () => {
      clearErrorMessage();
    },
    []
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headernBody}>
        <Text style={styles.headerTitle}>
          {!isEmpty(user) ? "Update Account" : "Create Account"}
        </Text>
        <TextInput
          placeholder="Your Name"
          value={data.name}
          style={styles.bodyInputText}
          onChangeText={(text) => {
            setData({ ...data, name: text });
          }}
        />
        <TextInput
          placeholder="User Name"
          style={styles.bodyInputText}
          keyboardType="email-address"
          value={data.username}
          textContentType="emailAddress"
          returnKeyType="google"
          onChangeText={(text) => {
            setData({ ...data, username: text });
          }}
        />
        <TextInput
          placeholder="Password"
          style={styles.bodyInputText}
          value={data.password}
          onChangeText={(text) => {
            setData({ ...data, password: text });
          }}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="Bio"
          style={styles.bodyinputBio}
          multiline={true}
          value={data.Description}
          maxLength={120}
          onChangeText={(text) => {
            setData({ ...data, Description: text });
          }}
        />
        <Text style={styles.bodyTitleInput}>Gender</Text>
        <Picker
          style={styles.bodyInputText}
          onValueChange={(text) => {
            setData({ ...data, sex: text });
          }}
          selectedValue={data.sex}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
        <Text style={styles.bodyTitleInput}>Favorite Animal</Text>
        <Picker
          style={styles.bodyInputText}
          onValueChange={(text) => {
            setData({ ...data, favorite: text });
          }}
          selectedValue={data.favorite}
        >
          <Picker.Item label="Cat" value="Cat" />
          <Picker.Item label="Dog" value="Dog" />
          <Picker.Item label="Bird" value="Bird" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <View style={styles.footer}>
        {errMessage ? (
          <Text style={{ alignSelf: "center", color: "red" }}>
            {errMessage}
          </Text>
        ) : null}
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => {
            !isEmpty(user)
              ? onEdit(data, () => {
                  navigation.pop();
                  toastAnim();
                })
              : onSignup(data, () => {
                  navigation.navigate("LoginScreen");
                });
          }}
        >
          <Text style={styles.footerButtonText}>
            {!isEmpty(user) ? "Update Account" : "Create Account"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => state.Reducer;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ onEdit, onSignup, clearErrorMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);

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
