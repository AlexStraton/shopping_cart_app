import { useState } from "react";
import { Modal, Pressable, Text, View, Alert, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function AddProduct() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableWithoutFeedback>
      <View>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <Modal
              style={styles.modal}
              animationType='slide'
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.modalOverlay}>
                <View style={styles.modal}>
                  <Text>Name of Product</Text>
                  <Pressable onPress={() => setModalVisible(true)}>
                    <Text>Add Product</Text>
                  </Pressable>
                  <TextInput />
                </View>
              </View>
            </Modal>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    backgroundColor: "white",
    height: 500,
    width: 500,
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
});
