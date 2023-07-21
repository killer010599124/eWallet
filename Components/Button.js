import React, { useEffect, useState, useRef, useCallback, Component } from 'react';
import { StyleSheet, ScrollView, View, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
const Button = ({ title, onPress  }) => {
  const [dimension, setDimension] = useState(Dimensions.get('window'));
  const onChange = () => {
    setDimension(Dimensions.get('window'));
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      //   Dimensions.removeEventListener('change', onChange);
    };
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={{ ...styles.loginScreenButton, marginTop: dimension.height * 0.05, width: dimension.width - 40, height: dimension.height * 0.06, borderRadius: dimension.height * 0.01 }}
        // onPress={() => navigate('HomeScreen')}
        underlayColor='#fff'>
        <Text style={styles.loginText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loginScreenButton: {
    alignSelf : 'center',
    backgroundColor: '#0D6EFD',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0D6EFD',
    textAlign: 'center',
    alignItems: 'center'
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
    alignItems : 'center',
    lineHeight: 25,
    fontSize: 12,
    paddingLeft: 10,
    paddingRight: 10
  }
});
export default Button;