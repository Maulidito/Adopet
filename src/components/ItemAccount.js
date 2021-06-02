import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signout } from "../Context/Action/Action";

const ItemAccount = ({ signout, navigation, user }) => {
  const heightScreen = Dimensions.get("screen").height;

  const editAnim = useRef(new Animated.Value(heightScreen)).current;

  const toastAnim = () => {
    Animated.timing(editAnim, {
      toValue: heightScreen / 3,
      useNativeDriver: false,
    }).start(() => {
      toastDown();
    });
  };

  const toastDown = () => {
    Animated.timing(editAnim, {
      toValue: heightScreen,
      useNativeDriver: false,
      delay: 3000,
    }).start();
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.buttonEdit}
          onPress={() => {
            navigation.navigate("EditAccScreen", { toastAnim });
          }}
        >
          <Icon name="account-edit-outline" size={30} color="#57419D" />
          <Text>Edit Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLogout} onPress={signout}>
          <Icon name="logout" size={30} color="#57419D" />
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={{
          position: "absolute",
          height: editAnim,

          justifyContent: "flex-end",
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            backgroundColor: "#85929E50",
            padding: 10,
            borderRadius: 20,
            textAlign: "center",
          }}
        >
          Success Updated
        </Text>
      </Animated.View>
    </View>
  );
};

const mapStateToProps = (state) => state.Reducer;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ signout }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ItemAccount);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
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
