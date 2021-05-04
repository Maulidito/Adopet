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
  BackHandler,
  Alert,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Item from "../components/ItemHome";
import { connect } from "react-redux";
import {
  getAnimalData,
  getSpeciesAnimal,
} from "../Context/Action/ActionDataAnimal";
import { bindActionCreators } from "redux";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const HomeScreen = ({
  Reducer,
  ReducerAnimal,
  getAnimalData,
  getSpeciesAnimal,
  navigation,
}) => {
  const { user } = Reducer;
  const { dataAnimal, pages, dataSpecies } = ReducerAnimal;

  const [page, setPage] = useState(1);
  const [visibleRefresh, setVisibleRefresh] = useState(false);
  const [filter, setFilter] = useState(null);
  const [refFlatlist, setRefFlatlist] = useState(null);
  const [animating, setAnimating] = useState(true);
  const [loadingList, setLoadingList] = useState(false);

  const endLoading = () => {
    setVisibleRefresh(false);
    setAnimating(false);
    setLoadingList(false);
  };

  useEffect(() => {
    console.log(page);
    getAnimalData(page, visibleRefresh, endLoading, filter);
  }, [page]);

  useEffect(() => {
    getSpeciesAnimal();
  }, []);

  const alert = () => {
    Alert.alert(
      "Alert Exit app",
      "Are you sure?",
      [
        {
          text: "Exit",
          onPress: () => BackHandler.exitApp(),
          style: "default",
        },
        {
          text: "Cancel",
          onPress: () => true,
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
    return true;
  };

  navigation.addListener(
    "focus",
    () => {
      BackHandler.addEventListener("hardwareBackPress", alert);
    },
    []
  );
  navigation.addListener(
    "blur",
    () => {
      BackHandler.removeEventListener("hardwareBackPress", alert);
    },
    []
  );

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
        <FlatList
          style={styles.headerListScrollView}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={dataSpecies}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.headerListButton}
                onPress={() => {
                  setVisibleRefresh(true);
                  setFilter(item);

                  getAnimalData(
                    1,
                    true,
                    () => {
                      endLoading();
                      refFlatlist.scrollToOffset({
                        offset: 0,
                        animated: true,
                      });
                    },
                    item
                  );
                }}
              >
                <Text style={styles.headerListText}>{item}</Text>
              </TouchableOpacity>
            );
          }}
        ></FlatList>
      </View>

      <View style={styles.body}>
        <View style={styles.loadingStyle}>
          <ActivityIndicator
            animating={animating}
            color="#7878AB"
            size="large"
          />
        </View>
        <FlatList
          ref={(ref) => {
            setRefFlatlist(ref);
          }}
          ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={() => (
            <View style={{ height: 350, paddingTop: 20, alignItems: "center" }}>
              <ActivityIndicator
                animating={loadingList}
                color="#7878AB"
                size="large"
              />
            </View>
          )}
          onEndReached={() => {
            setLoadingList(true);

            setPage(page + 1);
          }}
          onEndReachedThreshold={0.8}
          data={dataAnimal}
          refreshing={visibleRefresh}
          onRefresh={() => {
            setVisibleRefresh(true);
            setFilter(null);
            setPage(1);
          }}
          renderItem={({ item }) => {
            return <Item item={item} navigation={navigation} />;
          }}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getAnimalData, getSpeciesAnimal }, dispatch);

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
    paddingTop: 10,
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
    paddingTop: 10,
    paddingHorizontal: 25,
  },

  loadingStyle: {
    height: screenWidth,
    width: screenWidth,
    alignItems: "center",
    justifyContent: "center",

    position: "absolute",
  },
});
