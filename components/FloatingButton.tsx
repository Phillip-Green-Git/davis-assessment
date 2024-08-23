import { StyleSheet, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import Entypo from "@expo/vector-icons/Entypo";

interface FloatingButtonProps {
  onPress: () => void;
}
const FloatingButton = ({ onPress }: FloatingButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Entypo name="plus" size={30} color={"#fff"} />
    </TouchableOpacity>
  );
};

export default memo(FloatingButton);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    right: 15,
    backgroundColor: "#000000",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
