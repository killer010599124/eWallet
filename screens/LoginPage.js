import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, Text, TextInput, Dimensions } from "react-native";
import Button from "../Components/Button";
const LoginScreen = ({ navigation }) => {
  const [database, setDatabase] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    // fetch('http://your-server.com/authenticate', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     url: navigation.getParam('url'),
    //     username,
    //     password,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     if (responseJson.success) {
    //       navigation.navigate('Main');
    //     } else {
    //       alert('Invalid username or password');
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    navigation.navigate("Home", {username});
   
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
