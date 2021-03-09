import React from "react";
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
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import GetApiKey from "../Api/ApiKeyRescueGroup";
import Item from "./Item/ItemHome";
import axios from "axios";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataAnimal: [],
      modalView: false,
    };

    this.getAnimalData().then((response) =>
      this.setState({ dataAnimal: response })
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.modalView}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalCentered}>
            <View style={styles.modalBody}>
              <Text>Sdfsd</Text>
              <Button
                title="close"
                onPress={() => {
                  this.setState({ modalView: false });
                }}
              />
            </View>
          </View>
        </Modal>
        <StatusBar backgroundColor={"#57419D"} />
        <View style={styles.headerProfile}>
          <Image
            source={require("../Image/Example_Profile.jpg")}
            style={styles.headerImageProfile}
          />
          <Text style={styles.headerTextUsername}>
            {this.props.route.params.name}
          </Text>
          <TouchableOpacity
            style={styles.headerIconBell}
            onPress={() => {
              this.setState({ modalView: true });
            }}
          >
            <Icon name="bell-outline" size={20} color="#5533EA" />
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
            data={this.state.dataAnimal}
            renderItem={(data) => {
              return <Item val={data} />;
            }}
          />
        </View>
      </View>
    );
  }

  async getAnimalData() {
    return await axios
      .get("https://api.rescuegroups.org/v5/public/animals/?limit=100", {
        headers: GetApiKey(),
      })
      .then((response) => {
        response.data.data.map((val, i) => {
          this.state.dataAnimal.push({
            id: String(i),
            name: val.attributes.name,
            sex: val.attributes.sex,
            desc: val.attributes.descriptionText,
            image: val.attributes.pictureThumbnailUrl,
          });
        });

        return this.state.dataAnimal;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getSpeciesAnimal(idSpecies) {
    return await axios
      .get(
        `https://api.rescuegroups.org/v5/public/animals/species/${idSpecies}`,
        {
          headers: GetApiKey(),
        }
      )
      .then((response) => response.data.data[0].attributes.singular)
      .catch((error) => {
        console.log(error);
      });
  }
  initDataAnimal = () => {
    this.state.dataAnimal.map((val, i) => {
      console.log(val);
      return <Item val={val} />;
    });
  };
}

export default HomeScreen;

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
  modalCentered: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  modalBody: {
    backgroundColor: "white",
    width: 300,
    height: 300,
    padding: 20,
  },
});
