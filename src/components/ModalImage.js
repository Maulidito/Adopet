import {
  Modal,
  TouchableOpacity,
  ImageBackground,
  View,
  BackHandler,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PreviewImage from "./PreviewImage";

export default ModalImage = ({ fullImage, item, callback }) => {
  return (
    <Modal
      visible={fullImage}
      transparent
      statusBarTranslucent={true}
      onRequestClose={() => {
        callback();
      }}
    >
      <PreviewImage item={item} widthSize={100} heightSize={100} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  
});
