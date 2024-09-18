import AddProductModal from "@/components/AddProductModal";
import { Stack, Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useState } from "react";
import Index from ".";

export default function RootLayout() {
  const [modalVisible, setModalVisible] = useState(false);
  const [screen, setScreen] = useState("ProductCards");

  function handleScreenChange() {
    setScreen("Cart");
  }
  return (
    <>
      <Stack
        screenOptions={{
          headerRight: () => (
            <View style={styles.rightHeaderContainer}>
              <Pressable
                onPress={() => setModalVisible(true)}
                style={styles.pressable}>
                <Text>Add Product</Text>
              </Pressable>
              {screen === "ProductCards" ? (
                <Pressable
                  onPress={handleScreenChange}
                  style={styles.pressable}>
                  <Text>Checkout</Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={handleScreenChange}
                  style={styles.pressable}>
                  <Text>Home</Text>
                </Pressable>
              )}
            </View>
          ),
        }}
      />

      <AddProductModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  rightHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 20,
  },
  pressable: {
    marginHorizontal: 10,
  },
});
