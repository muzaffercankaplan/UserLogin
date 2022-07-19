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
import { FIREBASE_KEY } from "../config";


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigation = useNavigation();
  const createAccount = () => {
    axios({
      method: "post",
      url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp",
      params: {
        key: FIREBASE_KEY,
      },
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        axios({
          method: "post",
          url: "https://identitytoolkit.googleapis.com/v1/accounts:update",
          params: {
            key: FIREBASE_KEY,
          },
          data: {
            idToken: res.data.idToken,
            displayName: name,
          },
        })
          .then((res) => {
            navigation.navigate("LogIn");
          })
          .catch((e) => {
            alert(e);
          });
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="enter the name"
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="enter the mail"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="enter the password"
          onChangeText={setPassword}
          value={password}
        />
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.submitContainer}
            onPress={createAccount}
          >
            <Text style={styles.submitText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

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
    height: 50,
    width: 100,
    borderRadius: 10,
    borderColor: "#94B49F",
    borderWidth: 1,
  },
  submitText: {
    fontSize: 16,
  },
});
