// AddSectionModal.tsx
import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { SectionProps } from "./Section";
import { validationSchema } from "@/helper/schemas";

interface AddSectionModalProps {
  visible: boolean;
  loading: boolean;
  onClose: () => void;
  onAddSection: (
    values: SectionProps,
    actions: { resetForm: () => void }
  ) => void;
  pickImages: (
    setFieldValue: (field: string, value: any) => void,
    currentImages: string[]
  ) => Promise<void>;
}

const AddSectionModal: React.FC<AddSectionModalProps> = ({
  visible,
  loading,
  onClose,
  onAddSection,
  pickImages,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Formik
            initialValues={{ title: "", images: [] }}
            validationSchema={validationSchema}
            onSubmit={onAddSection}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
              isValid,
              resetForm,
            }) => (
              <View style={styles.form}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    onClose();
                    resetForm();
                  }}
                >
                  <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  value={values.title}
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  placeholder="Enter title"
                  placeholderTextColor="#999"
                />
                {touched.title && errors.title && (
                  <Text style={styles.errorText}>{errors.title}</Text>
                )}
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item}
                  data={values.images}
                  renderItem={({ item, index }) => (
                    <Image
                      key={index}
                      source={{ uri: item }}
                      style={styles.previewImage}
                    />
                  )}
                  style={styles.imagePreview}
                />
                {values.images.length < 1 && (
                  <TouchableOpacity
                    disabled={loading}
                    style={styles.imagePickerButton}
                    onPress={() => pickImages(setFieldValue, values.images)}
                  >
                    {loading ? (
                      <ActivityIndicator size={"small"} color={"gray"} />
                    ) : (
                      <EvilIcons name="image" size={50} color="gray" />
                    )}
                  </TouchableOpacity>
                )}
                {touched.images && errors.images && (
                  <Text style={styles.errorText}>{errors.images}</Text>
                )}
                <TouchableOpacity
                  disabled={!isValid}
                  style={[
                    styles.button,
                    styles.addSectionButton,
                    { opacity: !isValid ? 0.6 : 1 },
                  ]}
                  onPress={() => handleSubmit()}
                >
                  <AntDesign name="save" size={24} color="#fff" />
                  <Text style={styles.buttonText}>Add Section</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontWeight: "600",
  },
  imagePreview: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  previewImage: {
    width: 80,
    height: 80,
    margin: 5,
  },
  button: {
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  addSectionButton: {
    backgroundColor: "#4CAF50",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  imagePickerButton: {
    borderWidth: 1,
    marginBottom: 10,
    alignItems: "center",
    borderColor: "gray",
    padding: 20,
    borderStyle: "dotted",
  },
});

export default AddSectionModal;
