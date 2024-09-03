import { ProductCards } from "@/components/ProductCards";
import { Text, View, StyleSheet } from "react-native";

export default function Products() {
  return (
    <View style={styles.inputContainer}>
      <ProductCards />
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
