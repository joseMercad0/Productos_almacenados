import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
//import { signOut } from "firebase/auth";
//import { auth } from "../../config";

const Drawer = ({ onEditar, offEditar, estaEditando, logout }) => {
  // //Cerrar sesión handler FIREBASE AUTH
  // const logout = async () => {
  //   try {
  //     await signOut(auth);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const renderDrawer = () => {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff", padding: 15 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={estaEditando ? offEditar : onEditar}
        >
          <Text style={styles.buttonText}>
            {estaEditando ? "Dejar de editar" : "Editar productos"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return renderDrawer();
};

export default Drawer;

const styles = StyleSheet.create({
  button: {
    height: 40,
    backgroundColor: "rgb(0,117,227)",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
  },
});
