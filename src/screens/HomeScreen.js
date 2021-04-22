import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  FlatList,
  Modal,
  Button,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
//import { getAnimalData } from "../api/ApiDatabase";
import Item from "../components/ItemHome";
import { connect } from "react-redux";
import { getAnimalData } from "../Context/Action/ActionDataAnimal";
import { bindActionCreators } from "redux";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const HomeScreen = ({ Reducer, ReducerAnimal, getAnimalData }) => {
  const { user } = Reducer;
  const { dataAnimal } = ReducerAnimal;

  const [countData, setCountData] = useState(10);
  const [countAllData, setCountAllData] = useState(50);

  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    getAnimalData(countAllData, () => {
      setAnimating(false);
    });
  }, [countAllData]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#57419D"} />
      <View style={styles.headerProfile}>
        <Image
          source={require("../images/Example_Profile.jpg")}
          style={styles.headerImageProfile}
        />
        <Text style={styles.headerTextUsername}>{user.name}</Text>
        <TouchableOpacity style={styles.headerIconBell}>
          <Icon name="bell-outline" size={20} color="#57419D" />
        </TouchableOpacity>
      </View>

      <View style={styles.headerList}>
        <ScrollView
          style={styles.headerListScrollView}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity style={styles.headerListButton}>
            <Text style={styles.headerListText}>Cat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerListButton}>
            <Text style={styles.headerListText}>Dog</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerListButton}>
            <Text style={styles.headerListText}>Bird</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerListButton}>
            <Text style={styles.headerListText}>Reptile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerListButton}>
            <Text style={styles.headerListText}>Other</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.body}>
        <FlatList
          ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => {
            if (countData > countAllData / 2) {
              console.log("asdasdasdasd", countAllData, " ", countData);
              setCountAllData(countAllData + 50);
            }

            setCountData(countData + 10);
          }}
          onEndReachedThreshold={0.8}
          data={dataAnimal.slice(0, countData)}
          renderItem={({ item }) => {
            return <Item item={item} />;
          }}
        />

        <View style={styles.loadingStyle}>
          <ActivityIndicator
            animating={animating}
            color="#7878AB"
            size="large"
          />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getAnimalData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: screenHeight,
    paddingTop: StatusBar.currentHeight * 2,
  },
  headerProfile: {
    flexDirection: "row",

    alignItems: "center",
    paddingHorizontal: 24,
  },
  headerIconBell: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 100,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImageProfile: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    borderWidth: 1.5,
    borderColor: "white",
  },
  headerTextUsername: {
    fontSize: 14,
    paddingLeft: 12,
    paddingRight: "50%",
  },
  headerList: {
    paddingVertical: 10,
  },
  headerListScrollView: {
    flexDirection: "row",
    marginTop: "5%",
  },
  headerListButton: {
    borderRadius: 16,
    backgroundColor: "#F5F5FA",
    elevation: 10,
    paddingVertical: 5,
    paddingHorizontal: 25,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  headerListText: {
    fontSize: 14,
    color: "#7878AB",
  },
  body: {
    paddingHorizontal: 25,
    paddingBottom: 80,
  },

  loadingStyle: {
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
});
