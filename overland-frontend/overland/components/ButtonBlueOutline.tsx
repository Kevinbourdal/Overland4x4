import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ButtonBlueOutline(props: any) {
  const { text, onPress } = props;

  return (
    <TouchableOpacity style={style.button} onPress={onPress}>
      <Text style={style.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  button: {
    paddingVertical: 15,
    width: "20%",
    overflow: "hidden",
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#0EAEE0",
    justifyContent: "space-between",
  },
  text: {
    textAlign: "center",
    color: "#f1f1f1",
    fontWeight: "bold",
  },
});
