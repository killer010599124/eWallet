import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, Text, TextInput, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../Components/Button";
const LoginScreen = ({ navigation, route }) => {
  const [database, setDatabase] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { url } = route.params;

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

  const handleLogin = () => {
    // Call server-side script to authenticate user

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
              db: `${database}`,
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
              navigation.navigate("Home", { username });
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
      <Text
        style={{
          textAlign: "center",
          fontSize: 30,
          marginTop: dimension.height * 0.1,
        }}
      >
        Welcome Back!
      </Text>
      <Text style={{ textAlign: "center", color: "#707B81", fontSize: 14 }}>
        {" "}
        Choose Your Database AND Insert Your Login And Password{" "}
      </Text>
      <Text
        style={{
          color: "#2B2B2B",
          fontSize: 12,
          marginTop: dimension.height * 0.05,
        }}
      >
        {" "}
        Database{" "}
      </Text>
      <TextInput
        placeholder="xxxxxx"
        onChangeText={(text) => setDatabase(text)}
        value={database}
        style={{
          fontSize: 12,
          backgroundColor: "#F7F7F9",
          marginTop: dimension.height * 0.01,
        }}
      />
      <Text
        style={{
          color: "#2B2B2B",
          fontSize: 12,
          marginTop: dimension.height * 0.03,
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
          fontSize: 12,
          backgroundColor: "#F7F7F9",
          marginTop: dimension.height * 0.01,
        }}
      />
      <Text
        style={{
          color: "#2B2B2B",
          fontSize: 12,
          marginTop: dimension.height * 0.03,
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
          fontSize: 12,
          backgroundColor: "#F7F7F9",
          marginTop: dimension.height * 0.01,
        }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
