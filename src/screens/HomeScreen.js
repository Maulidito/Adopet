import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
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
  Animated,
} from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "../firebase/firebaseConfig";
import Item from "../components/ItemHome";
import { connect } from "react-redux";
import {
  getAnimalData,
  getSpeciesAnimal,
  clear_err,
} from "../Context/Action/ActionDataAnimal";
import { bindActionCreators } from "redux";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const HomeScreen = ({
  Reducer,
  ReducerAnimal,
  getAnimalData,
  getSpeciesAnimal,
  clear_err,
  navigation,
}) => {
  const { user } = Reducer;

  const { dataAnimal, dataSpecies, errMessage } = ReducerAnimal;

  const [page, setPage] = useState(1);
  const [visibleRefresh, setVisibleRefresh] = useState(false);
  const [filter, setFilter] = useState(null);
  const [refFlatlist, setRefFlatlist] = useState(null);
  const [animating, setAnimating] = useState(true);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingHeader, setLoadingHeader] = useState(true);

  const speciesAnim = useRef(new Animated.Value(0)).current;

  const itemAnim = useRef(
    new Animated.ValueXY({ x: 0, y: Dimensions.get("screen").height })
  ).current;

  const endLoading = () => {
    Animated.spring(itemAnim, {
      useNativeDriver: "true",
      toValue: { x: 0, y: 0 },
      bounciness: 100,
    }).start();
    setVisibleRefresh(false);
    setAnimating(false);
    setLoadingList(false);
  };

  useEffect(() => {
    if (visibleRefresh || loadingList || animating) {
      getAnimalData(page, visibleRefresh, endLoading, filter);
      clear_err();
    }
  }, [loadingList, visibleRefresh]);

  useEffect(() => {
    getSpeciesAnimal(() => {
      setLoadingHeader(false);
      Animated.timing(speciesAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: "false",
      }).start();
    });
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

        <View style={styles.headerViewBell}>
          <TouchableOpacity style={styles.headerIconBell}>
            <Icon name="bell-outline" size={20} color="#57419D" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.headerList}>
        {loadingHeader ? (
          <SkeletonPlaceholder>
            <View style={styles.loadingContainerHeader}>
              <View style={styles.loadingItemHeader} />
              <View style={styles.loadingItemHeader} />
              <View style={styles.loadingItemHeader} />
              <View style={styles.loadingItemHeader} />
            </View>
          </SkeletonPlaceholder>
        ) : (
          <Animated.FlatList
            style={{
              ...styles.headerListScrollView,
              opacity: speciesAnim,
            }}
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
                    setPage(1);
                    refFlatlist
                      ? refFlatlist.scrollToOffset({
                          offset: 0,
                          animated: true,
                        })
                      : null;
                  }}
                >
                  <Text style={styles.headerListText}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>

      <View style={styles.body}>
        <View style={styles.loadingStyle}>
          <ActivityIndicator
            animating={animating}
            color="#7878AB"
            size="large"
          />
        </View>
        {errMessage
          ? errorNotFound(errMessage, filter, () => {
              setVisibleRefresh(true);
              setFilter(null);
              setPage(1);
            })
          : null}
        <Animated.FlatList
          style={{ transform: itemAnim.getTranslateTransform() }}
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
          onEndReached={({ distanceFromEnd }) => {
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
  bindActionCreators({ getAnimalData, getSpeciesAnimal, clear_err }, dispatch);

const errorNotFound = (errMessage, filter, onRefresh) => {
  return (
    <View style={styles.errorNotFoundStyle}>
      {filter ? <Text>{`${errMessage} Animal Species ${filter}`}</Text> : null}

      <Icon name="arrow-down" size={40} color="black" />
      <Text>Pull Down to Refresh</Text>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingTop: "10%",
  },
  headerProfile: {
    flexDirection: "row",

    alignItems: "center",
    paddingHorizontal: 24,
  },
  headerViewBell: { flex: 1, alignItems: "flex-end" },
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
    paddingLeft: 10,
    fontSize: 14,
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
  loadingItemHeader: {
    width: 80,
    height: 30,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  loadingContainerHeader: {
    flexDirection: "row",
    alignContent: "space-between",
    marginTop: "5%",
  },
  errorNotFoundStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
    position: "absolute",

    alignSelf: "center",
  },
});
