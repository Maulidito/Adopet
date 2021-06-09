import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
  BackHandler,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PreviewImage from "../components/PreviewImage";
import DetailDataInfo from "../components/DetailDataInfo";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcon from "react-native-vector-icons/Ionicons";
import DetailDataLocation from "../components/DetailDataLocation";
import DetailDataOrgs from "../components/DetailDataOrgs";
import { PrimaryColor, SecondaryColor } from "../components/Colors";
const Stack = createMaterialTopTabNavigator();

const DetailDataScreen = ({ navigation, route }) => {
  const { params } = route;

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.pop();
      return true;
    });
  }, []);

  navigation.addListener("blur", () => {
    BackHandler.removeEventListener();
  });

  return (
    <View>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={styles.imageContentStyle}>
        <PreviewImage item={params} widthSize={100} heightSize={100} />
      </View>
      <View style={styles.contentBodyStyle}>
        <Stack.Navigator
          tabBarOptions={{
            showLabel: false,
            showIcon: true,
            activeTintColor: PrimaryColor,
            inactiveTintColor: SecondaryColor,
            indicatorStyle: { backgroundColor: PrimaryColor },
          }}
        >
          <Stack.Screen
            name={"DetailDataInfo"}
            component={DetailDataInfo}
            options={{
              tabBarIcon: ({ color }) => {
                return (
                  <View style={styles.iconIndicatorStyle}>
                    <Icon name="information" size={25} color={color} />
                  </View>
                );
              },
            }}
            initialParams={params}
          />
          <Stack.Screen
            name={"DetailDataLocation"}
            component={DetailDataLocation}
            options={{
              tabBarIcon: ({ color }) => {
                return (
                  <View style={styles.iconIndicatorStyle}>
                    <IonIcon name="location" size={25} color={color} />
                  </View>
                );
              },
            }}
            initialParams={params.dataLocations}
          />
          <Stack.Screen
            name={"DetailDataOrgs"}
            component={DetailDataOrgs}
            options={{
              tabBarIcon: ({ color }) => {
                return (
                  <View style={styles.iconIndicatorStyle}>
                    <Icon name="home-group" size={25} color={color} />
                  </View>
                );
              },
            }}
            initialParams={params.dataOrgs}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  imageContentStyle: { backgroundColor: "white", width: "100%", height: 250 },
  contentBodyStyle: { width: "100%", height: "100%" },
  iconIndicatorStyle: { width: 40, alignSelf: "center", alignItems: "center" },
});

const mapStatetoProps = (state) => state.ReducerAnimal;
const mapDispatchtoProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(null, mapDispatchtoProps)(DetailDataScreen);
