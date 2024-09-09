import { useState } from "react";
import { Modal, Pressable, Text, View, Alert } from "react-native";
import { StyleSheet } from "react-native";

export default function AddProduct() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text>Add Product</Text>
      </Pressable>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}></Modal>
    </View>
  );
}
