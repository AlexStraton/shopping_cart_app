import { ProductCards } from "@/components/ProductCards";
import { Text, View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { UserProvider } from "@/components/context/User";

export default function Products() {

  return (
    <UserProvider>
    <View style={styles.inputContainer}>
      <ProductCards />
    </View>
    </UserProvider>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background
  },
});
