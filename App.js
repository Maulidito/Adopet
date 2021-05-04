import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import Reducer from "./src/Context/Reducer/Reducer";
import DetailScreen from "./src/screens/DetailDataScreen";
import ReduxThunk from "redux-thunk";
import ReducerAnimal from "./src/Context/Reducer/ReducerAnimal";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
const Stack = createStackNavigator();
const HomeStack = createMaterialBottomTabNavigator();
const LoginStack = createStackNavigator();
const DetailStack = createStackNavigator();

const HomeNav = () => {
  return (
    <DetailStack.Navigator headerMode="none" initialRouteName={"MainScreen"}>
      <DetailStack.Screen component={MainNav} name={"MainScreen"} />
      <DetailStack.Screen component={DetailScreen} name={"DetailScreen"} />
    </DetailStack.Navigator>
  );
};

const MainNav = ({ navigation, state }) => {
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

const LoginNav = () => {
  return (
    <LoginStack.Navigator initialRouteName="LoginScreen" headerMode="none">
      <LoginStack.Screen name="LoginScreen" component={LoginScreen} />
      <LoginStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </LoginStack.Navigator>
  );
};
const allReducer = combineReducers({ Reducer, ReducerAnimal });
const reducer = createStore(allReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={reducer}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none" initialRouteName={"auth"}>
          <Stack.Screen name="Login" component={LoginNav} />
          <Stack.Screen name="Home" component={HomeNav} />

          <Stack.Screen name="auth" component={ResolveAuthScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
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
