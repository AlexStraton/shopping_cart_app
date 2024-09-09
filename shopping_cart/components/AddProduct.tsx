import { useState } from "react";
import { Modal, Pressable, Text, View, Alert, TextInput } from "react-native";
import { StyleSheet } from "react-native";

export default function AddProduct() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text>Add Product</Text>
      </Pressable>
      <View style={styles.centeredView}>
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View>
            <Text>Name of Product</Text>
            <TextInput />
          </View>
        </Modal>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
