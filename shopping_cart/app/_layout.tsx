import AddProduct from "@/components/AddProduct";
import { Stack, Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerRight: () => (
            <View style={styles.rightHeaderContrainer}>
              <View style={styles.pressable}>
                <AddProduct />
              </View>

              <Link href='/cart' asChild>
                <Pressable style={styles.pressable}>
                  <Text>Checkout</Text>
                </Pressable>
              </Link>
            </View>
          ),
        }}
      />
      <Stack.Screen name='cart' />
    </Stack>
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
