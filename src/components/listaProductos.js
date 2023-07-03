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
import { db } from "../../config";
import { ref, onValue } from "firebase/database";
import Item from "./listaItem";

const ListaProductos = ({ setScreen, uid }) => {
  const [todoData, setTodoData] = useState([]);
  const drawerRef = useRef(null); //Usado para abrir y cerrar el Drawer
  const [searchTerm, setSearchTerm] = useState(""); //usado para filtrar objetos
  const [estaEditando, setEstaEditando] = useState(false); //Usado para editar o no lista de productos

  useEffect(() => {
    const starCountRef = ref(db, `usuarios/${uid}/snaps`);
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
              descripcion={item.descripcion}
              imagenURL={item.imagenURL}
              precio={item.precio}
              cantidad={item.cantidad}
              barcode={item.barcode}
              id={item.id}
              estaEditando={estaEditando}
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
    marginTop: 50,
    fontWeight: "bold",
  },
});
