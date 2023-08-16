import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import Button from "../Components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarCodeScanner } from "expo-barcode-scanner";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import axios from "axios";
import Modal from "react-native-modal";
import { LogBox } from "react-native";
import CustomHeader from "../Components/header";
import Barcode from "@kichiyaki/react-native-barcode-generator";
import NumericPad from "react-native-numeric-pad";
import Icon from "react-native-vector-icons/Ionicons";
LogBox.ignoreAllLogs();
const ScanPage = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanData, setScanData] = useState("00000000000");
  const scannerRef = useRef(null);

  const [init, setInit] = useState(true);
  const [previousScreen, setPreviousScreen] = useState("Barcode");
  const [serverUrl, setServerUrl] = useState("");
  const [currentState, setCurrentState] = useState(true);
  const [visibleManual, setVisibleManual] = useState(null);

  const numpadRef = useRef(null);

  const [dimension, setDimension] = useState(Dimensions.get("window"));
  const onChange = () => {
    setDimension(Dimensions.get("window"));
  };
  AsyncStorage.getItem("serverURL").then((url) => {
    setServerUrl(url);
  });
  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      //   Dimensions.removeEventListener('change', onChange);
    };
  });
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something - for example: reset states, ask for camera permission
      setScanned(false);
      setHasPermission(false);
      (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted"); 
      })();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const BarcodeGeneratorInit = () => {
    const barcodeNumber = "0000000000000"; // Replace with your barcode number
    // setInit(false);
    return (
      <View
        style={{
          alignItems: "center",
          width: "100%",
          marginTop: dimension.height * 0.05,
        }}
      >
        <Barcode
          format="CODE128"
          value={barcodeNumber}
          text={barcodeNumber}
          style={{}}
          textStyle={{ fontWeight: "bold", fontSize: 18 }}
          maxWidth={dimension.width * 0.8}
          width={dimension.width * 0.8}
          height={dimension.height * 0.1}
        />
      </View>
    );
  };
  const BarcodeGenerator = () => {
    const barcodeNumber = scanData; // Replace with your barcode number

    return (
      <View
        style={{
          alignItems: "center",
          width: "100%",
          marginTop: dimension.height * 0.05,
        }}
      >
        <Barcode
          format="CODE128"
          value={barcodeNumber}
          text={barcodeNumber}
          style={{}}
          textStyle={{ fontWeight: "bold", fontSize: 18 }}
          maxWidth={dimension.width * 0.8}
          width={dimension.width * 0.8}
          height={dimension.height * 0.1}
        />
      </View>
    );
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    setScanData(data);
    getProduct(data);
    // const response =await axios.get(
    //   `https://api.barcodelookup.com/v3/products?barcode=${data}&formatted=y&key=ka40ww4nzqcd7vk83t6crnda95gz5c`
    // );
    setScanned(false);
    console.log(response.data);

    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const getProduct = (scanData) => {
    const server_url = `${serverUrl}/api/v1/products?name=&barcode=${scanData}`;

    fetch(server_url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        // Here, you can access the JSON data
        console.log(data);
        if (data.length != 0) {
          // setScanned(false);
          navigation.navigate("PriceUpdate", { data });
        } else {
          setVisibleManual(1);
          console.log("no Data");
          // setScanned(false);
        }
        // setProducts(data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  };

  const royalModal = () => {
    return (
      <View
        style={{
          borderTopRightRadius: dimension.width * 0.02,
          borderTopLeftRadius: dimension.width * 0.02,
          height: dimension.height * 0.5,
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        <Octicons
          name="alert"
          size={36}
          color="#FFA800"
          style={{ marginTop: dimension.height * 0.03 }}
        />
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            alignSelf: "center",
            width: dimension.width * 0.6,
            marginTop: dimension?.height * 0.05,
            color: "#15224F",
            fontSize: 16,
          }}
        >
          No product found for number of article.
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            alignSelf: "center",
            width: dimension.width * 0.6,
            marginTop: dimension?.height * 0.01,
            color: "#FFA800",
            fontSize: 20,
          }}
        >
          {scanData}
        </Text>

        <Text
          style={{
            position: "absolute",
            fontWeight: "bold",
            textAlign: "center",
            alignSelf: "center",
            width: dimension.width * 0.8,
            marginTop: dimension?.height * 0.25,
            color: "#736F6F",
            fontSize: 14,
          }}
        >
          Check that you have entered the number printed on the price tag.
        </Text>
        <View
          style={{
            position: "absolute",
            alignItems: "center",
            width: dimension.width,
            marginTop: dimension.height * 0.3,
          }}
        >
          <Button
            title={"New"}
            onPress={() => {
              navigation.navigate("New", { scanData, previousScreen });
              setVisibleManual(null);
            }}
          />
        </View>
        <View
          style={{
            position: "absolute",
            alignItems: "center",
            width: dimension.width,
            marginTop: dimension.height * 0.38,
          }}
        >
          <Button
            title={"Cancel"}
            onPress={() => {
              setVisibleManual(null);
            }}
          />
        </View>
      </View>
    );
  };
  function Screen1() {
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
        <View
          style={{
            borderColor: "red",
            width: dimension.width,
            height: 2,
            borderWidth: 1,
            marginTop: dimension.height * 0.45,
          }}
        ></View>
        <View
          style={{
            position: "absolute",
            marginTop: dimension.height * 0.8,
            width: dimension.width,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Scan the barcode of the produts
          </Text>
        </View>
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => {
              setScanned(false);
            }}
          />
        )}
        {/*
        <View
          style={{
            backgroundColor: "white",
            width: "80%",
            height: "13%",
            marginTop: "100%",
            marginLeft: "10%",
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
          <View style={{ marginLeft: 10, width: "80%" }}>
            <Text style={{ ...styles.info, textAlign: "center" }}>
              If can't recognize barcode,Please add new product
            </Text>
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
              // navigation.navigate("PriceUpdate");
            }}
          >
            <Image
              source={require("../assets/edit.png")}
              style={{ alignSelf: "center", marginTop: 5 }}
            />
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }

  function Screen2() {
    return (
      <View
        style={{
          padding: 20,
          backgroundColor: "white",
          height: dimension.height,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "black",
            fontSize: 18,
            fontWeight: "bold",
            marginTop: dimension.height * 0.01,
          }}
        >
          Enter the number of article
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "#707B81",
            fontSize: 14,
            width: dimension.width * 0.8,
          }}
        >
          {" "}
          To continue, enter an item number from digits without points{" "}
        </Text>

        {init ? BarcodeGeneratorInit() : BarcodeGenerator()}
        {/* {BarcodeGeneratorInit()} */}
        <Text
          style={{
            color: "#2B2B2B",
            fontSize: 12,
          }}
        >
          {" "}
          Enter product barcode number{" "}
        </Text>

        {/* <TextInput
          placeholder="00000000000"
          onChangeText={(text) => setScanData(text)}
          value={scanData}
          style={{
            backgroundColor: "#F7F7F9",
            marginTop: dimension.height * 0.02,
          }}
        /> */}
        <NumericPad
          style={{ marginTop: dimension.height * 0.38, position: "absolute" }}
          ref={numpadRef}
          numLength={20}
          buttonSize={dimension.height * 0.06}
          activeOpacity={0.1}
          onValueChange={(value) => {
            if (value != "") setInit(false);
            else setInit(true);
            setScanData(value);
          }}
          allowDecimal={true}
          // Try them to understand each area :)
          // style={{ backgroundColor: 'black', paddingVertical: 12 }}
          // buttonAreaStyle={{ backgroundColor: 'gray' }}
          // buttonItemStyle={{ backgroundColor: 'red' }}
          rightBottomButton={
            <Icon name="ios-backspace-outline" size={28} color={"#000"} />
          }
          onRightBottomButtonPress={() => {
            numpadRef.current.clear();
          }}
        />
        <Modal isVisible={visibleManual === 1} style={styles.bottomModal}>
          {royalModal()}
        </Modal>
        <View
          style={{
            position: "absolute",
            backgroundColor: "white",
            marginBottom: 16,
            width: dimension.width,
            alignItems: "center",

            marginTop: dimension.height * 0.72,
          }}
        >
          <Button
            title="Search"
            onPress={() => {
              getProduct(scanData);
            }}
            style={{
              backgroundColor: "#0D6EFD",
              marginTop: dimension.height * 0.1,
            }}
          />
        </View>
      </View>
    );
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        marginTop: -dimension.height * 0.062,
      }}
    >
      <View
        style={{
          position: "absolute",
          width: dimension.width,
          marginTop: dimension.height * 0.05,
          zIndex: 9,
        }}
      >
        <CustomHeader
          title="Scan products"
          iconName=""
          onBackPress={() => {
            navigation.navigate("Home");
          }}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: dimension.height * 0.15,
        }}
      >
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => {
            setCurrentState(true);
          }}
        >
          <MaterialCommunityIcons
            name="camera-outline"
            size={24}
            color="black"
          />
          <Text style={currentState ? { color: "blue" } : { color: "black" }}>
            Camera
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => {
            setCurrentState(false);
          }}
        >
          <MaterialCommunityIcons
            name="keyboard-outline"
            size={24}
            color="black"
          />
          <Text style={currentState ? { color: "black" } : { color: "blue" }}>
            Manual
          </Text>
        </TouchableOpacity>
      </View>
      {currentState ? Screen1() : Screen2()}
      {/* <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Camera") {
              iconName = "camera-outline";
            } else if (route.name === "Manual") {
              iconName = "keyboard-outline";
            }

            return (
              <MaterialCommunityIcons name={iconName} size={24} color="black" />
            );
          },
        })}
      >
        <Tab.Screen name="Camera" component={Screen1} />
        <Tab.Screen name="Manual" component={Screen2} />
      </Tab.Navigator> */}
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
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
});

export default ScanPage;
