import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Avatar } from "react-native-elements";
import Button from "../Components/Button";
const HomeScreen = ({ navigation, route }) => {
  const { username } = route.params;
  const avatarTitle = username.charAt(0).toUpperCase();

  const [dimension, setDimension] = useState(Dimensions.get("window"));
  const onChange = () => {
    setDimension(Dimensions.get("window"));
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    console.log(username);
    return () => {
      //   Dimensions.removeEventListener('change', onChange);
    };
  });

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "white",
        height: dimension.height,
      }}
    >
      <View style={{ marginTop: dimension.height * 0.1 }}>
        <View style={styles.header}>
          <InitialIcon initials={avatarTitle} />
          <View style={{ paddingLeft: 10 }}>
            <Text style={styles.fullName}>Hello</Text>
            <Text style={{ color: "#363636" }}>{username}</Text>
          </View>
        </View>
        {/* Other content for the Home screen */}
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: "#F7EFEE",
            marginTop: dimension.height * 0.1,
            height: dimension.height * 0.15,
            borderRadius: 10,
            alignItems: "center",
          }}
          underlayColor="#fff"
          onPress={() => {
            navigation.navigate('Product');
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#FFE382",
              borderRadius: 10,
              marginTop: dimension.height * 0.02,
              height: dimension.height * 0.08,
              width: dimension.height * 0.08,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/search.png")}
              style={{
                width: "60%",
                height: "60%",
                marginTop: dimension.height * 0.015,
              }}
            />
          </TouchableOpacity>
          <Text style={{ color: "#363636", textAlign: "center", fontSize: 12 }}>
            Product
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: dimension.height * 0.02,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#F7EFEE",
              height: dimension.height * 0.15,
              width: "45%",
              borderRadius: 10,
              alignItems: "center",
            }}
            underlayColor="#fff"
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#B0EDF3",
                borderRadius: 10,
                marginTop: dimension.height * 0.02,
                height: dimension.height * 0.08,
                width: dimension.height * 0.08,
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/tag.png")}
                style={{
                  width: "60%",
                  height: "60%",
                  marginTop: dimension.height * 0.015,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{ color: "#363636", textAlign: "center", fontSize: 12 }}
            >
              Price Update
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#F7EFEE",

              height: dimension.height * 0.15,
              borderRadius: 10,
              width: "45%",
              alignItems: "center",
            }}
            underlayColor="#fff"
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#B0EDF3",
                borderRadius: 10,
                marginTop: dimension.height * 0.02,
                height: dimension.height * 0.08,
                width: dimension.height * 0.08,
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/print.png")}
                style={{
                  width: "60%",
                  height: "60%",
                  marginTop: dimension.height * 0.015,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{ color: "#363636", textAlign: "center", fontSize: 12 }}
            >
              Product Print
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#D5D5DC",
            borderRadius: 10,
            marginTop: dimension.height * 0.2,
            height: dimension.height * 0.08,
            width: dimension.height * 0.08,
            borderRadius: dimension.height * 0.04,
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/Vector.png")}
            style={{
              width: "40%",
              height: "40%",
              marginTop: dimension.height * 0.025,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const InitialIcon = ({ initials }) => {
  return (
    <View
      style={{
        backgroundColor: "#FFE382",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        width: 50,
        height: 50,
      }}
    >
      <Text style={{ color: "black", fontSize: 20 }}>{initials}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    marginRight: 10,
  },
  fullName: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default HomeScreen;
