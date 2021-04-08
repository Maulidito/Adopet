import React from "react";
import { Dimensions, ImageBackground, View } from "react-native";

export default SplashScreen = () => {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  return (
    <View style={{ height: screenHeight, backgroundColor: "#F5F5FA" }}>
      <ImageBackground
        source={require("../images/SplashTop.png")}
        style={{
          width: screenWidth,

          flexGrow: 1,
        }}
      />
      <ImageBackground
        source={require("../images/Animal.png")}
        style={{
          width: screenWidth,

          flexGrow: 1.8,
        }}
      />
      <ImageBackground
        source={require("../images/SplashBot.png")}
        style={{
          width: screenWidth,

          flexGrow: 1,
        }}
      />
    </View>
  );
};
