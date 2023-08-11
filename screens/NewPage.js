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
import AsyncStorage from "@react-native-async-storage/async-storage";
const NewPage = ({ navigation, route }) => {
  const [serverUrl, setServerUrl] = useState("");
  AsyncStorage.getItem("serverURL").then((url) => {
    setServerUrl(url);
  });

  const [name, setName] = useState("");
  const [dcode, setDcode] = useState("");
  const [barcode, setBarcode] = useState(route.params.scanData);
  const [saleprice, setSaleprice] = useState("");
  const [cost, setCost] = useState("");
  // const  {scanData}  = route.params;
  const [dimension, setDimension] = useState(Dimensions.get("window"));
  const onChange = () => {
    setDimension(Dimensions.get("window"));
  };
  const addProduct = () => {
    // var formdata = new FormData();
    // formdata.append("name", name);
    // formdata.append("list_price", parseFloat(saleprice));
    // formdata.append("standard_price", parseFloat(cost));
    // formdata.append("product_id", parsedProduct.id);
    // formdata.append("barcode", barcode);
    // formdata.append("categ_id", "");
    // formdata.append("default_code", dcode);
    const headers = {
      "Content-Type": "application/json",
      // Add any additional headers if necessary
    };

    // Create the request payload
    const payload = {
      name: name,
      list_price: saleprice,
      standard_price: cost,
      barcode: barcode,
      default_code: dcode,
    };
    fetch(`${serverUrl}/api/product/create/`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Here, you can access the JSON data

        console.log("This is response " + data);
        // if (data.result) {
        //   navigation.navigate("Home", { username });
        // } else {
        //   alert("Invalid database name or username or password");
        // }
        // Do further processing or update your React Native component state
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  };
  // console.log(route.params.scanData);

  return (
    <View style={{ backgroundColor: "white", padding: 10, flex: 1 }}>
      <Image source={require("../assets/new.png")} style={styles.image} />

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
      >
        <Image
          source={require("../assets/nameIcon.png")}
          style={{ width: 50, height: 50, marginRight: 10 }}
        />
        <View>
          <Text style={{ color: "#A3A3A3", fontSize: 12 }}>Name</Text>
          <TextInput onChangeText={(text) => setName(text)} value={name} />
        </View>
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
      >
        <Image
          source={require("../assets/IRIcon.png")}
          style={{ width: 50, height: 50, marginRight: 10 }}
        />
        <View>
          <Text style={{ color: "#A3A3A3", fontSize: 12 }}>
            Internal reference
          </Text>
          <TextInput onChangeText={(text) => setDcode(text)} value={dcode} />
        </View>
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
      >
        <Image
          source={require("../assets/barcodeIcon.png")}
          style={{ width: 50, height: 50, marginRight: 10 }}
        />
        <View>
          <Text style={{ color: "#A3A3A3", fontSize: 12 }}>Barcode</Text>
          <Text> {barcode} </Text>
        </View>
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
      >
        <Image
          source={require("../assets/spIcon.png")}
          style={{ width: 50, height: 50, marginRight: 10 }}
        />
        <View>
          <Text style={{ color: "#A3A3A3", fontSize: 12 }}>Sales Price</Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ marginTop: 3 }}>$</Text>
            <TextInput
              onChangeText={(text) => setSaleprice(text)}
              value={saleprice.toString()}
            />
          </View>
        </View>
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
      >
        <Image
          source={require("../assets/costIcon.png")}
          style={{ width: 50, height: 50, marginRight: 10 }}
        />
        <View>
          <Text style={{ color: "#A3A3A3", fontSize: 12 }}>Cost</Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ marginTop: 3 }}>$</Text>
            <TextInput
              onChangeText={(text) => setCost(text)}
              value={cost.toString()}
            />
          </View>
        </View>
      </View>

      <Button
        title="Done"
        onPress={() => {
          addProduct();
          // navigation.navigate("Barcode");
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
    marginTop: "25%",
    width: "20%",
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

export default NewPage;
