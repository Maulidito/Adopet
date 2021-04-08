import React from "react";
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
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
    };

    if (this.props.val.item.image == undefined) {
      this.props.val.item.image = "https://picsum.photos/200/300";
    } else if (this.props.val.item.name == undefined) {
      this.props.val.item.name = "Animals";
    } else if (this.props.val.item.desc == undefined) {
      this.props.val.item.desc = "Please take care of me :)";
    } else if (this.props.val.item.sex == undefined) {
      this.props.val.item.sex = "Unknown";
    }
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this.setState({ modalShow: true });
        }}
      >
        <Modal
          visible={this.state.modalShow}
          animationType="fade"
          transparent={true}
        >
          <View style={styles.modalStyle}>
            <View style={styles.modalBody}>
              <View style={styles.modalContentImage}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Image
                    source={{ uri: this.props.val.item.image, scale: 1 }}
                    style={styles.modalImage}
                    defaultSource={require("../../Image/Animal.png")}
                  />
                </ScrollView>
              </View>
              <View style={styles.modalContentText}></View>
            </View>
          </View>
        </Modal>

        <View style={styles.contentImage}>
          <Image
            source={{ uri: this.props.val.item.image }}
            style={styles.imageStyle}
            defaultSource={require("../../Image/Animal.png")}
          />
        </View>
        <View style={styles.contentBody}>
          <Text style={styles.contentBodyTitle} numberOfLines={1}>
            {this.props.val.item.name}
          </Text>
          <Text style={styles.contentBodyText} numberOfLines={4}>
            {this.props.val.item.desc}
          </Text>
        </View>

        <View style={styles.contentButton}>
          <TouchableOpacity style={styles.contentButtonStyle}>
            <Icon name="heart-outline" size={20} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

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

  modalStyle: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8c8c8c90",
  },
  modalBody: {
    backgroundColor: "white",
    height: 300,
    width: 300,
    borderRadius: 10,
    elevation: 5,
    flexDirection: "column",
  },
  modalContentImage: {
    backgroundColor: "red",
    flex: 0.65,
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContentText: {
    backgroundColor: "cyan",
    flex: 0.35,
  },
  modalImage: {
    width: "100%",
    height: 500,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
