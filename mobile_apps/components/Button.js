import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

<<<<<<< HEAD
const Button = ({ label, onAction }) => {
  return (
    <TouchableOpacity onPress={onAction}>
=======
const Button = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
>>>>>>> 2486dbdccc412994c493f05d6ff09f668cca0c39
      <Text style={buttonStyle.button}>{label}</Text>
    </TouchableOpacity>
  );
};

const buttonStyle = StyleSheet.create({
  button: {
    paddingVertical: 12,
    textAlign: "center",
    fontWeight: "600",
    backgroundColor: "#FFD400",
    borderRadius: 9,
  },
});

export default Button;
