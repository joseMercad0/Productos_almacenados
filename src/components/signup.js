import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import chemslar from "../../assets/Chemslar.png";
import { auth } from "../../config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = ({ setScreen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  // función registrar usuario
  const handleLogin = async () => {
    try {
      if (password === confirmPassword) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        setError("Las contraseñas no coinciden");
      }
    } catch (error) {
      setError("Hubo un problema creando tu cuenta");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Registrar usuario</Text>

      <Image style={styles.header} source={chemslar} />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity onPress={() => setScreen("login")}>
        <Text style={styles.link}>Iniciar sesión con cuenta existente</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={styles.text}>Confirmar password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={!email || !password || !confirmPassword}
      >
        <Text style={styles.buttonText}>Crear cuenta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 50,
    backgroundColor: "rgb(199, 199, 204)",
  },
  textHeader: { alignSelf: "center", fontSize: 22, fontWeight: "bold" },
  header: {
    objectFit: "contain",
    height: 250,
    width: 200,
    alignSelf: "center",
  },
  error: { color: "red" },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  button: {
    height: 40,
    width: 200,
    backgroundColor: "rgb(0,117,227)",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 15,
  },
  buttonText: { color: "#fff" },
  link: {
    color: "blue",
    marginBottom: 20,
  },
});
