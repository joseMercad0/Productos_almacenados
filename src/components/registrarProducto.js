import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import PhotoPicker from "./photoPicker";
import axios from "axios";

const RegistrarProducto = ({ barcode }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [newProducto, setNewProducto] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    precio: "",
    barCode: barcode,
    cantidad: "",
    imagenId: "",
    imagenUrl: "",
    usuarioId: "",
    fechaHora: "",
  });

  // Función para guardar el producto
  const saveProduct = async () => {
    try {
      await axios.post("http://52.20.145.207:3000/api/product", newProducto);
      setNewProducto({
        id: "",
        nombre: "",
        descripcion: "",
        precio: "",
        barCode: "",
        cantidad: "",
        imagenId: "",
        imagenUrl: "",
        usuarioId: "",
        fechaHora: "",
      });
      setImage(null);
      setError("");
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={newProducto.nombre}
        onChangeText={(text) =>
          setNewProducto({ ...newProducto, nombre: text })
        }
      />
      <Text style={styles.label}>Cantidad:</Text>
      <TextInput
        style={styles.input}
        value={newProducto.cantidad}
        onChangeText={(text) =>
          setNewProducto({ ...newProducto, cantidad: text })
        }
        keyboardType="numeric"
      />
      <Text style={styles.label}>Precio:</Text>
      <TextInput
        style={styles.input}
        value={newProducto.precio}
        onChangeText={(text) =>
          setNewProducto({ ...newProducto, precio: text })
        }
        keyboardType="numeric"
      />
      <Text style={styles.label}>Barcode:</Text>
      <TextInput style={styles.input} value={barcode} editable={false} />
      <PhotoPicker
        setImage={setImage}
        image={image}
        setNewProducto={setNewProducto}
        newProducto={newProducto}
      />
      <Button title="Guardar" onPress={saveProduct} />
      {error && <p>{error}</p>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  photoButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  photoText: {
    fontSize: 16,
    color: "#666",
  },
  photo: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
});

export default RegistrarProducto;
