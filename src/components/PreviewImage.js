import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const PreviewImage = ({ item, widthSize, heightSize }) => {
  const [animating, setAnimating] = useState(true);
  const [imageCount, setImageCount] = useState(0);

  useEffect(() => {
    setAnimating(true);
  }, [imageCount]);
  return (
    <View
      style={{
        ...styles.modalBackground,
        width: `${widthSize}%`,
        height: `${heightSize}%`,
      }}
    >
      <ActivityIndicator animating={animating} color="#7878AB" size="large" />

      <Image
        source={
          item.dataPictures[0]
            ? {
                uri: item.dataPictures[imageCount].small,
              }
            : require("../images/Animal.png")
        }
        onLoadEnd={() => {
          setAnimating(false);
        }}
        style={styles.modalImageSmall}
        blurRadius={0.5}
      />

      <ImageBackground
        source={
          item.dataPictures[0]
            ? {
                uri: item.dataPictures[imageCount].ori,
              }
            : require("../images/Animal.png")
        }
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
    </View>
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

    justifyContent: "center",
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
export default PreviewImage;
