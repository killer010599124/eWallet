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
const EditPage = ({ navigation, route }) => {
  const { parsedProduct } = route.params;
  //   const parsedProduct = product;

  const [dimension, setDimension] = useState(Dimensions.get("window"));
  const [serverUrl, setServerUrl] = useState("");
  AsyncStorage.getItem("serverURL").then((url) => {
    setServerUrl(url);
  });

  const [name, setName] = useState(parsedProduct.name);
  const [dcode, setDcode] = useState(parsedProduct.default_code);
  const [barcode, setBarcode] = useState(parsedProduct.barcode);
  const [saleprice, setSaleprice] = useState(parsedProduct.list_price.toString());
  const [cost, setCost] = useState(parsedProduct.standard_price.toString());

  const onChange = () => {
    setDimension(Dimensions.get("window"));
  };
  const listItemData = [
    {
      leftIcon: require("../assets/nameIcon.png"),
      description: "Name",
      rightInfo: parsedProduct.name,
    },
    {
      leftIcon: require("../assets/IRIcon.png"),
      description: "Internal reference",
      rightInfo: parsedProduct.default_code,
    },
    {
      leftIcon: require("../assets/barcodeIcon.png"),
      description: "Barcode",
      rightInfo: parsedProduct.barcode,
    },
    {
      leftIcon: require("../assets/spIcon.png"),
      description: "Sales Price",
      rightInfo: `$${parsedProduct.list_price}`,
    },
    {
      leftIcon: require("../assets/costIcon.png"),
      description: "Cost",
      rightInfo: `$${parsedProduct.standard_price}`,
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
          <TextInput onChangeText={(text) => setUrl(text)} value={url}>
            {rightInfo}
          </TextInput>
        </View>
      </View>
    );
  };

  const updateData = () => {
  
    const headers = {
      
      Accept: "application/json",
      'Content-Type': 'application/json',
      // Add any additional headers if necessary
    };
  
    // Create the request payload
    const payload = {
        name : name,
        list_price : saleprice,
        standard_price : cost,
        product_id : parsedProduct.id,
        barcode : barcode,
        default_code : dcode
    };
    fetch(`${serverUrl}/api/update/product/`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)

    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Here, you can access the JSON data

        console.log("This is response " + JSON.stringify(data));
       
        navigation.navigate("Product");
        
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  };

  return (
    <View style={{ backgroundColor: "white", padding: 10, flex: 1 }}>
      <View style={styles.image}>
        <Image
          source={{ uri: `${serverUrl}${parsedProduct.image_url}` }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>

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
          <TextInput
            onChangeText={(text) => setBarcode(text)}
            value={barcode}
          />
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
            <TextInput onChangeText={(text) => setCost(text)} value={cost.toString()} />
          </View>
        </View>
      </View>
      {/* {listItemData.map((item, index) => (
        <ListItem
          key={index}
          leftIcon={item.leftIcon}
          rightInfo={item.rightInfo}
          description={item.description}
        />
      ))} */}
      {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
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
      </View> */}

      <View
        style={{
          position: "absolute",
          alignItems: "center",
          width: dimension.width,
          marginTop: dimension.height * 0.8,
        }}
      >
        <Button
          title="Done"
          onPress={() => {
            updateData();
            navigation.navigate("Product");
          }}
          style={{
            backgroundColor: "#0D6EFD",
          }}
        />
      </View>
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
    marginTop: "20%",
    marginBottom: "3%",
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
