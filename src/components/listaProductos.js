import {
  StyleSheet,
  FlatList,
  DrawerLayoutAndroid,
  TextInput,
  View,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Drawer from "./drawer";
import Header from "./header";
import axios from "axios";
import Item from "./listaItem";
import { storage } from "../../config";
import { deleteObject, ref } from "firebase/storage";

const ListaProductos = ({ setScreen, uid, logout }) => {
  const [productos, setProductos] = useState([]);
  const drawerRef = useRef(null); //Usado para abrir y cerrar el Drawer
  const [searchTerm, setSearchTerm] = useState(""); //usado para filtrar objetos
  const [estaEditando, setEstaEditando] = useState(false); //Usado para editar o no lista de productos

  useEffect(() => {
    getProductos();
  }, []);

  const getProductos = async () => {
    try {
      const response = await axios.get(
        "http://52.20.145.207:3000/api/products"
      );
      setProductos(response.data);
      //console.log(productos);
    } catch (error) {
      console.error(error);
    }
  };

  //abrir drawer
  const openDrawer = () => {
    drawerRef.current?.openDrawer();
  };
  //cerrar drawer
  const closeDrawer = () => {
    drawerRef.current.closeDrawer();
  };

  //modo edición para eliminar productos
  const onEditar = () => {
    setEstaEditando(true);
    closeDrawer();
  };
  const offEditar = () => {
    setEstaEditando(false);
    closeDrawer();
  };

  //datos filtrados con barra de búsqueda
  const filteredData = productos.filter((item) =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //eliminar producto de la lista
  const onEliminar = async (id, imagenId) => {
    const imagePath = `imagenes/${imagenId}.jpg`;
    const storageRef = ref(storage, imagePath);

    try {
      //Eliminar imagen de Firebase Storage
      await deleteObject(storageRef)
        .then(() => {
          console.log("Imagen eliminada exitosamente!");
        })
        .catch((error) => {
          console.log("Error al eliminar la imagen:", error);
        });
      //Eliminar producto usando API
      await axios
        .delete(`http://52.20.145.207:3000/api/product/${id}`)
        .then(() => {
          console.log("Producto eliminado correctamente!");
        })
        .catch((error) => {
          console.log("Error al eliminar el producto! " + error.message);
        });

      //Actualizar lista de productos
      getProductos();
    } catch (error) {
      console.log(error);
      console.log("No se puedo eliminar el producto!");
    }
  };

  return (
    <DrawerLayoutAndroid //componente Drawer nativo de android para cerrar sesion, etc.
      ref={drawerRef}
      drawerWidth={200}
      drawerPosition="left"
      renderNavigationView={() => (
        <Drawer
          estaEditando={estaEditando}
          onEditar={onEditar}
          offEditar={offEditar}
          logout={logout}
        />
      )}
    >
      <View style={styles.container}>
        <Header
          title={"Productos Registrados"}
          onOpenDrawer={openDrawer}
          setScreen={setScreen}
        />
        <TextInput //Barra de búsqueda
          style={styles.searchInput}
          placeholder="Buscar..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <FlatList //Se usa FlatList para renderizar la lista de los objetos y mejorar el rendimiento
          data={filteredData}
          renderItem={(
            { item } //renderizar componente Item con array de datos
          ) => (
            <Item
              nombre={item.nombre}
              imagenUrl={item.imagenUrl}
              imagenId={item.imagenId}
              precio={item.precio}
              cantidad={item.cantidad}
              barCode={item.barCode}
              id={item.id}
              estaEditando={estaEditando}
              onEliminar={onEliminar}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </DrawerLayoutAndroid>
  );
};

export default ListaProductos;

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
});
