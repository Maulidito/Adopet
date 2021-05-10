import React from "react";
import { View, StyleSheet, Text, Linking } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Card from "./Card";
import MapView, { Marker } from "react-native-maps";

const DetailDataOrgs = ({ route }) => {
  const {
    city,
    citystate,
    country,
    lat,
    lon,
    postalcode,
    state,
    street,
    about,
    url,
    type,
    email,
    facebookUrl,
    services,
    name,
    phone,
  } = route.params;
  route.params;
  return (
    <View style={styles.containerStyle}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewStyle}
      >
        <Card>
          <Text style={styles.titleStyle}>{name}</Text>
          <Text style={styles.title2Style}>
            {type} - {services}
          </Text>

          <Text style={styles.descriptionStyle}>
            {about ? about : "No Description"}
          </Text>
          <Text dataDetectorType="link">{facebookUrl}</Text>
          <Text dataDetectorType="link">{url}</Text>
          <Text dataDetectorType="email">{email}</Text>
          <Text>{phone}</Text>
        </Card>

        <MapView
          style={styles.MapViewStyle}
          initialRegion={{
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            title={`${country},${city},${street},${postalcode}`}
            coordinate={{
              latitude: lat,
              longitude: lon,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          />
        </MapView>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  containerStyle: { height: "40%" },
  scrollViewStyle: { paddingHorizontal: 20, width: "100%" },
  titleStyle: { fontSize: 25 },
  title2Style: { fontSize: 20 },
  descriptionStyle: { lineHeight: 15, fontSize: 15 },
  MapViewStyle: { width: "100%", height: 250, marginBottom: 40 },
});
export default DetailDataOrgs;
