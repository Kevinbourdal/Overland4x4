import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text } from "react-native";
import ButtonBlueOutline from "../components/ButtonBlueOutline";
import Dimensions from "../constants/dimensions";
import { RootTabScreenProps } from "../types";
import Alert from "react-native-awesome-alerts";

export default function RegisterNavigation({
  navigation,
}: RootTabScreenProps<"route">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetPassword, setRepeatPassword] = useState("");
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

    if (password !== repetPassword) {
      showAlert("Las contraseñas no coinciden");
      setRepeatPassword("");
      setPassword("");
      return false;
    }
    showAlert("Se le envio un email con la confirmacion");
    const emailValue: string = email;
    const passwordValue: string = password;
    navigation.navigate("Login");
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
        <View style={styles.register}>
          <Text style={styles.registeTitle}>Register</Text>
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
        <TextInput
          style={styles.input}
          value={repetPassword}
          placeholder={"Repear Password"}
          secureTextEntry
          onChangeText={(text) => setRepeatPassword(text)}
        />
        <View style={styles.containButton}>
          <ButtonBlueOutline
            style={styles.button}
            text="Registrarme"
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
  register: {
    flex: 1,
    left: Dimensions.width * 0.1,
    top: Dimensions.height * -0.1,
  },
  registeTitle: {
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
