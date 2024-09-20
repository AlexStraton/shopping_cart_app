import AddProductModal from "@/components/AddProductModal";
import { Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { ScreenProvider } from "@/components/context/Screen";
import NavButtons from "@/components/NavButtons";

export default function RootLayout() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScreenProvider>
      <Stack
        screenOptions={{
          headerRight: () => (
            <View style={styles.rightHeaderContainer}>
              <Pressable
                onPress={() => setModalVisible(true)}
                style={styles.pressable}>
                <Text>Add Product</Text>
              </Pressable>
              <NavButtons />
            </View>
          ),
          headerTitle: "Shopping Cart",
        }}
      />

      <AddProductModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </ScreenProvider>
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
