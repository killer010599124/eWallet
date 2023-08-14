import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
const CustomHeader = ({ title, onBackPress, onFunctionPress, iconName }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Icon name="chevron-back-outline" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onFunctionPress} style={styles.newButton}>
        <Icon name={iconName} size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    height: 60,
    justifyContent: "space-around",
    alignItems: "center",
  },
  backButton: {
    marginRight: 100,
  },
  newButton: {
    marginLeft: 100,
  },
  title: {
    fontSize: 16,
  },
});

export default CustomHeader;
