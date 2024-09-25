import { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image, FlatList, Alert } from "react-native";
import { getAllProducts } from "./api";
import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { postProductToCart, getAllProductsInCart } from "./api";
import { User } from "./context/User";

export function ProductCards() {
  const [products, setProducts] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);

  const context = useContext(User);

  if (!context) {
    throw new Error("User context must be used within a User Provider");
  }

  const { user } = context;

  interface Products {
    product_id: number;
    product_name: string;
    price: number;
    product_image_url: string;
    description: string;
  }

  useEffect(() => {
    async function prepareProducts() {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    }
    prepareProducts();
  }, []);

  useEffect(() => {
    async function prepareProductsInCart() {
      const userId = user.user_id;
      const allProductsInCart = await getAllProductsInCart(userId);
      setProductsInCart(allProductsInCart);
    }
    prepareProductsInCart();
  }, [productsInCart]);

  async function handleProductPress(product_id: Products["product_id"]) {
    const user_id = user.user_id;
    try {
      postProductToCart(user_id, product_id, 1);
      Alert.alert("Added to cart", "Item Added!", [
        {
          text: "Ok",
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Error adding to cart", "Please try again", [
        {
          text: "Ok",
        },
      ]);
    }
  }

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }: { item: Products }) => {
          return (
            <View style={styles.cardContainer}>
              <Image
                key={item.product_id}
                style={styles.image}
                source={{ uri: item.product_image_url }}
              />
              <View style={styles.productTextContainer}>
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{item.product_name}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
                <View style={styles.priceContainer}>
                  <MaterialCommunityIcons
                    name='cart-outline'
                    size={29}
                    color={"green"}
                    onPress={() => handleProductPress(item.product_id)}
                  />

                  <Text style={styles.price}>
                    £{(item.price / 100).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.product_id.toString()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.primary,
    margin: 12,
    borderRadius: 8,
    flexDirection: "row",
    borderColor: "#36454F",
    borderWidth: 1,
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
    height: "100%",
    borderRadius: 8, 
  },
  productName: {
    fontWeight: "bold",
    fontFamily: "sans-serif",
    fontSize: 24,
    textTransform: "uppercase",
    color: "#00008b",
  },
  description: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: "sans-serif",
  },
  price: {
    padding: 10,
    textAlign: "right",
    fontSize: 18,
    fontWeight: "bold",
    color: "#b22222",
  },

  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 45,
    marginLeft: 18,
  },
});
