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

export default ModalImage = ({ fullImage, item, callback }) => {
  const [animating, setAnimating] = useState(true);
  const [imageCount, setImageCount] = useState(0);
  const screenWidth = Dimensions.get("screen").width;

  useEffect(() => {
    setAnimating(true);
  }, [imageCount]);
  return (
    <Modal
      visible={fullImage}
      transparent
      statusBarTranslucent={true}
      onRequestClose={() => {
        callback();
      }}
    >
      <View style={styles.modalBackground}>
        <ActivityIndicator animating={animating} color="#7878AB" size="large" />
      </View>

      <Image
        source={{
          uri: item.dataPictures[imageCount].small,
        }}
        onLoadEnd={() => {
          setAnimating(false);
        }}
        style={styles.modalImageSmall}
      />

      <ImageBackground
        source={{
          uri: item.dataPictures[imageCount].ori,
        }}
        style={styles.modalImageOri}
      >
        <TouchableOpacity
          style={styles.modalButtonChange}
          onPress={() => {
            0 == imageCount
              ? setImageCount(item.dataPictures.length - 1)
              : setImageCount(imageCount - 1);
          }}
        >
          <Icon
            name="arrow-left-bold-circle"
            size={30}
            color="white"
            style={styles.modalStyleButton}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.modalButtonChange, alignItems: "flex-end" }}
          onPress={() => {
            item.dataPictures.length - 1 == imageCount
              ? setImageCount(0)
              : setImageCount(imageCount + 1);
          }}
        >
          <Icon
            name="arrow-right-bold-circle"
            size={30}
            color="white"
            style={styles.modalStyleButton}
          />
        </TouchableOpacity>

        <View style={styles.modalIndicatorStyle}>
          {indicatorIndex(item.dataPictures, imageCount)}
        </View>
      </ImageBackground>
    </Modal>
  );
};

const indicatorIndex = (array, imageCount) => {
  let arr = [];
  let widthfinal = 100 / array.length;
  array.forEach((element, index) => {
    arr.push(
      <View
        key={index}
        style={{
          ...styles.indicatorBarStyle,
          width: `${widthfinal}%`,
          opacity: imageCount == index ? 1 : 0.5,
        }}
      />
    );
  });
  return arr;
};

const styles = StyleSheet.create({
  indicatorBarStyle: {
    backgroundColor: "white",
    height: 5,
    borderRadius: 10,
  },
  modalIndicatorStyle: {
    width: "100%",
    height: 15,
    position: "absolute",
    alignSelf: "flex-end",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  modalBackground: {
    alignSelf: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "#8c8c8c95",
    width: "100%",
    height: "100%",
  },
  modalImageSmall: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    flex: 1,
  },
  modalImageOri: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  modalButtonChange: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
  },
  modalStyleButton: {
    opacity: 0.5,
  },
});
