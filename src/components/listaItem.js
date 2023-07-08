import { View, StyleSheet, Image, Text } from "react-native";
import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";

const Item = ({
  nombre,
  imagenUrl,
  precio,
  cantidad,
  barCode,
  id,
  estaEditando,
  imagenId,
  onEliminar,
}) => (
  <View style={styles.itemContainer}>
    {estaEditando ? ( //dependiendo del modo edición se muestra botón de eliminar producto o no
      <SimpleLineIcons
        name="minus"
        size={25}
        color="red"
        style={{ alignSelf: "center", marginRight: 15 }}
        onLongPress={() => {
          onEliminar(id, imagenId);
        }}
      />
    ) : (
      <></>
    )}
    <Image style={styles.image} source={{ uri: imagenUrl }} />
    <View>
      <Text style={styles.text}>Nombre: {nombre}</Text>
      <Text style={styles.text}>Precio: {precio}</Text>
      <Text style={styles.text}>Cantidad: {cantidad}</Text>
      <Text style={styles.text}>Barcode: {barCode}</Text>
    </View>
  </View>
);

export default Item;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  text: {
    fontSize: 20,
    marginLeft: 15,
  },
  itemContainer: {
    margin: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
