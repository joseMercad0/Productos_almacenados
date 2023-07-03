import { StyleSheet } from "react-native";
import Login from "./src/components/login";
import { auth } from "./config";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Signup from "./src/components/signup";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import IndexScreen from "./src";

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
    if (loggedIn) return <IndexScreen uid={uid} />;
    if (screen === "signup") return <Signup setScreen={setScreen} />;
    return <Login setScreen={setScreen} />;
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
