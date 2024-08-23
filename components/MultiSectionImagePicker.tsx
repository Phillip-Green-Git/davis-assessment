import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Section, { SectionProps } from "./Section";
import AddSectionModal from "./AddSectionModal";

const MultiSectionImagePicker: React.FC = () => {
  const [sections, setSections] = useState<SectionProps[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const pickImages = async (
    setFieldValue: (field: string, value: any) => void,
    currentImages: string[]
  ) => {
    setLoading(true);
    try {
      let result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        const newImages = [
          ...currentImages,
          ...result?.assets.map((asset) => asset.uri),
        ];
        setFieldValue("images", newImages);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addSection = (
    values: SectionProps,
    { resetForm }: { resetForm: () => void }
  ) => {
    setSections([...sections, { title: values.title, images: values.images }]);
    resetForm();
    setModalVisible(false);
  };

  const requestPermission = async () => {
    const { status } = await requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={sections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Section title={item.title} images={item.images} />
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add-circle-sharp" size={60} color="#000" />
      </TouchableOpacity>

      <AddSectionModal
        loading={loading}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddSection={addSection}
        pickImages={pickImages}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#f0f0f0",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
});

export default MultiSectionImagePicker;
