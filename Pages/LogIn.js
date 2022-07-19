import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import  FIREBASE_KEY  from "../config";

const LogIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleLogIn = () => {
    axios({
      method: 'post',
      url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
      params :{
        key: FIREBASE_KEY,
      },
      data :{
        email,
        password,
      }
    }).then (() => {
      navigation.navigate('HomePage')
    }).catch (() => {
      email === '' || password === '' ? alert('Create a Account') : alert('Users Not Found')
      navigation.navigate('SignUp')
    })
  }

  const register = () => {
    navigation.navigate('SignUp')
  }
  
  return (
    <SafeAreaView style={{ flex: 1, }}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="enter the mail"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="enter the password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.disabled} onPress={handleLogIn}>
              <Text style={styles.submitText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitContainer} onPress={register}>
              <Text style={styles.submitText}>REGISTER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
  )
}

export default LogIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  input: {
    margin: 12,
    borderWidth: 1,
    borderColor: "gray",
    padding: 6,
    borderRadius: 10,
    fontSize: 16,
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: "space-between",
    marginHorizontal: 12,
  },
  submitContainer: {
    justifyContent: "center",
    backgroundColor: "#94B49F",
    alignItems: "center",
    height: 30,
    width: 120,
    borderRadius: 10,
  },
  disabled: {
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 120,
    borderRadius: 10,
    borderColor: "#94B49F",
    borderWidth: 1,
  },
  submitText: {
    fontSize: 16,
  },
});