import React, { useState } from "react";
import { View, Text, TextInput, Image } from "react-native";

import Button from "../components/Button";

import instanceAxios from "../lib/instanceAxios";

import globals from "../styles/globals";
import loginStyle from "../styles/loginStyle";

const Login = ({ navigation }) => {
  const [cafeOwner, setCafeOwner] = useState(false);
  const [studentAcc, setStudentAcc] = useState("");
  const [cafeAcc, setCafeAcc] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    if (cafeOwner) {
      instanceAxios
        .post("/cafe/login", {
          username: cafeAcc,
          password: password,
        })
        .then(res => console.log(res))
        .then(() => navigation.navigate("Cafe Dashboard"))
        .catch(err => alert("Wrong matric no./sehesss"));
    } else {
      instanceAxios
        .post("/students/login", {
          matric_no: studentAcc,
          password: password,
        })
        .then(res => console.log(res))
        .then(() => navigation.navigate("Student Dashboard"))
        .catch(err => alert("Wrong matric no./username or password"));
    }
  };

  const onSubmit = () => {
    if (cafeOwner) {
      navigation.navigate("cafeDashboard");
    } else {
      navigation.navigate("studentDashboard");
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
<<<<<<< HEAD
          <Input label={"Username |"} />
        ) : (
          <Input label={"Matric No. |"} />
=======
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
>>>>>>> 2486dbdccc412994c493f05d6ff09f668cca0c39
        )}
        <Input
          label={"Password |"}
          secure={true}
          inputVal={password}
          getInput={setPassword}
        />
        <View style={{ marginTop: 37 }}>
<<<<<<< HEAD
          <Button label={"Login"} onAction={onSubmit} />
=======
          <Button label={"Login"} onPress={onSubmit} />
>>>>>>> 2486dbdccc412994c493f05d6ff09f668cca0c39
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
