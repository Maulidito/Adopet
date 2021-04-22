import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";

const ItemProfile = ({ Reducer }) => {
  const { user } = Reducer;
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardNameSection}>
            <Text style={styles.cardTitleName}>Name</Text>
            <Text> {user.name}</Text>
          </View>
          <View style={styles.cardNameSection}>
            <Text style={styles.cardTitleName}>Gender</Text>
            <Text> {user.sex}</Text>
          </View>
          <View style={styles.cardBioSection}>
            <Text style={styles.cardTitleName}>Bio</Text>
            <Text>{user.Description}</Text>
          </View>
          <View style={styles.cardNameSection}>
            <Text style={styles.cardTitleName}>Favorite Pet</Text>
            <Text> {user.favorite}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, null)(ItemProfile);
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1,
  },
  card: {
    borderRadius: 10,
    flex: 1,
    backgroundColor: "white",
    elevation: 5,
    padding: 12,
  },
  cardNameSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#cfcfcf",
    borderBottomWidth: 1.5,
    paddingBottom: 10,
    marginBottom: 30,
  },
  cardBioSection: {
    flexDirection: "column",
    justifyContent: "space-between",
    borderBottomColor: "#cfcfcf",
    borderBottomWidth: 1.5,
    paddingBottom: 10,
    marginBottom: 30,
    maxHeight: 120,
  },
  cardTitleName: {
    fontWeight: "bold",
  },
});
