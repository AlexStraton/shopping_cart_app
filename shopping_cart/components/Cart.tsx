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
                    size={16}
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
                    size={16}
                  />
                  <MaterialCommunityIcons
                    name='cart-remove'
                    size={16}
                    onPress={() => {
                      handleRemoveItem(item.cart_line_id);
                    }}
                  />
                  <Text style={styles.price}>
                    Total: £{((item.price * item.quantity) / 100).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.cart_line_id.toString()}
      />
      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={handleDeleteBasket}>
          <Text>Discard Basket</Text>
        </Pressable>
        <Pressable onPress={() => setVisible(true)} style={styles.button}>
          <Text>Checkout</Text>
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
    padding: 12,
    margin: 12,
    borderRadius: 8,
    flexDirection: "row",
  },
  productTextContainer: {
    width: "60%",
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
    fontSize: 24,
    textTransform: "capitalize",
  },
  description: {
    marginTop: 16,
    fontSize: 12,
  },
  price: {
    padding: 10,
    textAlign: "right",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 18,
  },
  buttonView: {
    flexDirection: "row",
    margin: 12,
  },
  button: {
    borderColor: "black",
    borderWidth: 2,
    width: 100,
    padding: 8,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
    marginLeft: 24,
  },
  noProducts: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
