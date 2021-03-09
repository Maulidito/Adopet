import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

class ItemProfile extends React.Component {
  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.cardNameSection}>
              <Text style={styles.cardTitleName}>Name</Text>
              <Text> {this.props.route.params.name}</Text>
            </View>
            <View style={styles.cardNameSection}>
              <Text style={styles.cardTitleName}>Gender</Text>
              <Text> {this.props.route.params.sex}</Text>
            </View>
            <View style={styles.cardBioSection}>
              <Text style={styles.cardTitleName}>Bio</Text>
              <Text>{this.props.route.params.Description}</Text>
            </View>
            <View style={styles.cardNameSection}>
              <Text style={styles.cardTitleName}>Favorite Pet</Text>
              <Text> {this.props.route.params.favorite}</Text>
            </View>
            <View style={styles.cardNameSection}>
              <Text style={styles.cardTitleName}>Create an account on</Text>
              <Text> {this.props.route.params.createdAt.substring(0, 10)}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default ItemProfile;
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
