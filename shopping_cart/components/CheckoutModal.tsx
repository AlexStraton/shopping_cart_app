import {
  Modal,
  Pressable,
  Text,
  View,
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { postProduct, deleteAllProductsInCart } from "./api";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { User } from "./context/User";
import { Screen } from "./context/Screen";

export default function CheckoutModal({
  visible,
  onClose,
  productsInCart,
  setProductsInCart,
}) {
  const userContext = useContext(User);

  if (!userContext) {
    throw new Error("User context must be used within a User Provider");
  }

  const { user } = userContext;

  const screenContext = useContext(Screen);

  if (!screenContext) {
    throw new Error("Screen context must be used within a Screen Provider");
  }

  const { setScreen } = screenContext;

  async function handleSubmit() {
    const currentProducts = [...productsInCart];
    try {
      await deleteAllProductsInCart(user.user_id);
      setProductsInCart([]);
      Alert.alert(
        "Checkout Successful",
        "Your have bought your products! (not really)",
        [
          {
            text: "Confirm",
            onPress: () => {
              onClose();
              setScreen("ProductCards");
            },
          },
        ]
      );
    } catch (error) {
      console.log(error);
      setProductsInCart(currentProducts);
      Alert.alert(
        "Error",
        "An unexpected error has occurred, please try again",
        [
          {
            text: "Ok",
            onPress: () => {
              onClose();
            },
          },
        ]
      );
    }
  }

  type Product = {
    quantity: number;
    price: number;
  };

  const total = productsInCart.reduce(
    (acc: number, product: Product) => product.quantity * product.price + acc,
    0
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modal}>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <MaterialCommunityIcons name="close-circle-outline" size={24} />
              </Pressable>
              {productsInCart.length > 0 ? (
                <>
                  <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total: £{(total / 100).toFixed(2)}</Text>
                  </View>
                  <Pressable
                    onPress={handleSubmit}
                    style={styles.checkoutButton}
                  >
                    <Text style={styles.buttonText}>Confirm Purchase</Text>
                  </Pressable>
                </>
              ) : (
                <View >
                  <Text >You have no products in cart</Text>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  modal: {
    backgroundColor: "#B7D9DD",
    height: "20%",
    width: "90%",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  closeButton: {
    flexDirection: "row-reverse",
  },
  checkoutButton: {
    borderColor: "black",
    borderWidth: 2,
    width: "50%",
    padding: 12,
    borderRadius: 10,
    alignSelf: "center",
    margin: 20,
    backgroundColor: "#1F5673",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  totalContainer: {
    height: 30,
    width: 120,
    alignSelf: "center",
  },
  totalText: {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    color: "#00008b",
  }
});
