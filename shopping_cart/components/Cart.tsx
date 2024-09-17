import { Text, View, Image, FlatList, StyleSheet, Alert } from "react-native";
import { useState, useEffect, useContext } from "react";
import { getAllProductsInCart } from "./api";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { User } from "./context/User";
import { patchProductInCart } from "./api";

export function Cart() {
  const [productsInCart, setProductsInCart] = useState([]);
  const { user } = useContext(User);

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

  async function handleQuantityChange(direction, quantity, cartLineId) {
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
      return prevItems.map((item) =>
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

  return (
    <View>
      <FlatList
        data={productsInCart}
        renderItem={(itemData) => {
          return (
            <View style={styles.cardContainer}>
              <Image
                key={itemData.index}
                style={styles.image}
                source={{ uri: itemData.item.product_image_url }}
              />
              <View style={styles.productTextContainer}>
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>
                    {itemData.item.product_name}
                  </Text>
                </View>
                <View style={styles.priceContainer}>
                  <MaterialCommunityIcons
                    onPress={() => {
                      handleQuantityChange(
                        "minus",
                        itemData.item.quantity,
                        itemData.item.cart_line_id
                      );
                    }}
                    name='minus-circle-outline'
                    size={16}
                  />
                  <Text>{itemData.item.quantity}</Text>
                  <MaterialCommunityIcons
                    onPress={() => {
                      handleQuantityChange(
                        "plus",
                        itemData.item.quantity,
                        itemData.item.cart_line_id
                      );
                    }}
                    name='plus-circle-outline'
                    size={16}
                  />
                  <MaterialCommunityIcons name='cart-remove' size={16} />
                  <Text style={styles.price}>
                    Total: £
                    {(
                      (itemData.item.price * itemData.item.quantity) /
                      100
                    ).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.cart_line_id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
