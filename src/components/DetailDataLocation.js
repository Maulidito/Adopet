import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Card from "./Card";

const DetailDataLocation = ({ route }) => {
  const {
    street,
    state,
    postalcode,
    lon,
    lat,
    country,
    coordinates,
    citystates,
    city,
  } = route.params;

  return (
    <View style={styles.containerStyle}>
      <ScrollView
        style={styles.scrollViewStyle}
        showsVerticalScrollIndicator={false}
      >
        <MapView
          style={styles.MapViewStyle}
          initialRegion={{
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.05,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            title={`${country} , ${city}, ${street}, ${postalcode}`}
            coordinate={{
              latitude: lat,
              longitude: lon,
              latitudeDelta: 0.05,
              longitudeDelta: 0.01,
            }}
          />
        </MapView>

        <Card>
          <Text style={styles.titleCardStyle}>Location</Text>
          <View style={styles.itemCardStyle}>
            <Text>Street </Text>
            <Text>{street}</Text>
          </View>
          <View style={styles.itemCardStyle}>
            <Text>state </Text>
            <Text>{state}</Text>
          </View>
          <View style={styles.itemCardStyle}>
            <Text>postalcode </Text>
            <Text>{postalcode}</Text>
          </View>
          <View style={styles.itemCardStyle}>
            <Text>country </Text>
            <Text>{country}</Text>
          </View>
          <View style={styles.itemCardStyle}>
            <Text>citystates </Text>
            <Text>{citystates}</Text>
          </View>
          <View style={styles.itemCardStyle}>
            <Text>city </Text>
            <Text>{city}</Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: { alignItems: "center", marginHorizontal: 20, height: 400 },
  scrollViewStyle: { width: "90%" },
  MapViewStyle: { width: "100%", height: 250, marginVertical: 20 },
  titleCardStyle: { alignSelf: "center" },
  itemCardStyle: { flexDirection: "row", justifyContent: "space-between" },
});
export default DetailDataLocation;
