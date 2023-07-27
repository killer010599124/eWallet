import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import Button from "../Components/Button";
import { TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
const EditPage = ({ navigation, route }) => {
  const { parsedProduct } = route.params;
  //   const parsedProduct = product;

  const [dimension, setDimension] = useState(Dimensions.get("window"));
  const onChange = () => {
    setDimension(Dimensions.get("window"));
  };
  const listItemData = [
    {
      leftIcon: require("../assets/nameIcon.png"),
      description: "Name",
      rightInfo: "Nike Air Max 270 Essential",
    },
    {
      leftIcon: require("../assets/IRIcon.png"),
      description: "Internal reference",
      rightInfo: "FRUN_000778",
    },
    {
      leftIcon: require("../assets/barcodeIcon.png"),
      description: "Barcode",
      rightInfo: "8600201741241414",
    },
    {
      leftIcon: require("../assets/spIcon.png"),
      description: "Sales Price",
      rightInfo: "$179.39",
    },
    {
      leftIcon: require("../assets/costIcon.png"),
      description: "Cost",
      rightInfo: "$260.39",
    },
  ];
  const ListItem = ({ leftIcon, rightInfo, description }) => {
    return (
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
      >
        <Image
          source={leftIcon}
          style={{ width: 50, height: 50, marginRight: 10 }}
        />
        <View>
          <Text style={{ color: "#A3A3A3", fontSize: 12 }}>{description}</Text>
          <TextInput>{rightInfo}</TextInput>
        </View>
      </View>
    );
  };
  return (
    <View style={{ backgroundColor: "white", padding: 10, flex: 1 }}>
      <View style={styles.image}>
        <Image source={parsedProduct.image} style={{width : '100%', height : '100%'}} />
      </View>
      {listItemData.map((item, index) => (
        <ListItem
          key={index}
          leftIcon={item.leftIcon}
          rightInfo={item.rightInfo}
          description={item.description}
        />
      ))}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={require("../assets/tagIcon.png")}
          style={{ width: 50, height: 50, marginRight: 10 }}
        />
        <View>
          <Text style={{ color: "#A3A3A3", fontSize: 12 }}>Product Tags</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",

              right: "5%",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#54DA92",
                borderRadius: 20,
                paddingHorizontal: 3,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                fruniture
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#FFE382",
                borderRadius: 20,
                paddingHorizontal: 3,
                marginLeft: 10,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 10 }}>kids</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Button
        title="Done"
        onPress={() => navigation.navigate("Empty")}
        style={{
          backgroundColor: "#0D6EFD",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  price: {
    top: "15%",
    left: "5%",
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  costPrice: {
    top: "15.5%",
    left: "5%",
    color: "#707B81",
    fontSize: 12,
    fontWeight: "bold",
  },

  image: {
    // marginLeft : '10%',
    alignSelf: "center",
    marginTop: "25%",
    width: "50%",
    height: "20%",
    resizeMode: "contain",
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  barcode: {
    fontSize: 12,
    color: "#2B2B2B",
    left: 0,
  },
});

export default EditPage;
