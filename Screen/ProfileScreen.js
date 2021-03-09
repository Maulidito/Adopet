import React from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ItemProfile from "./Item/ItemProfile";
import ItemAccount from "./Item/ItemAccount";

const StackNav = createMaterialTopTabNavigator();

class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerProfile}>
            <Image
              source={require("../Image/Example_Profile.jpg")}
              style={styles.headerImage}
            ></Image>
            <Text style={styles.headerName}>
              {this.props.route.params.name}
            </Text>
          </View>
        </View>
        <View style={styles.tab}>
          <StackNav.Navigator
            headerMode="none"
            initialRouteName="ItemProfile"
            tabBarOptions={{
              style: styles.headerNav,
              activeTintColor: "white",
              labelStyle: styles.headerNavButton,
            }}
          >
            <StackNav.Screen
              name={"ItemProfile"}
              component={ItemProfile}
              initialParams={this.props.route.params}
              options={{ title: "Profile" }}
            />
            <StackNav.Screen
              name={"ItemAccount"}
              component={ItemAccount}
              options={{ title: "Account" }}
            />
          </StackNav.Navigator>
        </View>
      </View>
    );
  }

  onProfile = () => {
    this.props.navigation.navigate("ItemProfile");
  };

  onAccount = () => {
    this.props.navigation.navigate("ItemAccount");
  };
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#F5F5FA",
  },
  header: {
    backgroundColor: "#57419D",
    flex: 0.9,
    justifyContent: "center",
  },
  headerProfile: {
    alignItems: "center",
    paddingTop: StatusBar.currentHeight * 1.25,
  },
  headerImage: {
    width: 150,
    height: 150,
    borderRadius: 40,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: "black",
    marginBottom: 5,
  },
  headerName: {
    fontSize: 24,
    fontWeight: "200",
  },
  headerNav: {
    backgroundColor: "#57419D",
  },
  headerNavButton: {
    color: "white",
    fontWeight: "bold",
  },
  tab: {
    flex: 1,
  },
});
