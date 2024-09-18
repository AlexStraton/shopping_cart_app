import { useContext } from "react";
import { Screen } from "./context/Screen";
import { Pressable, StyleSheet, Text } from "react-native";

export default function NavButtons() {
  const { screen, setScreen } = useContext(Screen);

  function handleScreenChange(newScreen: string) {
    return () => setScreen(newScreen);
  }

  return (
    <>
      {screen === "ProductCards" ? (
        <Pressable
          onPress={handleScreenChange("Cart")} 
          style={styles.pressable}
        >
          <Text>Checkout</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={handleScreenChange("ProductCards")} 
          style={styles.pressable}
        >
          <Text>Home</Text>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  pressable: {
    marginHorizontal: 10,
  },
});
