import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import Button from "../Components/Button";
const ProductScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [serverUrl, setServerUrl] = useState('');
  const [dimension, setDimension] = useState(Dimensions.get("window"));
  const onChange = () => {
    setDimension(Dimensions.get("window"));
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      //   Dimensions.removeEventListener('change', onChange);
    };
  });

  const [products, setProducts] = useState([]);
  AsyncStorage.getItem("serverURL").then((url) => {
    setServerUrl(url);
  })
  const handleSearch = (text) => {
    setSearchQuery(text);
  };
  const getProductData = () => {
    AsyncStorage.getItem("serverURL")
      .then((url) => {
        // console.log(url); // 'https://api.example.com'
        AsyncStorage.getItem("sessionId").then((sid) => {
          const server_url = `${url}/api/v1/products?name=${searchQuery}&barcode=`;
          const sessionID = `${sid}`;
          

          fetch(server_url, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Cookie: `session_id=${sessionID}`,
            },
          })
            .then((response) => {
              // console.log(response);
              return response.json();
            })
            .then((data) => {
              // Here, you can access the JSON data
              // console.log(data);
              // const filteredProducts = data.filter((product) =>
              //   product.name.toLowerCase().includes(searchQuery.toLowerCase())
              // );
              setProducts(data);
            })
            .catch((error) => {
              // Handle any errors that occurred during the request
              console.error(error);
            });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleProductPress = (item) => {
    navigation.navigate("Details", { product: JSON.stringify(item) });
  };
  const renderItem = ({ item }) => (
  
    <TouchableOpacity
      style={{
        height: dimension.width * 0.23,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 10,
      }}
      onPress={() => {
        handleProductPress(item);
      }}
    >
      <Image
        source = {{ uri: `${serverUrl}${item.image_url}` }}
        style={{
          width: dimension.width * 0.2,
          height: dimension.width * 0.2,
          marginRight: 10,
          marginLeft: 10,
          backgroundColor: "#F7F7F9",
          borderRadius: 10,
        }}
      />
      <View style={{ marginLeft: 10 }}>
        <Text
          style={{
            color: "#0D6EFD",
            fontSize: 12,
            width: dimension.width * 0.7,
          }}
        >
          {item.name}
        </Text>
        <Text style={{ fontSize: 12 }}>{item.barcode}</Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ fontSize: 12 }}>${item.standard_price}</Text>
          <Text style={{ fontSize: 12, marginLeft: dimension.width * 0.4 }}>
            ${item.list_price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <TextInput
          style={{
            flex: 1,
            height: 30,
            borderColor: "gray",
            borderWidth: 1,
            // marginRight: 10,
            paddingLeft: 40,
            backgroundColor: "white",
            borderColor: "white",
            borderRadius: 20,
            marginTop: dimension.height * 0.08,
            fontSize: 12,
          }}
          placeholder="Looking for shoes"
          value={searchQuery}
          onChangeText={handleSearch}
        ></TextInput>
        <TouchableOpacity onPress={() => handleSearch("")}>
          <Image
            source={require("../assets/search-icon.png")}
            style={{
              width: 15,
              height: 15,
              position: "absolute",
              marginTop: 18,
              marginLeft: -dimension.width * 0.75,
              zIndex: 99,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#0D6EFD",
            borderRadius: 10,
            height: dimension.height * 0.04,
            width: dimension.height * 0.04,
            borderRadius: dimension.height * 0.02,
            marginTop: dimension.height * 0.08,
            marginLeft: 10,
            alignItems: "center",
            // position: "absolute",
          }}
        >
          <Image
            source={require("../assets/VectorW.png")}
            style={{
              width: "50%",
              height: "50%",
              marginTop: dimension.height * 0.01,
            }}
          />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={{ height: dimension.height * 0.7 }}
        />
      </View>

      <View
        style={{
          position: "absolute",
          marginTop: dimension.height * 0.83,
          alignItems: "center",
          width: dimension.width,
        }}
      >
        <Button title="Search" onPress={getProductData} />
      </View>

      {/* <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#0D6EFD",
            borderRadius: 10,
            height: dimension.height * 0.08,
            width: dimension.height * 0.08,
            borderRadius: dimension.height * 0.04,
            alignItems: "center",
            position: "absolute",
          }}
        >
          <Image
            source={require("../assets/VectorW.png")}
            style={{
              width: "40%",
              height: "40%",
              marginTop: dimension.height * 0.025,
            }}
          />
        </TouchableOpacity>
        <Image
          source={require("../assets/bottomBG.png")}
          style={{ width: dimension.width }}
        ></Image>
      </View> */}
    </View>
  );
};

export default ProductScreen;
