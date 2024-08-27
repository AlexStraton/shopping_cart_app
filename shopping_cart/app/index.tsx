import { ProductCards } from "@/components/ProductCards";
import { Text, View, StyleSheet } from "react-native";

export default function Products() {
  return (
    <View style={styles.inputContainer}>
      <ProductCards />
      <Text>Edit app/index.tsx to edit this screen.</Text>
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
