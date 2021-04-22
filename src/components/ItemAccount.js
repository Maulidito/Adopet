import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Modal } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signout } from "../Context/Action/Action";
const ItemAccount = ({ signout, navigation }) => {
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.buttonEdit}>
          <Icon name="account-edit-outline" size={30} color="#57419D" />
          <Text>Edit Account</Text>
        </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.buttonLogout}
        onPress={() => signout(() => navigation.navigate("Login"))}
      >
        <Icon name="logout" size={30} color="#57419D" />
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ signout }, dispatch);
export default connect(null, mapDispatchToProps)(ItemAccount);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttonEdit: {
    backgroundColor: "white",
    borderColor: "#57419D",
    borderWidth: 1,
    elevation: 5,
    borderRadius: 10,
    width: 100,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLogout: {
    backgroundColor: "white",
    borderColor: "#57419D",
    borderWidth: 1,
    elevation: 5,
    borderRadius: 10,
    width: 100,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
