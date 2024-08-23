import { StyleSheet } from "react-native";
import MultiSectionImagePicker from "@/components/MultiSectionImagePicker";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <MultiSectionImagePicker />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
});
