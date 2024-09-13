import { Text, View, Image, FlatList, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from "react";
import { getAllProductsInCart } from "./api";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { User } from "./context/User";

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
                  <MaterialCommunityIcons name="minus-circle-outline" size={16}/>
                  <Text>{itemData.item.quantity}</Text>
                  <MaterialCommunityIcons name="plus-circle-outline" size={16}/>
                  <MaterialCommunityIcons name="cart-remove" size={16} />
                  <Text style={styles.price}>
                    Total: £{((itemData.item.price * itemData.item.quantity) / 100).toFixed(2)}
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
