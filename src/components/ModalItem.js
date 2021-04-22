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
} from "react-native";

import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default ModalItem = ({ modalshow, item, closeModal }) => {
  return (
    <Modal visible={modalshow} animationType="fade" transparent={true}>
      <View style={styles.modalStyle}>
        <View style={styles.modalBody}>
          <View style={styles.modalContentImage}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Image
                source={
                  item.dataPictures[0]
                    ? { uri: item.dataPictures[0], scale: 1 }
                    : require("../images/Animal.png")
                }
                style={
                  item.dataPictures[0]
                    ? styles.modalImage
                    : { width: 100, height: 100 }
                }
              />
            </ScrollView>
          </View>
          <View style={styles.modalContentText}>
            <Text style={styles.modalNameText}>{item.name}</Text>
            <Text>{item.description}</Text>
          </View>

          <Icon
            name="close-circle-outline"
            size={30}
            style={{ alignSelf: "flex-end", position: "absolute" }}
            color="#7878AB"
            onPress={() => {
              closeModal();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    alignItems: "center",
    justifyContent: "center",
  },
  modalContentText: {
    paddingHorizontal: 10,
    backgroundColor: "white",
    flex: 0.45,
  },
  modalNameText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  modalImage: {
    width: "100%",
    height: 500,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
