import { Stack, Link } from "expo-router";
import { Pressable, Text } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerRight: () => (
            <Link href="/cart" asChild>
            <Pressable>
              <Text>Checkout</Text>
            </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="cart"
      />
    </Stack>
  );
}
