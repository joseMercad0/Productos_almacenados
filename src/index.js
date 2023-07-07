import { StyleSheet } from "react-native";
import React, { useState } from "react";
import Scanner from "./components/scanner";
import ListaProductos from "./components/listaProductos";
import RegistrarProducto from "./components/registrarProducto";

const IndexScreen = ({ uid }) => {
  const [screen, setScreen] = useState(null);
  const [barcode, setBarcode] = useState(null);

  const handleBarcodeChange = (newBarcode) => {
    setBarcode(newBarcode);
  };

  const getScreen = () => {
    //cambio de pantalla
    if (screen === "scanner") {
      return <Scanner setScreen={setScreen} onChange={handleBarcodeChange} />;
    }
    if (screen === "nuevo")
      return (
        <RegistrarProducto setScreen={setScreen} barcode={barcode} uid={uid} />
      );
    else if (screen === null)
      return <ListaProductos setScreen={setScreen} uid={uid} />;
  };

  return getScreen();
};

export default IndexScreen;

const styles = StyleSheet.create({});
