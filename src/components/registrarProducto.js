import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import PhotoPicker from "./photoPicker";
import axios from "axios";
import { storage } from "../../config";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

const RegistrarProducto = ({ barcode, setScreen, uid }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [newProducto, setNewProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    barCode: barcode,
    cantidad: "",
    imagenId: "",
    imagenUrl: "",
    usuarioId: uid,
  });

  // Función para guardar el producto
  const saveProduct = async () => {
    const imageName = generateRandomImageName();
    const downloadURL = await subirImagen(image, imageName);

    //actualizar imagenId e imagenUrl del producto nuevo
    const updatedProducto = {
      ...newProducto,
      imagenId: imageName,
      imagenUrl: downloadURL,
    };

    try {
      await axios.post(
        "http://52.20.145.207:3000/api/product",
        updatedProducto
      );

      setNewProducto({
        nombre: "",
        descripcion: "",
        precio: "",
        barCode: "",
        cantidad: "",
        imagenId: "",
        imagenUrl: "",
        usuarioId: uid,
      });
      setImage(null);
      setError("");
      setScreen(null);
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  //función subir imagen al storage
  const subirImagen = async (image, imageName) => {
    try {
      const metadata = { contentType: "image/jpeg" };
      const storageRef = ref(storage, `imagenes/${imageName}.jpg`);
      const imageBlob = await getBlobFromUri(image);

      // Subir la imagen al storage
      await uploadBytes(storageRef, imageBlob, metadata);

      // Obtener URL de la imagen subida
      const downloadURL = await getDownloadURL(storageRef);

      console.log("Imagen subida exitosamente");

      return downloadURL;
    } catch (error) {
      setError("Hubo un error al subir la imagen");
      console.log(error);
    }
  };

  // Generar nombre aleatorio para imagen
  const generateRandomImageName = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let imageName = "";

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      imageName += characters.charAt(randomIndex);
    }

    return `${imageName}`;
  };

  // Convertir uri de imagen a Blob para subirlo al storage
  const getBlobFromUri = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    return blob;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setScreen(null);
        }}
      >
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
      <ScrollView>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={newProducto.nombre}
          onChangeText={(text) =>
            setNewProducto({ ...newProducto, nombre: text })
          }
        />
        <Text style={styles.label}>Descripcion:</Text>
        <TextInput
          style={styles.input}
          value={newProducto.descripcion}
          onChangeText={(text) =>
            setNewProducto({ ...newProducto, descripcion: text })
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            saveProduct();
          }}
          disabled={
            !newProducto.nombre ||
            !newProducto.descripcion ||
            !newProducto.cantidad ||
            !newProducto.precio ||
            !image
          }
        >
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
        {error && <p>{error}</p>}
      </ScrollView>
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

export default RegistrarProducto;
