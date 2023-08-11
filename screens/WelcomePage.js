import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, TextInput,Dimensions } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from '../Components/Button';
const WelcomeScreen = ({ navigation }) => {

  
  const [url, setUrl] = useState('');
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
    <View style = {{padding : 20, backgroundColor : 'white', height : dimension.height}}>
      <Text style={{textAlign:'center',fontSize: 30,marginTop :dimension.height *0.2 }}>Welcome</Text>
      <Text style ={{textAlign:'center',color :'#707B81', fontSize : 14}} > Input Your Server URL To Enter To The System </Text>
      <Text style ={{color :'#2B2B2B', fontSize : 12, marginTop : dimension.height * 0.1}} > Enter your odoo server URL </Text>
      <TextInput
        placeholder="https://"
        onChangeText={(text) => setUrl(text)}
        value={url}
        style = {{backgroundColor : '#F7F7F9', marginTop : dimension.height * 0.02}}
      />
      <Button
        title="START"
        onPress={() => {
          AsyncStorage.setItem("serverURL", url);
          navigation.navigate('Login', { url });
        }
        }
        style = {{backgroundColor : '#0D6EFD' , marginTop : dimension.height * 0.1 ,}}
      />
    </View>
  );
};

export default WelcomeScreen;