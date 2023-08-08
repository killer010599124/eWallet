import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
const Barcode = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanData, setScanData] = useState("");
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setScanData(data);
    const response =await axios.get(
      `https://api.barcodelookup.com/v3/products?barcode=${data}&formatted=y&key=ka40ww4nzqcd7vk83t6crnda95gz5c`
    );
    console.log(response.data);
   
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  }; 

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        // <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
        <View
          style={{
            backgroundColor: "white",
            width: "80%",
            height: "10%",
            marginTop: "100%",
            marginLeft : '10%',
            padding: 10,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            shadowColor: "#AD6C48",
            shadowOffset: {
              width: 10,
              height: 10,
            },
            shadowOpacity: 10,
            shadowRadius: 107,
            elevation: 20,
          }}
        >
          <Image source={require("../assets/shoe4.png")} style={styles.image} />
          <View style={{ marginLeft: 10, width: "60%" }}>
            <Text style={styles.info}>Information about the image</Text>
            <Text style={styles.info}>$154.00</Text>
            <Text style={styles.info}>{scanData}</Text>
          </View>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              backgroundColor: "#5A6CF3",
              alignItems: "center",
              borderRadius: 8,
            }}
            onPress={() => {
              navigation.navigate("PriceUpdate");
            }}
          >
            <Image
              source={require("../assets/edit.png")}
              style={{ alignSelf: "center", marginTop: 5 }}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    // position: "absolute",
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "20%",
    height: "100%",
  },
  info: {
    color: "black",
    fontSize: 12,
  },
});

export default Barcode;
 