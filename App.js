import { StyleSheet } from "react-native";
import Login from "./src/components/login";
//import { auth } from "./config";
import { useEffect, useState } from "react";
//import { onAuthStateChanged } from "firebase/auth";
import Signup from "./src/components/signup";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import IndexScreen from "./src";
import AsyncStorage from "@react-native-async-storage/async-storage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState(null);
  const [uid, setUid] = useState("");

  //Revisar si hay token almacenado
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const uid = await AsyncStorage.getItem("uid");
          setUid(uid);
          setLoggedIn(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkLoggedIn();
  }, []);

  // //función que observa si hay usuario logeado FirebaseAuth
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     setUid(user.uid);
  //     setLoggedIn(true);
  //   } else {
  //     setLoggedIn(false);
  //   }
  // });

  //cambio de pantalla dependiendo de si hay usuario logeado
  const getScreen = () => {
    if (loggedIn) return <IndexScreen uid={uid} logout={logout} />;
    if (screen === "signup") return <Signup setScreen={setScreen} />;
    return <Login setScreen={setScreen} onLogin={onLogin} />;
  };

  //almacenar el token usando AsyncStorage
  const onLogin = async (token, uid) => {
    try {
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("uid", uid);
      setUid(uid);
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  //cierra sesión - eliminar el token y uid del almacenamiento
  const logout = async () => {
    try {
      console.log("Cerrando sesion...");
      await AsyncStorage.multiRemove(["token", "uid"]);
      setUid("");
      setLoggedIn(false);
      setScreen(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>{getScreen()}</SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
