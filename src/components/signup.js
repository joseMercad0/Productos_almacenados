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
import axios from "axios";
// import { auth } from "../../config";
// import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = ({ setScreen }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  // // función registrar usuario FIREBASE AUTH
  // const handleSignup = async () => {
  //   try {
  //     if (password === confirmPassword) {
  //       await createUserWithEmailAndPassword(auth, email, password);
  //     } else {
  //       setError("Las contraseñas no coinciden");
  //     }
  //   } catch (error) {
  //     setError("Hubo un problema creando tu cuenta");
  //   }
  // };

  const handleSignup = async (nombre, email, password) => {
    const newUser = {
      nombre: nombre,
      correo: email,
      pass: password,
      rol: "user",
    };
    await axios
      .post("http://52.20.145.207:3000/api/user", newUser)
      .then(() => {
        console.log("Usuario creado exitosamente!");
        setScreen("login");
      })
      .catch((error) => {
        console.log("Ocurrio un error!: " + error.message);
        setError("Hubo un problema creando tu cuenta!");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Registrar usuario</Text>

      <Image style={styles.header} source={chemslar} />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity onPress={() => setScreen("login")}>
        <Text style={styles.link}>Iniciar sesión con cuenta existente</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={nombre}
        onChangeText={(text) => setNombre(text)}
      />
      <Text style={styles.text}>Correo electrónico</Text>
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
        onPress={() => {
          handleSignup(nombre, email, password);
        }}
        disabled={!nombre || !email || !password || !confirmPassword}
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
