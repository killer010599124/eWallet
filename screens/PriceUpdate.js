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
import AsyncStorage from "@react-native-async-storage/async-storage";
const PriceUpdatePage = ({ navigation, route }) => {
  const [dimension, setDimension] = useState(Dimensions.get("window"));
  const onChange = () => {
    setDimension(Dimensions.get("window"));
  };
  const product = route.params.data;
  const [serverUrl, setServerUrl] = useState("");
  AsyncStorage.getItem("serverURL").then((url) => {
    setServerUrl(url);
  });

  const [saleprice, setSaleprice] = useState(product[0].list_price.toString());
  const updatePrice = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Add any additional headers if necessary
    };

    // Create the request payload
    const payload = {
      name: product[0].name,
      list_price: saleprice,
      standard_price: product[0].standard_price,
      product_id: product[0].id,
      barcode: product[0].barcode,
      default_code: product[0].default_code,
    };
    console.log(payload);
    fetch(`${serverUrl}/api/update/product/`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Here, you can access the JSON data

        console.log("This is response " + JSON.stringify(data));

        navigation.navigate("Barcode");
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  };

  return (
    <View style={{ backgroundColor: "white", padding: 10, flex: 1 }}>
      <View
        style={{
          width: "60%",
          marginLeft: "5%",
          marginTop: dimension.height * 0.15,
        }}
      >
        <Text style={styles.name}>{product[0].name}</Text>
        <Text style={styles.barcode}>{product[0].barcode}</Text>
        <TextInput
          style={styles.name}
          onChangeText={(text) => setSaleprice(text)}
          value={saleprice}
        />
        <Text style={styles.barcode}>${product[0].standard_price}</Text>
      </View>

      <Button
        title="Done"
        onPress={() => {
          updatePrice();
          navigation.navigate("Barcode");
        }}
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
