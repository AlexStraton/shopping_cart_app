import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { getAllProductsInCart } from "./api";

import { Colors } from "@/constants/Colors";
import { User } from "./context/User";
import {
  patchProductInCart,
  deleteProductInCart,
  deleteAllProductsInCart,
} from "./api";
import CheckoutModal from "./CheckoutModal";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function Cart() {
  const [productsInCart, setProductsInCart] = useState<ProductsInCart[]>([]);
  const context = useContext(User);
  const [visible, setVisible] = useState(false);

  if (!context) {
    throw new Error("User context must be used within a User Provider");
  }

  const { user } = context;

  interface ProductsInCart {
    product_id: number;
    product_name: string;
    price: number;
    product_image_url: string;
    description: string;
    cart_line_id: number;
    quantity: number;
  }

  useEffect(() => {
    async function prepare() {
      if (user) {
        const userId = user.user_id;
        const allProductsInCart = await getAllProductsInCart(userId);
        setProductsInCart(allProductsInCart);
      } else {
        console.log("no user found");
      }
    }
    prepare();
  }, [user]);

  async function handleQuantityChange(
    direction: string,
    quantity: number,
    cartLineId: number
  ) {
    let adjustedQuantity = quantity + 1;
    if (direction === "minus" && quantity > 0) {
      adjustedQuantity = quantity - 1;
    }
    if (direction === "minus" && quantity === 0) {
      return;
    }

    const body = { quantity: adjustedQuantity };
    const previousCart = [...productsInCart];

    setProductsInCart((prevItems) => {
      return prevItems.map((item: ProductsInCart) =>
        item.cart_line_id === cartLineId
          ? { ...item, quantity: adjustedQuantity }
          : item
      );
    });
    try {
      await patchProductInCart(cartLineId, body);
    } catch (error) {
      console.log(error);
      Alert.alert("Error updating cart", "Please try again", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]);
      setProductsInCart(previousCart);
    }
  }

  async function handleRemoveItem(cart_line_id: number) {
    Alert.alert("Remove Item?", "Are you sure you want to remove this?", [
      {
        text: "Yes",
        onPress: () => {
          removeItem(cart_line_id);
        },
      },
      {
        text: "No",
        onPress: () => {
          return;
        },
        style: "cancel",
      },
    ]);

    async function removeItem(cart_line_id: number) {
      const previousCart = [...productsInCart];

      setProductsInCart((prevItems) => {
        return prevItems.filter(
          (item: ProductsInCart) => item.cart_line_id !== cart_line_id
        );
      });

      try {
        deleteProductInCart(cart_line_id);
      } catch (error) {
        console.log(error);
        setProductsInCart(previousCart);
        Alert.alert(
          "Error removing item",
          "Your item has not been removed, try again",
          [
            {
              text: "Ok",
              style: "cancel",
            },
          ]
        );
      }
    }
  }

  async function handleDeleteBasket() {
    Alert.alert("Delete Cart", "Are you sure you want to remove all items?", [
      {
        text: "Yes",
        onPress: () => {
          deleteBasket();
        },
      },
      {
        text: "No",
        onPress: () => {
          return;
        },
        style: "cancel",
      },
    ]);

    async function deleteBasket() {
      const previousCart = [...productsInCart];
      setProductsInCart([]);
      try {
        await deleteAllProductsInCart(user.user_id);
      } catch (error) {
        console.log(error);
        setProductsInCart(previousCart);
        Alert.alert(
          "Error removing items",
          "Your items have not been removed, try again",
          [
            {
              text: "Ok",
              style: "cancel",
            },
          ]
        );
      }
    }
  }

  return (
    <View style={styles.screen}>
      {productsInCart.length === 0 && (
        <View style={styles.noProducts}>
          <Text>You have no products in your cart</Text>
        </View>
      )}
      <FlatList
        data={productsInCart}
        renderItem={({ item }: { item: ProductsInCart }) => {
          return (
            <View style={styles.cardContainer}>
              <Image
                key={item.cart_line_id}
                style={styles.image}
                source={{ uri: item.product_image_url }}
              />
              <View style={styles.productTextContainer}>
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{item.product_name}</Text>
                </View>
                <View style={styles.priceContainer}>
                  <MaterialCommunityIcons
                    onPress={() => {
                      handleQuantityChange(
                        "minus",
                        item.quantity,
                        item.cart_line_id
                      );
                    }}
                    name='minus-circle-outline'
                    size={20}
                  />
                  <Text>{item.quantity}</Text>
                  <MaterialCommunityIcons
                    onPress={() => {
                      handleQuantityChange(
                        "plus",
                        item.quantity,
                        item.cart_line_id
                      );
                    }}
                    name='plus-circle-outline'
                    size={20}
                  />
                  <View>
                  <MaterialCommunityIcons
                    name='cart-remove'
                    size={20}
                    onPress={() => {
                      handleRemoveItem(item.cart_line_id);
                    }}
                    style={styles.cartButton}
                  />
                  </View>
                  <View style={styles.priceView}>
                  <Text style={styles.price}>
                    Total: £{((item.price * item.quantity) / 100).toFixed(2)}
                  </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.cart_line_id.toString()}
      />
      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={handleDeleteBasket}>
          <Text style={styles.buttonText}>Discard Basket</Text>
        </Pressable>
        <Pressable onPress={() => setVisible(true)} style={styles.button}>
          <Text style={styles.buttonText}>Checkout</Text>
        </Pressable>
      </View>
      <CheckoutModal
        visible={visible}
        onClose={() => setVisible(false)}
        productsInCart={productsInCart}
        setProductsInCart={setProductsInCart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: Colors.primary,
    margin: 8,
    borderRadius: 8,
    borderColor: "#36454F",
    borderWidth: 1,
    flexDirection: "row",
    shadowColor: "black",
  },
  productTextContainer: {
    width: "75%",
  },
  productDetails: {
    marginHorizontal: 16,
    marginTop: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 20,
    fontFamily:"sans-serif",
    textTransform: "uppercase",
    color: "#00008b",
  },
  price: {
    padding: 10,
    textAlign: "right",
    fontSize: 14,
    fontWeight: "bold",
    color: "#b22222",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 18,
    marginTop: 10,
  },
  buttonView: {
    flexDirection: "row",
    margin: 12,
  },
  button: {
    borderColor: "black",
    borderWidth: 2,
    width: 150,
    padding: 12,
    borderRadius: 10,
    alignSelf: "center",
    margin: 20,
    backgroundColor: "#1F5673",
  },
  noProducts: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  priceView: {
    marginLeft: 10,
  },
  cartButton: {
    marginLeft: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  }
});
