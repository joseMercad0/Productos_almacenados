import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db, auth } from "../config";
import { ref, onValue } from "firebase/database";
import { signOut } from "firebase/auth";

const FetchData = (props) => {
  const [todoData, setTodoData] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, `usuarios/${props.uid}/snaps`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newUsuarios = Object.values(data);
        console.log(newUsuarios);
        setTodoData(newUsuarios);
      } else {
        setTodoData([]);
      }
    });
  }, []);

  //Cerrar sesión handler
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Button style={{ flex: 1 }} title="Cerrar sesión" onPress={logout} />
      <Text style={styles.header}>Productos Registrados</Text>
      <ScrollView>
        {todoData.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Image style={styles.image} source={{ uri: item.imagenURL }} />
              <Text style={styles.text}>Descripción: {item.descripcion}</Text>
              <Text style={styles.text}>Precio: {item.precio}</Text>
              <Text style={styles.text}>Cantidad: {item.cantidad}</Text>
              <Text style={styles.text}>Barcode: {item.barcode}</Text>
              <Text style={styles.text}>From: {item.from}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FetchData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 50,
    fontWeight: "bold",
  },
  itemContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
});
