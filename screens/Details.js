import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Button from "../Components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
const ProductDetailPage = ({ navigation, route }) => {
  const { product } = route.params;
  const parsedProduct = JSON.parse(product);
  // console.log(product);
  const [dimension, setDimension] = useState(Dimensions.get("window"));
  const [serverUrl, setServerUrl] = useState("");
  AsyncStorage.getItem("serverURL").then((url) => {
    setServerUrl(url);
  });
  const onChange = () => {
    setDimension(Dimensions.get("window"));
  };
  // console.log(`${serverUrl}${parsedProduct.image_url}`);
  
  return (
    <View style={{ backgroundColor: "white", padding: 10, flex: 1 }}>
      <Text style={styles.price}>${parsedProduct.standard_price}</Text>
      <Text style={styles.costPrice}>${parsedProduct.list_price}</Text>

      <Image
        source={{ uri: `${serverUrl}${parsedProduct.image_url}` }}
        style={styles.image}
      />
      {/* <View style = {{position : 'absolute', display : 'flex', flexDirection :'row', top : '50%', right:'5%'}}>
        <TouchableOpacity style = {{backgroundColor : '#54DA92',  borderRadius : 20, paddingHorizontal : 3}}><Text style = {{fontWeight : 'bold',fontSize : 12}}>fruniture</Text></TouchableOpacity>
        <TouchableOpacity style = {{backgroundColor : '#FFE382', borderRadius : 20, paddingHorizontal : 3, marginLeft : 2}}><Text style = {{fontWeight : 'bold',}}>kids</Text></TouchableOpacity>
      </View> */}
      <View style={{ width: "60%", marginLeft: "5%" }}>
        <Text style={{ ...styles.name, color: "#707B81", fontSize: 14 }}>
          {parsedProduct.default_code}
        </Text>
        <Text style={styles.name}>{parsedProduct.name}</Text>
        <Text style={styles.barcode}>{parsedProduct.barcode}</Text>
      </View>

      <View
        style={{
          position: "absolute",
          alignItems: "center",
          width: dimension.width,
          marginTop: dimension.height * 0.8,
        }}
      >
        <Button
          title="Edit"
          onPress={() => navigation.navigate("Edit", { parsedProduct })}
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
    marginTop: "5%",
    width: "50%",
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

export default ProductDetailPage;
