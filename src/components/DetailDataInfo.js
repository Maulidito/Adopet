import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions } from "react-native";
import Card from "./Card";

const DetailDataInfo = ({ route }) => {
  const { name, description, sex, color, age } = route.params;
  const [height, setHeight] = useState(0);

  return (
    <View style={styles.containerStyle}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.titleStyle}>{name}</Text>
        <Text style={styles.title2Style}>{sex}</Text>

        <View style={styles.contentBodyStyle}>
          <Text style={styles.textStyle}>{age}</Text>
          <Text style={styles.textStyle}>{color}</Text>
        </View>

        <Card>
          <Text style={description.style}>{description}</Text>
        </Card>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 20,
    height: 400,
    padding: 20,
  },
  titleStyle: {
    fontSize: 40,
    fontWeight: "900",
    paddingBottom: 10,
  },
  title2Style: {
    fontSize: 20,
    paddingBottom: 10,
  },
  contentBodyStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  textStyle: {
    fontSize: 20,
  },
  descriptionStyle: {
    lineHeight: 25,
    fontSize: 15,
  },
});
export default DetailDataInfo;
