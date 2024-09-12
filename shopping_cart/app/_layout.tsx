import AddProductModal from "@/components/AddProductModal";
import { Stack, Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function RootLayout() {
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();

  return (
    // <Stack>
    // {/* <Pressable onPress={() => setModalVisible(true)}>
    //   <Text>Add Product</Text>
    // </Pressable> */}
    <>
      <Stack />
      <AddProductModal />
    </>
    // {/* <Stack.Screen
    //   name='index'
    //   options={{
    //     headerRight: () => (
    //       <View style={styles.rightHeaderContrainer}>
    //         <View style={styles.pressable}></View>

    //         <Link href='/cart' asChild>
    //           <Pressable style={styles.pressable}>
    //             <Text>Checkout</Text>
    //           </Pressable>
    //         </Link>
    //       </View>
    //     ),
    //   }}
    // />
    // <Stack.Screen name='cart' /> */}
    // </Stack>
  );
}

const styles = StyleSheet.create({
  rightHeaderContrainer: {
    flexDirection: "row",
    margin: "auto",
  },
  pressable: {
    margin: 65,
  },
});
