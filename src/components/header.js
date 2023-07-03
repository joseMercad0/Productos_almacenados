import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";

const Header = ({ title, onOpenDrawer, setScreen }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftButton}>
        <SimpleLineIcons
          name="menu"
          size={24}
          color={"black"}
          onPress={onOpenDrawer}
          style={styles.leftButton}
        />
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightButton}>
        <SimpleLineIcons
          name="plus"
          size={24}
          color="black"
          onPress={() => {
            setScreen("scanner");
          }}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 60,
    backgroundColor: "#f1f1f1",
  },
  leftButton: {
    marginRight: 10,
  },
  rightButton: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
