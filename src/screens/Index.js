import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import { Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const Stack = createStackNavigator();
const HomeStack = createMaterialBottomTabNavigator();
const LoginStack = createStackNavigator();

const HomeNav = ({ route }) => {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      activeColor="#57419D"
      inactiveColor="#BDBDBD"
      labeled={false}
      barStyle={{
        backgroundColor: "#F5F5FA",
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        elevation: 10,
        height: 100,
        paddingVertical: 10,
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        initialParams={route.params}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <View style={styles.iconView}>
                <Icon
                  name="home-outline"
                  size={25}
                  style={styles.iconBackground}
                  color={color}
                />
              </View>
            );
          },
        }}
      />
      <HomeStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        initialParams={route.params}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <View style={styles.iconView}>
                <Icon
                  name="account-outline"
                  size={25}
                  style={styles.iconBackground}
                  color={color}
                />
              </View>
            );
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

const LoginNav = () =>{
  return (
    <LoginStack.Navigator initialRouteName="LoginScreen" headerMode="none">
      <LoginStack.Screen name="LoginScreen" component={LoginScreen} />
      <LoginStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </LoginStack.Navigator>
  );
}
export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={LoginNav} />
        <Stack.Screen name="Home" component={HomeNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  iconBackground: {
    backgroundColor: "white",
    width: 35,
    height: 35,
    borderRadius: 20,
    elevation: 2,
    padding: 5,
  },
  iconView: {
    alignItems: "center",
    justifyContent: "center",
  },
});
