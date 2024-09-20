import { Modal, Pressable, Text, View, TextInput, Alert } from "react-native";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";

import { postProduct } from "./api";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CheckoutModal({ visible, onClose, productsInCart }) {
  async function handleSubmit(values: any, resetForm: any) {
    try {
      const response = await postProduct(values);

      if (response && response.status === 201) {
        Alert.alert("Successfully Added", "Your product has been added", [
          {
            text: "Confirm",
            onPress: () => {
              resetForm();
              onClose();
            },
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
      Alert.alert("Error", "An unexpected error occurred. Please try again.", [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
    }
  }

  const total = productsInCart.reduce(
    (acc: number, product: {}) => product.quantity * product.price + acc,
    0
  );

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modal}>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <MaterialCommunityIcons name='close-circle-outline' size={24} />
              </Pressable>
              <View>
                <Text>Total: £{(total / 100).toFixed(2)}</Text>
              </View>
              <Pressable onPress={handleSubmit} style={styles.checkoutButton}>
                <Text>Confirm Purchase</Text>
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
    height: 400,
    width: 400,
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  closeButton: {
    flexDirection: "row-reverse",
    marginBottom: 20,
  },
  checkoutButton: {
    borderColor: "black",
    borderWidth: 2,
    width: 100,
    padding: 8,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
  },
});
