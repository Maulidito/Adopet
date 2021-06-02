import React, { useRef, useState } from "react";
import { View, StyleSheet, Text, Animated, PanResponder } from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { bindActionCreators } from "redux";
import { getLikedAnimal } from "../Context/Action/ActionDataAnimal";
import { connect } from "react-redux";
import ItemHome from "../components/ItemHome";

const ItemProfile = ({ Reducer, route }) => {
  const { springUpAnim, springDownAnim } = route.params;
  const { user } = Reducer;
  const cardAnim = useRef(new Animated.Value(200)).current;
  const containerAnim = useRef(new Animated.Value(800)).current;
  const [heightCard, setHeightCard] = useState(0);
  const [enableScroll, setEnableScroll] = useState(false);
  const [panResponderControl, setPanResponderControl] = useState(true);

  const springUp = () => {
    springUpAnim();
    Animated.spring(cardAnim, {
      toValue: heightCard,
      useNativeDriver: false,
    }).start();
    Animated.timing(containerAnim, {
      toValue: 850,
      useNativeDriver: false,
    }).start();
    setEnableScroll(true);
    setPanResponderControl(false);
  };

  const springDown = () => {
    springDownAnim();
    Animated.spring(cardAnim, {
      toValue: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(containerAnim, {
      toValue: 800,
      useNativeDriver: false,
    }).start();
    setEnableScroll(false);
    setPanResponderControl(true);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => {
      return panResponderControl;
    },
    onPanResponderMove: (event, gesture) => {
      if (gesture.dy < -20) {
        springUp();
      }

      if (gesture.dy > 20) {
        springDown();
      }
    },
    onPanResponderRelease: () => {},
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      scrollEnabled={enableScroll}
      onScrollEndDrag={(event) => {
        if (
          panResponderControl == false &&
          event.nativeEvent.contentOffset.y == 0
        ) {
          springDown();
        }
      }}
      onScroll={(event) => {
        if (event.nativeEvent.contentOffset.y == 0) {
          setPanResponderControl(true);
        }
      }}
    >
      <View style={styles.container} {...panResponder.panHandlers}>
        <Animated.View
          style={{ ...styles.card, height: cardAnim, overflow: "hidden" }}
        >
          <View
            onLayout={(event) => {
              setHeightCard(event.nativeEvent.layout.height);
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
          </View>
        </Animated.View>

        {user.liked.map((val, index) => {
          getLikedAnimal(val).then((data) => {
            //console.log(data);
          });
        })}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(ItemProfile);
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  card: {
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 5,
    padding: 12,
    marginBottom: 20,
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
