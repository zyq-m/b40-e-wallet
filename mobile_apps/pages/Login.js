import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import globals from "../styles/globals";

const Login = ({ navigation }) => {
  return (
    <View style={[globals.container, { justifyContent: "center" }]}>
      <View>
        <Image
          style={loginStyle.logo}
          source={require("../assets/logo-unisza.png")}
        />
        <Text style={loginStyle.loginHeader}>Welcome Back</Text>
        <Input label={"Matric No. |"} />
        <Input label={"Password |"} secure={true} />
        <Button label={"Login"} />
      </View>
    </View>
  );
};

const Input = ({ label, secure }) => {
  return (
    <View style={loginStyle.inputContainer}>
      <Text style={loginStyle.inputLabel}>{label}</Text>
      <TextInput
        style={loginStyle.input}
        secureTextEntry={secure ? true : false}
      />
    </View>
  );
};

const Button = ({ label }) => {
  return (
    <TouchableOpacity>
      <Text style={loginStyle.button}>{label}</Text>
    </TouchableOpacity>
  );
};

const loginStyle = StyleSheet.create({
  loginHeader: {
    fontSize: 32,
    fontWeight: "600",
    textAlign: "center",
  },
  logo: {
    width: 212,
    height: 99,
    marginHorizontal: "auto",
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
  },
  inputLabel: {
    fontSize: 12,
    color: "#A0A0A0",
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  button: {
    marginTop: 37,
    paddingVertical: 12,
    textAlign: "center",
    fontWeight: "600",
    backgroundColor: "#FFD400",
    borderRadius: 9,
  },
});

export default Login;
