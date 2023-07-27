import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";

const ProductScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState("");
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

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "We Have New Products With Offers",
      price: "$9.99",
      costPrice: "$260.00",
      barcode: "123456789",
      image: require("../assets/shoe1.png"),
    },
    {
      id: 2,
      name: "We Have New Products With Offers",
      price: "$19.99",
      costPrice: "$260.00",
      barcode: "987654321",
      image: require("../assets/shoe2.png"),
    },
    {
      id: 3,
      name: "We Have New Products With Offers",
      price: "$29.99",
      costPrice: "$260.00",
      barcode: "456789123",
      image: require("../assets/shoe3.png"),
    },
    {
      id: 4,
      name: "We Have New Products With Offers",
      price: "$29.99",
      costPrice: "$260.00",
      barcode: "456789123",
      image: require("../assets/shoe4.png"),
    },
  ]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(text.toLowerCase())
    );
    setProducts(filteredProducts);
  };
  const handleProductPress = (item) => {
    navigation.navigate('Details', { product: JSON.stringify(item) });
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
      onPress={ () => {
        handleProductPress(item)
      }}
      
    >
      <Image
        source={item.image}
        style={{
          width: dimension.width * 0.2,
          height: dimension.width * 0.2,
          marginRight: 10,
          marginLeft: 10,
          backgroundColor: "#F7F7F9",
          borderRadius: 10,
        }}
      />
      <View style={{ marginLeft: 40 }}>
        <Text
          style={{
            color: "#0D6EFD",
            fontSize: 12,
            width: dimension.width * 0.4,
          }}
        >
          {item.name}
        </Text>
        <Text style={{ fontSize: 12 }}>{item.barcode}</Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ fontSize: 12 }}>{item.price}</Text>
          <Text style={{ fontSize: 12, marginLeft: dimension.width * 0.2 }}>
            {item.costPrice}
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
            fontSize : 12
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
              marginLeft: -dimension.width * 0.85,
              zIndex: 99,
            }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <View style= {{alignItems :'center'}}>
      <TouchableOpacity
          style={{
            backgroundColor: "#0D6EFD",
            borderRadius: 10,
            height: dimension.height * 0.08,
            width: dimension.height * 0.08,
            borderRadius: dimension.height * 0.04,
            alignItems: "center",
            position : 'absolute'
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
          style={{ width: dimension.width, }}
        ></Image>
      </View>
    </View>
  );
};

export default ProductScreen;
