import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { UserProvider } from "@/components/context/User";
import { ProductCards } from "@/components/ProductCards";
import { Cart } from "@/components/Cart";
import { ScreenProvider, Screen } from "@/components/context/Screen";
import { useContext } from "react";

export default function Index({}) {
  // NEED TO SET UP SO PRODUCTCARDS RENDERS INITIALLY AS SCREEN, CART RENDERS WHEN BUTTON PRESSED//
  const { Screen } = useContext(Screen);

  return (
    <ScreenProvider>
      <UserProvider>
        <View style={styles.inputContainer}>{screen}</View>
      </UserProvider>
    </ScreenProvider>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
});
