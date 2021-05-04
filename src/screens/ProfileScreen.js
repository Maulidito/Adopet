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
import ItemProfile from "../components/ItemProfile";
import ItemAccount from "../components/ItemAccount";

import { connect } from "react-redux";

const StackNav = createMaterialTopTabNavigator();

const ProfileScreen = ({ Reducer }) => {
  const { user } = Reducer;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerProfile}>
          <Image
            source={require("../images/Example_Profile.jpg")}
            style={styles.headerImage}
          ></Image>
          <Text style={styles.headerName}>{user.name}</Text>
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
            indicatorStyle: {
              backgroundColor: "white",
              marginBottom: 9,
              marginHorizontal: 60,
              width: 90,
              height: 3,
              borderRadius: 10,
            },
          }}
          ba
        >
          <StackNav.Screen
            name={"ItemProfile"}
            component={ItemProfile}
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
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(ProfileScreen);

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
