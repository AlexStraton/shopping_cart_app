import { Modal, Pressable, Text, View, TextInput, Alert } from "react-native";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { postProduct } from "./api";

export default function AddProduct({ visible, onClose }) {
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    price: "",
    product_image_url: "",
  });

  function handleChange(value: string, fieldName: string) {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  }

  async function handleSubmit() {
    try {
      const response = await postProduct(formData);
  
      if (response && response.status === 201) {
        Alert.alert("Successfully Added", "Your product has been added", [
          {
            text: "Confirm",
            onPress: () => onClose(),
            style: "cancel",
          },
        ]);
      } else {

        Alert.alert(
          "Not Added",
          "Your product could not be added, please try again",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "An unexpected error occurred. Please try again.",
        [
          {
            text: "OK",
            style: "cancel",
          },
        ]
      );
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Modal overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          {/* This prevents clicks inside the modal from closing it */}
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modal}>
              {/* Modal Content */}
              <Pressable onPress={onClose} style={styles.closeButton}>
                <MaterialCommunityIcons name="close-circle-outline" size={24} />
              </Pressable>
              <View style={styles.inputField}>
                <Text>Product Name: </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Name..."
                  value={formData.product_name}
                  onChangeText={(value) => handleChange(value, "product_name")}
                />
              </View>
              <View style={styles.inputField}>
                <Text>Description: </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Description..."
                  value={formData.description}
                  onChangeText={(value) => handleChange(value, "description")}
                />
              </View>
              <View style={styles.inputField}>
                <Text>Price: </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Price..."
                  keyboardType="number-pad"
                  value={formData.price}
                  onChangeText={(value) => handleChange(value, "price")}
                />
              </View>
              <View style={styles.inputField}>
                <Text>Image URL: </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Image URL..."
                  value={formData.product_image_url}
                  onChangeText={(value) =>
                    handleChange(value, "product_image_url")
                  }
                />
              </View>
              <Pressable
                style={styles.addButton}
                onPress={() => handleSubmit()}
              >
                <Text>Add Product</Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    backgroundColor: "white",
    height: 350,
    width: 400,
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    marginLeft: 8,
  },
  inputField: {
    flexDirection: "row",
    marginVertical: 8,
  },
  closeButton: {
    flexDirection: "row-reverse",
    marginBottom: 20,
  },
  addButton: {
    borderColor: "black",
    borderWidth: 2,
    width: 100,
    padding: 8,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
  },
});
