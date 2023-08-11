import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StatusBar } from "react-native";
import WelcomeScreen from "./screens/WelcomePage";
import LoginScreen from "./screens/LoginPage";
import HomeScreen from "./screens/HomePage";
import ProductScreen from "./screens/ProductPage";
import ProductDetailPage from "./screens/Details";
import EditPage from "./screens/EditPage";
import NoResultPage from "./screens/EmptyPage";
import NewPage from "./screens/NewPage";
import ScannerPage from "./screens/ScanPage";
import PriceUpdatePage from "./screens/PriceUpdate";
import Barcode from "./screens/Barcode";
// Import any other screens you want to use
const Stack = createStackNavigator();
export default function App() {
  return (
  
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Product" component={ProductScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Details" component={ProductDetailPage} options={{ headerShown: false }}/>
          <Stack.Screen name="Edit" component={EditPage} options={{ headerShown: false }}/>
          <Stack.Screen name="Empty" component={NoResultPage} options={{ headerShown: false }}/>
          <Stack.Screen name="New" component={NewPage} options={{ headerShown: false }}/>
          <Stack.Screen name="Scanner" component={ScannerPage} options={{ headerShown: false }}/>
          <Stack.Screen name="PriceUpdate" component={PriceUpdatePage} options={{ headerShown: false }}/>
          <Stack.Screen name="Barcode" component={Barcode} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
