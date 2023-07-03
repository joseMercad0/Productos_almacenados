import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import PhotoPicker from "./photoPicker";

const RegistrarProducto = ({ barcode }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  // Función para guardar el producto
  const saveProduct = () => {
    // Aquí puedes implementar la lógica para guardar el producto en tu base de datos o hacer cualquier otra acción necesaria
    console.log("Producto guardado:", {
      name,
      quantity,
      price,
      barcode,
      image,
    });

    // Restablecer los campos del formulario después de guardar
    setName("");
    setQuantity("");
    setPrice("");
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Cantidad:</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Precio:</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Barcode:</Text>
      <TextInput style={styles.input} value={barcode} editable={false} />
      <PhotoPicker setImage={setImage} image={image} />
      <Button title="Guardar" onPress={saveProduct} />
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
