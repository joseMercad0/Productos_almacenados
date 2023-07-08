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
// import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ setScreen, onLogin }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState({ correo: "", pass: "" });

  // // función de inicio de sesión FIREBASE AUTH
  // const handleLogin = async () => {
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //   } catch (error) {
  //     if (
  //       error.code === "auth/invalid-email" ||
  //       error.code === "auth/wrong-password"
  //     ) {
  //       setError("Tu email o contraseña son incorrectos");
  //     } else {
  //       setError("Hubo un problema con la petición");
  //     }
  //   }
  // };

  const handleLogin = async () => {
    await axios
      .post("http://52.20.145.207:3000/api/login", user)
      .then((response) => {
        const token = response.data.token;
        const uid = response.data.uid;

        onLogin(token, uid);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          if (error.response.status === 401) {
            setError("Credenciales incorrectas");
          }
        } else if (error.request) {
          console.log("No se recibió respuesta! " + error.request);
        } else {
          console.log("Error! ", error.message);
        }
        //console.log(error.config);
      });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.header} source={chemslar} />
      {error && <Text style={styles.error}>{error}</Text>}
      <Text style={styles.text}>Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={user.correo}
        onChangeText={(text) => setUser({ ...user, correo: text })}
      />
      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={user.pass}
        onChangeText={(text) => setUser({ ...user, pass: text })}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={!user.correo || !user.pass}
      >
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setScreen("signup")}
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 50,
    backgroundColor: "rgb(221, 213, 202)",
  },
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
});
