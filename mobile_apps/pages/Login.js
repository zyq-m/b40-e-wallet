import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";

import Button from "../components/Button";

import globals from "../styles/globals";
import loginStyle from "../styles/loginStyle";

const Login = ({ navigation }) => {
  const [cafeOwner, setCafeOwner] = useState(false);

  return (
    <View style={[globals.container, { justifyContent: "center" }]}>
      <View>
        <View style={{ alignItems: "center" }}>
          <Image
            style={loginStyle.logo}
            source={require("../assets/logo-unisza.png")}
          />
        </View>
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

export default Login;
