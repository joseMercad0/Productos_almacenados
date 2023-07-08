import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

const PhotoPicker = ({ setImage, image }) => {
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
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          takePhoto();
        }}
      >
        <Text style={styles.buttonText}>Tomar foto</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          selectImage();
        }}
      >
        <Text style={styles.buttonText}>Seleccionar imagen de galeria</Text>
      </TouchableOpacity>
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 300,
            height: 200,
            alignSelf: "center",
            marginBottom: 15,
          }}
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
