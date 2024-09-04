import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getAllProducts } from "./api";
import { Colors } from "@/constants/Colors";

export function ProductCards() {
  const [products, setProducts] = useState([]);

  interface Products {
    product_id: number;
    product_name: string;
    price: number;
    product_image_url: string;
    description: string;
  }
  //replace with API
  useEffect(() => {
    async function prepare() {
      const allProducts = await getAllProducts();
      console.log(allProducts, "<-- product cards");
      setProducts(allProducts);
    }
    prepare();
  }, []);

  return (
    <View>
      {products.map((product) => {
        return (
          <View key={product.product_id} style={styles.cardContainer}>
            <Image
              style={styles.image}
              source={{ uri: product.product_image_url }}
            />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{product.product_name}</Text>
              <Text style={styles.description}>{product.description}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{product.price}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.primary500,
    padding: 12,
    margin: 12,
    borderRadius: 8,
    flexDirection: "row",
  },
  productDetails: {
    margin: 12,
    padding: 10,
    backgroundColor: "white",
  },
  image: {
    width: 150,
    height: 150,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 24,
  },
  description: {
    marginTop: 8,
    fontSize: 12,
  },
  price: {
    padding: 10,
    textAlign: "right",
  },
  priceContainer: {
    alignItems: "flex-start",
  },
});
