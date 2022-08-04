import React from "react";
import { StyleSheet } from "react-native";
import { RootTabScreenProps } from "../types";
import Banner from "../components/Banner";

export default function DriverScreen({
  navigation,
}: RootTabScreenProps<"DriverScreen">) {
  return (
    <view>
      <Banner />
      <text>lalalal</text>
    </view>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
