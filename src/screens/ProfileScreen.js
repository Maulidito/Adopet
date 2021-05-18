import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Animated,
  Dimensions,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ItemProfile from "../components/ItemProfile";
import ItemAccount from "../components/ItemAccount";

import { connect } from "react-redux";
import SignUpScreen from "./SignUpScreen";

const StackNav = createMaterialTopTabNavigator();

const ProfileScreen = ({ Reducer }) => {
  const { user } = Reducer;
  const headerAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const imageAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const textAnim = useRef(new Animated.Value(1)).current;

  const springUpAnim = () => {
    Animated.spring(headerAnim, {
      toValue: { x: 0, y: -100 },
      useNativeDriver: true,
    }).start();

    Animated.spring(imageAnim, {
      toValue: { x: 0, y: 55 },

      useNativeDriver: true,
    }).start();

    Animated.timing(textAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };
  const springDownAnim = () => {
    Animated.spring(headerAnim, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();

    Animated.spring(imageAnim, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();

    Animated.timing(textAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View
      style={{
        ...styles.container,
        transform: headerAnim.getTranslateTransform(),
      }}
    >
      <View style={styles.header}>
        <View style={styles.headerProfile}>
          <Animated.Image
            source={require("../images/Example_Profile.jpg")}
            style={{
              ...styles.headerImage,
              transform: imageAnim.getTranslateTransform(),
            }}
          />

          <Animated.Text style={{ ...styles.headerName, opacity: textAnim }}>
            {user.name}
          </Animated.Text>
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
              marginHorizontal: "13%",
              width: 30,
              height: "5%",
              borderRadius: 10,
            },
          }}
        >
          <StackNav.Screen
            name={"ItemProfile"}
            component={ItemProfile}
            options={{ title: "Profile" }}
            initialParams={{ springUpAnim, springDownAnim }}
          />
          <StackNav.Screen
            name={"ItemAccount"}
            component={ItemAccount}
            options={{ title: "Account" }}
          />
        </StackNav.Navigator>
      </View>
    </Animated.View>
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
