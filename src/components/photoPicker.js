import React, { useState, useEffect } from "react";
import { View, Image, Button, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-web";

const PhotoPicker = ({ setImage, image, setNewProducto, newProducto }) => {
  const [cameraPermission, setCameraPermission] = useState(null);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const takePhoto = async () => {
    if (cameraPermission) {
      const { uri } = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (uri) {
        setImage(uri);
        setNewProducto({ ...newProducto, imagen: uri });
      }
    }
  };

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const { uri } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (uri) {
        setImage(uri);
        setNewProducto({ ...newProducto, imagen: uri });
      }
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>Tomar foto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} tonPress={selectImage}>
        <Text style={styles.buttonText}>Seleccionar imagen de galeria</Text>
      </TouchableOpacity>
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, alignSelf: "center" }}
        />
      )}
    </View>
  );
};

export default PhotoPicker;

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
