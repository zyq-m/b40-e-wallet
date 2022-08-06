import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";

import globals from "../styles/globals";
import Button from "../components/Button";

const Login = ({ navigation }) => {
  const [cafeOwner, setCafeOwner] = useState(false);

  return (
    <View style={[globals.container, { justifyContent: "center" }]}>
      <View>
        <Image
          style={loginStyle.logo}
          source={require("../assets/logo-unisza.png")}
        />
        <Text style={loginStyle.loginHeader}>Welcome Back</Text>
        {cafeOwner ? (
          <Input label={"Matric No. |"} />
        ) : (
          <Input label={"Username |"} />
        )}
        <Input label={"Password |"} secure={true} />
        <View style={{ marginTop: 37 }}>
          <Button label={"Login"} />
        </View>
        <Text
          style={loginStyle.smallText}
          onPress={() => setCafeOwner(!cafeOwner)}
        >
          {cafeOwner ? "Are you a cafe owner?" : "Are you a student?"}
        </Text>
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
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  inputLabel: {
    fontSize: 12,
    color: "rgba(160, 160, 160, 1)",
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  smallText: {
    marginTop: 21,
    color: "rgba(0, 0, 0, 0.62)",
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default Login;
