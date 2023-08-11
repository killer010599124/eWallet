import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TextInput } from "react-native";
import Button from "../Components/Button";
import { TouchableOpacity } from "react-native";
const PriceUpdatePage = ({navigation, route }) => {

  const [dimension, setDimension] = useState(Dimensions.get("window"));
  const onChange = () => {
    setDimension(Dimensions.get("window"));
  };

  const product = route.params.data;
  console.log(product[0].name);
  return (
    <View style={{ backgroundColor: "white", padding: 10, flex: 1 }}>
      <View style={{ width: "60%", marginLeft: "5%", marginTop : dimension.height * 0.15 }}>
       
        <Text style={styles.name}>{product[0].name}</Text>
        <Text style={styles.barcode}>{product[0].barcode}</Text>
        <TextInput style={styles.name}>${product[0].list_price}</TextInput>
        <Text style={styles.barcode}>${product[0].standard_price}</Text>
      </View>

      <Button
        title="Done"
        onPress={() => navigation.navigate('Barcode')}
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
