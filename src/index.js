import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  DrawerLayoutAndroid,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { db } from "../config";
import { ref, onValue } from "firebase/database";
import Drawer from "./components/drawer";
import Header from "./components/header";
import { SimpleLineIcons } from "@expo/vector-icons";

const FetchData = (props) => {
  const [todoData, setTodoData] = useState([]);
  const drawerRef = useRef(null); //Usado para abrir y cerrar el Drawer
  const [estaEditando, setEstaEditando] = useState(false); //Usado para editar o no lista de productos
  const [searchTerm, setSearchTerm] = useState(""); //filtrar objetos

  useEffect(() => {
    const starCountRef = ref(db, `usuarios/${props.uid}/snaps`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        //obtener ID del snapshot para luego implementar función eliminar
        const newUsuarios = [];
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key; //obtiene el ID
          const childData = childSnapshot.val();
          const usuario = {
            id: key,
            ...childData,
          };
          newUsuarios.push(usuario);
        });
        console.log(newUsuarios);
        setTodoData(newUsuarios);
      } else {
        setTodoData([]);
      }
    });
  }, []);
  //abrir drawer
  const openDrawer = () => {
    drawerRef.current?.openDrawer();
  };
  //cerrrar drawer
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

  //componente que se renderiza en el Flatlist
  const Item = ({ descripcion, imagenURL, precio, cantidad, barcode, id }) => (
    <View style={styles.itemContainer}>
      {estaEditando ? ( //dependiendo del modo edición se muestra botón de eliminar producto o no
        <SimpleLineIcons
          name="minus"
          size={25}
          color="red"
          style={{ alignSelf: "center", marginRight: 15 }}
          onPress={() => {
            console.log("eliminar " + id);
          }}
        />
      ) : (
        <></>
      )}
      <Image style={styles.image} source={{ uri: imagenURL }} />
      <View>
        <Text style={styles.text}>Descripcion: {descripcion}</Text>
        <Text style={styles.text}>Precio: {precio}</Text>
        <Text style={styles.text}>Cantidad: {cantidad}</Text>
        <Text style={styles.text}>Barcode: {barcode}</Text>
      </View>
    </View>
  );

  //datos filtrados con barra de búsqueda
  const filteredData = todoData.filter((item) =>
    item.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        />
      )}
    >
      <View style={styles.container}>
        <Header title={"Productos Registrados"} onOpenDrawer={openDrawer} />
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
              descripcion={item.descripcion}
              imagenURL={item.imagenURL}
              precio={item.precio}
              cantidad={item.cantidad}
              barcode={item.barcode}
              id={item.id}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </DrawerLayoutAndroid>
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
    margin: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  text: {
    fontSize: 20,
  },
  searchInput: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
