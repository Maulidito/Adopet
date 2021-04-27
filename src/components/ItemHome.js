import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ModalItem from "../components/ModalItem";
const Item = ({ item }) => {
  const [modalshow, setModalShow] = useState(false);

  item.name ? null : (item.name = "Animals");
  item.description ? null : (item.description = "Please take care of me :)");
  item.sex ? null : (item.sex = "Unknown");

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setModalShow(true);
      }}
    >
      <ModalItem
        modalshow={modalshow}
        item={item}
        closeModal={() => {
          setModalShow(false);
        }}
      />
      <View style={styles.contentImage}>
        <Image
          source={
            item.dataPictures[0]
              ? { uri: item.dataPictures[0].ori, scale: 1 }
              : require("../images/Animal.png")
          }
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.contentBody}>
        <Text style={styles.contentBodyTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.contentBodyText} numberOfLines={4}>
          {item.description}
        </Text>
      </View>

      <View style={styles.contentButton}>
        <TouchableOpacity style={styles.contentButtonStyle}>
          <Icon name="heart-outline" size={20} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 16,
    elevation: 5,
    height: 130,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowRadius: 2,
    shadowOpacity: 0.3,
  },
  contentImage: {
    flex: 1.5,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  contentBody: {
    flex: 1.75,
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  contentBodyTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  contentBodyText: {
    paddingTop: 20,
    color: "#4F4F4F",
    fontSize: 14,
    lineHeight: 17,
  },
  contentButton: {
    padding: 5,
    flex: 0.4,
  },
  contentButtonStyle: {
    backgroundColor: "white",
    elevation: 5,
    alignItems: "center",
    borderRadius: 100,
    justifyContent: "center",
    width: 25,
    height: 25,
  },
});
