import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, Text, TextInput, Dimensions, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../Components/Button";
import { ListItem } from "react-native-elements";
import CustomHeader from "../Components/header";
const LoginScreen = ({ navigation, route }) => {
  const [database, setDatabase] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { url } = route.params;
  const { list } = route.params;
  const databaseList = list.map((str, key) => {
    return { label: str, value: str };
  });
  const [items, setItems] = useState(databaseList);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

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

  const [selectedValue, setSelectedValue] = useState("");

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  const handleLogin = () => {
    // Call server-side script to authenticate user
    // console.log(value)
    AsyncStorage.setItem("username", username);
    AsyncStorage.getItem("serverURL")
      .then((url) => {
        // console.log(url); // 'https://api.example.com'
        const server_url = `${url}/web/session/authenticate`;
        fetch(server_url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "call",
            params: {
              db: `${value}`,
              login: `${username}`,
              password: `${password}`,
              context: {},
            },
            id: 1,
          }),
        })
          .then((response) => {
            const session_id = response.headers.get("Set-Cookie");
            console.log(session_id);
            AsyncStorage.setItem("sessionId", session_id);
            return response.json();
          })
          .then((data) => {
            // Here, you can access the JSON data

            if (data.result) {
              navigation.navigate("Home");
            } else {
              alert("Invalid database name or username or password");
            }
            // Do further processing or update your React Native component state
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "white",
        height: dimension.height,
      }}
    >
      <View style = {{position : 'absolute', width : dimension.width, marginTop : dimension.height * 0.05}}>
        <CustomHeader title="" onBackPress={() => {navigation.navigate('Welcome')}} />
      </View>

      <Text
        style={{
          textAlign: "center",
          fontSize: dimension.height * 0.05,
          marginTop: dimension.height * 0.15,
        }}
      >
        Welcome Back!
      </Text>
      <Text style={{ textAlign: "center", color: "#707B81", fontSize: 20 }}>
        {" "}
        Choose Your Database AND Insert Your Login And Password{" "}
      </Text>
      <Text
        style={{
          color: "#2B2B2B",
          fontSize: 14,
          marginTop: dimension.height * 0.05,
        }}
      >
        {" "}
        Database{" "}
      </Text>

      <DropDownPicker
        style={{
          fontSize: dimension.height * 0.025,
          borderRadius: 15,
          height: dimension.height * 0.04,
          paddingHorizontal: 5,
          backgroundColor: "#F7F7F9",
          zIndex: 999,
        }}
        placeholder="Select an database"
        open={open}
        value={value}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        items={items}
      ></DropDownPicker>
      <Text
        style={{
          color: "#2B2B2B",
          fontSize: 14,
          marginTop: dimension.height * 0.03,
          zIndex: -3,
        }}
      >
        {" "}
        Username{" "}
      </Text>
      <TextInput
        placeholder="Enter username"
        onChangeText={setUsername}
        value={username}
        style={{
          fontSize: dimension.height * 0.025,
          borderRadius: 5,
          paddingHorizontal: 5,
          height: dimension.height * 0.05,
          backgroundColor: "#F7F7F9",
          marginTop: dimension.height * 0.01,
          zIndex: -3,
        }}
      />
      <Text
        style={{
          color: "#2B2B2B",
          fontSize: 14,
          marginTop: dimension.height * 0.03,
          zIndex: -3,
        }}
      >
        {" "}
        Password{" "}
      </Text>
      <TextInput
        placeholder="Enter password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        style={{
          fontSize: dimension.height * 0.025,
          borderRadius: 5,
          height: dimension.height * 0.05,
          paddingHorizontal: 5,
          backgroundColor: "#F7F7F9",
          marginTop: dimension.height * 0.01,
          zIndex: -3,
        }}
      />
      <View
        style={{
          position: "absolute",
          backgroundColor: "white",
          marginBottom: 16,
          width: dimension.width,
          alignItems: "center",

          marginTop: dimension.height * 0.9,
        }}
      >
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  selectInput: {
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#F7F7F9",
  },
  selectedValue: {
    marginTop: 20,
  },
});
export default LoginScreen;
