import {
  Modal,
  Button,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";

import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import ModalImage from "./ModalImage";
export default ModalItem = ({ modalshow, item, closeModal }) => {
  const [fullImage, setFullImage] = useState(false);

  return (
    <Modal
      visible={modalshow}
      animationType="fade"
      transparent={true}
      onRequestClose={closeModal}
    >
      <View style={styles.modalStyle}>
        <TouchableOpacity
          style={styles.modalOutside}
          onPress={() => {
            closeModal();
          }}
        />
        {item.dataPictures[0] ? (
          <ModalImage
            fullImage={fullImage}
            item={item}
            callback={() => {
              setFullImage(false);
            }}
          />
        ) : null}

        <View style={styles.modalBody}>
          <TouchableOpacity
            style={styles.modalContentImage}
            onPress={() => {
              setFullImage(true);
            }}
            disabled={item.dataPictures[0] ? false : true}
          >
            <Image
              source={
                item.dataPictures[0]
                  ? { uri: item.dataPictures[0].ori }
                  : require("../images/Animal.png")
              }
              style={styles.modalImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButtonDetail}
            onPress={() => {
              console.log("asd");
            }}
          >
            <Icon name={"arrow-forward-ios"} color={"white"} size={30} />
          </TouchableOpacity>
          <View style={styles.modalContentText}>
            <Text style={styles.modalNameText}>{item.name}</Text>
            <ScrollView>
              <Text textBreakStrategy={"highQuality"}>{item.description}</Text>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalButtonDetail: {
    position: "absolute",
    alignSelf: "flex-end",
    height: "60%",
    width: "20%",
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 60,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  modalOutside: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  modalStyle: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8c8c8c90",
  },
  modalBody: {
    backgroundColor: "white",
    height: "60%",
    width: "90%",
    borderRadius: 10,
    elevation: 5,
    flexDirection: "column",
  },
  modalContentImage: {
    backgroundColor: "white",
    flex: 0.65,
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  modalContentText: {
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
    flex: 0.45,
  },
  modalNameText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  modalImage: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
