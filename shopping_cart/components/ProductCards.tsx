import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getAllProducts } from "./api";

export function ProductCards() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async () => {
      const response: string[] = await getAllProducts();
      setProducts(response.data.products);
    };
  }, []);

  return (
    <View>
      {products.map((product) => {
        return (
          <View>
            <Text>product.product_name</Text>
            <Text>product.description</Text>
            <Text>product.price</Text>
          </View>
        );
      })}
    </View>
  );
}
