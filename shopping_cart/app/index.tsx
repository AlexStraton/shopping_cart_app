import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { UserProvider } from "@/components/context/User";
import { Screen } from "@/components/context/Screen";
import { useContext } from "react";
import { ProductCards } from "@/components/ProductCards";
import { Cart } from "@/components/Cart";

export default function Index({}) {
  
  const {screen} = useContext(Screen)

  let screenPage = screen === "Cart" ? <Cart /> : <ProductCards />;

  return (
      <UserProvider>
        <View style={styles.inputContainer}>{screenPage}</View>
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
