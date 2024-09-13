import { ProductCards } from "@/components/ProductCards";
import { Text, View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { UserProvider } from "@/components/context/User";
import { Cart } from "@/components/Cart";

export default function Products() {
  // NEED TO SET UP SO PRODUCTCARDS RENDERS INITIALLY AS SCREEN, CART RENDERS WHEN BUTTON PRESSED//
  let screen = <Cart />;

  return (
    <UserProvider>
      <View style={styles.inputContainer}></View>
      {screen}
    </UserProvider>
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
