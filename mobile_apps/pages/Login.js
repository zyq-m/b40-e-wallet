import React, { useState } from "react";
import { View, Text, TextInput, Image } from "react-native";
import axios from "axios";

import Button from "../components/Button";

import instanceAxios from "../lib/instanceAxios";
import { useUserContext } from "../hooks/useUserContext";
import { save, getValueFor } from "../utils/SecureStore";

import globals from "../styles/globals";
import loginStyle from "../styles/loginStyle";

const Login = ({ navigation }) => {
  const [cafeOwner, setCafeOwner] = useState(false);
  const [studentAcc, setStudentAcc] = useState("");
  const [cafeAcc, setCafeAcc] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserContext();

  const authUser = (id, secret, refresh) => {
    setUser({
      id: id,
      login: true,
      secretToken: secret,
      refreshToken: refresh,
    });
  };

  const onSubmit = () => {
    if (cafeOwner) {
      instanceAxios
        .post("/cafe/login", {
          username: cafeAcc,
          password: password,
        })
        .then(res => {
          authUser(cafeAcc, res.data.accessToken, res.data.refreshToken);
          navigation.navigate("Cafe Dashboard");
        })
        .catch(err => alert(err));
    } else {
      instanceAxios
        .post("/students/login", {
          matric_no: studentAcc,
          password: password,
        })
        .then(res => {
          authUser(studentAcc, res.data.accessToken, res.data.refreshToken);
          navigation.navigate("Student Dashboard");
        })
        .catch(err => alert(err));
    }
  };

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
          <Input
            label={"Username |"}
            inputVal={cafeAcc}
            getInput={setCafeAcc}
          />
        ) : (
          <Input
            label={"Matric No. |"}
            inputVal={studentAcc}
            getInput={setStudentAcc}
          />
        )}
        <Input
          label={"Password |"}
          secure={true}
          inputVal={password}
          getInput={setPassword}
        />
        <View style={{ marginTop: 37 }}>
          <Button label={"Login"} onPress={onSubmit} />
        </View>
        <Text
          style={loginStyle.smallText}
          onPress={() => setCafeOwner(!cafeOwner)}
        >
          {cafeOwner ? "Are you a student?" : "Are you a cafe owner?"}
        </Text>
      </View>
    </View>
  );
};

const Input = ({ label, secure, inputVal, getInput }) => {
  return (
    <View style={loginStyle.inputContainer}>
      <Text style={loginStyle.inputLabel}>{label}</Text>
      <TextInput
        style={loginStyle.input}
        secureTextEntry={secure ? true : false}
        value={inputVal}
        onChangeText={getInput}
      />
    </View>
  );
};

export default Login;
