import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TextInput } from "react-native";
import Button from "../Components/Button";
import { TouchableOpacity } from "react-native";
const PriceUpdatePage = ({navigation, route }) => {

  const [dimension, setDimension] = useState(Dimensions.get("window"));
  const onChange = () => {
    setDimension(Dimensions.get("window"));
  };
  return (
    <View style={{ backgroundColor: "white", padding: 10, flex: 1 }}>
      <View style={{ width: "60%", marginLeft: "5%", marginTop : dimension.height * 0.15 }}>
        <Text style={{ ...styles.name, color: "#707B81", fontSize: 14 }}>
          FURN_000778
        </Text>
        <Text style={styles.name}>Nike Air Max 270</Text>
        <Text style={styles.barcode}>8600039959995995</Text>
        <TextInput style={styles.name}>$179.39</TextInput>
      </View>

      <Button
        title="Done"
        onPress={() => navigation.navigate('Product')}
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
    marginTop: "5%",
    width: "80%",
    height: "50%",
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

export default PriceUpdatePage;
