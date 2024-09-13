import AddProductModal from "@/components/AddProductModal";
import { Stack, Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useState } from "react";

export default function RootLayout() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Stack
        screenOptions={{
          headerRight: () => (
            <View style={styles.rightHeaderContainer}>
              {/* Add Product button */}
              <Pressable
                onPress={() => setModalVisible(true)}
                style={styles.pressable}>
                <Text>Add Product</Text>
              </Pressable>

              {/* Checkout button */}
              {/* <Link href="/cart" asChild>
                <Pressable style={styles.pressable}>
                  <Text>Checkout</Text>
                </Pressable>
              </Link> */}
            </View>
          ),
        }}
      />
      {/* AddProductModal component (control its visibility) */}
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
