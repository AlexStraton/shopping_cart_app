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
      console.log(user);
      if (user) {
        const userId = user;
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
      <Text>Hellooo</Text>
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
                  <Text style={styles.description}>
                    {itemData.item.description}
                  </Text>
                </View>
                <View style={styles.priceContainer}>
                  <MaterialCommunityIcons.Button
                    name='cart-outline'
                    size={18}
                    backgroundColor={null}
                    color={"black"}
                    onPress={() => handleProductPress(itemData.item.product_id)}
                  />
                  <Text style={styles.price}>
                    £{(itemData.item.price / 100).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.product_id}
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
    width: 150,
    height: 150,
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
    marginTop: 45,
    marginLeft: 18,
  },
});
