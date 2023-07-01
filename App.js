import { View, StyleSheet } from "react-native";
import FetchData from "./src";
import Login from "./src/components/login";

import { auth } from "./config";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Signup from "./src/components/signup";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState(null);
  const [uid, setUid] = useState("");

  //función que observa si hay usuario logeado
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  //cambio de pantalla dependiendo de si hay usuario logeado
  const getScreen = () => {
    if (loggedIn) return <FetchData uid={uid} />;
    if (screen === "signup") return <Signup setScreen={setScreen} />;
    return <Login setScreen={setScreen} />;
  };

  return <View style={styles.container}>{getScreen()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
