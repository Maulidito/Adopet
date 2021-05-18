import React, { useRef } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";

const ItemProfile = ({ Reducer, route }) => {
  const { springUpAnim, springDownAnim } = route.params;
  const { user } = Reducer;
  const cardAnim = useRef(new Animated.Value(150)).current;

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.card, height: cardAnim }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={(event) => {
            event.nativeEvent.contentOffset.y == 0
              ? (springDownAnim(),
                Animated.spring(cardAnim, {
                  toValue: 150,
                  useNativeDriver: false,
                }).start())
              : (springUpAnim(),
                Animated.spring(cardAnim, {
                  toValue: 200,
                  useNativeDriver: false,
                }).start());
          }}
        >
          <View style={styles.cardNameSection}>
            <Text style={styles.cardTitleName}>Name</Text>
            <Text> {user.name}</Text>
          </View>
          <View style={styles.cardNameSection}>
            <Text style={styles.cardTitleName}>Gender</Text>
            <Text> {user.sex}</Text>
          </View>
          <View style={{ ...styles.cardBioSection, maxHeight: 500 }}>
            <Text style={styles.cardTitleName}>Bio</Text>
            <Text numberOfLines={10}>{user.Description}</Text>
          </View>
          <View style={styles.cardNameSection}>
            <Text style={styles.cardTitleName}>Favorite Pet</Text>
            <Text> {user.favorite}</Text>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, null)(ItemProfile);
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: 900,
  },
  card: {
    borderRadius: 10,

    backgroundColor: "white",
    elevation: 5,
    padding: 12,
    height: 150,
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
