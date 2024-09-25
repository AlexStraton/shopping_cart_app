import AddProductModal from "@/components/AddProductModal";
import { Stack } from "expo-router";
import { Pressable, Text, View, SafeAreaView, StatusBar, Platform } from "react-native";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { ScreenProvider } from "@/components/context/Screen";
import NavButtons from "@/components/NavButtons";
import { Colors } from "@/constants/Colors";

export default function RootLayout() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScreenProvider>
      <Stack
        screenOptions={{
          header: () => <CustomHeader onAddPress={() => setModalVisible(true)} />,
        }}
      />

      <AddProductModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </ScreenProvider>
  );
}

function CustomHeader({ onAddPress }) {
  return (
    <SafeAreaView style={styles.safeAreaHeaderContainer}>
      <Text style={styles.headerTitle}>Shopping Cart</Text>
      <View style={styles.rightHeaderContainer}>
        <Pressable onPress={onAddPress} style={styles.pressable}>
          <Text style={styles.pressableText}>Add Product</Text>
        </Pressable>
        <NavButtons />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaHeaderContainer: {
    backgroundColor: Colors.primary,
    alignItems: "center",  
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0   
  },
  headerTitle: {
    color: "#00008b",
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 10, 
  },
  rightHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 10, 
  },
  pressable: {
    marginHorizontal: 10,
    paddingBottom: 15,
    marginRight: 30,
  },
  pressableText: {
    fontWeight: "bold",
    fontSize: 14,
  }
});
