import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text } from "react-native";
import ButtonBlueOutline from "../components/ButtonBlueOutline";
import Dimensions from "../constants/Dimensions";
import { RootTabScreenProps } from "../types";
import Alert from "react-native-awesome-alerts";

export default function LoginNavigation({
  navigation,
}: RootTabScreenProps<"route">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");

  function showAlert(message: string) {
    setAlert(true);
    setMessage(message);
  }

  function closeAlert() {
    setAlert(false);
  }

  function doUserRegistration() {
    if (email.length < 7 || email.indexOf("@") < 0) {
      showAlert("Debe ingresar un email valido");
      setEmail("");
      return false;
    }
    if (password.length < 12) {
      showAlert("La contraseña debe tener al menos 12 caracteres");
      return false;
    }
    navigation.navigate("LandingPage");
    const emailValue: string = email;
    const passwordValue: string = password;
    return true;
  }

  return (
    <SafeAreaView style={styles.prue}>
      <View style={styles.contain}>
        <View style={styles.alert}>
          <Alert
            cancelText="cerrar"
            showProgress={true}
            show={alert}
            title={message}
            closeOnTouchOutside={false}
            showConfirmButton={true}
            confirmText="Cerrar"
            onConfirmPressed={() => {
              closeAlert();
            }}
          />
        </View>
        <View style={styles.login}>
          <Text style={styles.LoginTitle}>Login</Text>
        </View>
        <TextInput
          style={styles.input}
          value={email}
          autoFocus={true}
          placeholder={"Email"}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize={"none"}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder={"Password"}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.containButton}>
          <ButtonBlueOutline
            style={styles.button}
            text="Login"
            onPress={() => doUserRegistration()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: Dimensions.height * 3,
    marginBottom: Dimensions.height * 0.01,
    width: Dimensions.width * 0.3,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "white",
  },
  login: {
    flex: 1,
    left: Dimensions.width * 0.12,
    top: Dimensions.height * -0.1,
  },
  LoginTitle: {
    color: "#FFFFFF",
    fontSize: 40,
    fontFamily: "Bangers",
    fontStyle: "normal",
    marginRight: Dimensions.width * 0.3,
    // top: -200,
  },
  prue: {
    flex: 1,
    backgroundColor: "#414345",
  },
  contain: {
    justifyContent: "center",
    width: Dimensions.width * 0.4,
    height: Dimensions.height * 0.2,
    left: Dimensions.width * 0.35,
  },
  button: {
    color: "#f1f1f1",
  },
  containButton: {
    left: Dimensions.width * 0.09,
  },
  alert: {
    flex: 1,
    width: Dimensions.width * 0.3,
  },
});
