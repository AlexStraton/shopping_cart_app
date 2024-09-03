import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getAllProducts } from "./api";
import { blue } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

export function ProductCards() {
  const [products, setProducts] = useState([]);

  interface Products {
    product_id: number;
    product_name: string;
    price: number;
    product_image_url: string;
    description: string;
  }
  const allProducts: Products[] = [
    {
      product_id: 1,
      product_name: "soap",
      price: 99,
      product_image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS61eNgxUDg-3wgANvffiHQZHTVq3L1l80trQ&s",
      description: "Used to wash oneself",
    },
    {
      product_id: 2,
      product_name: "shampoo",
      price: 150,
      product_image_url:
        "https://m.media-amazon.com/images/I/515Xr78ub7L.__AC_SX300_SY300_QL70_ML2_.jpg",
      description: "Cleans and conditions hair",
    },
    {
      product_id: 3,
      product_name: "toothpaste",
      price: 85,
      product_image_url:
        "https://m.media-amazon.com/images/I/71U5HKeQ49L.__AC_SY300_SX300_QL70_ML2_.jpg",
      description: "Helps in cleaning teeth",
    },
  ];

  //replace with API
  useEffect(() => {
    setProducts(allProducts);
  }, []);

  return (
    <View>
      {products.map((product) => {
        return (
          <View key={product.product_id} style={styles.cardContainer}>
            <Text>{product.product_name}</Text>
            <Text>{product.description}</Text>
            <Text>{product.price}</Text>
            <Image
              style={styles.image}
              source={{ uri: product.product_image_url }}
            />
          </View>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "blue",
  },
  image: {
    width: 150,
    height: 150,
  },
});
