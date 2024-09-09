import { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { getAllProducts } from "./api";
import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { postProductToCart } from "./api";
import { User } from "./context/User";

export function ProductCards() {
  const [products, setProducts] = useState([]);
  const {user} = useContext(User)


  interface Products {
    product_id: number;
    product_name: string;
    price: number;
    product_image_url: string;
    description: string;
  }

  useEffect(() => {
    async function prepare() {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    }
    prepare();
  }, []);

  function handleProductPress (product_id) {
  const user_id = user.user_id
  postProductToCart(user_id, product_id, 1)
  }


  return (
    <View>
      <FlatList data={products} renderItem={
        (itemData) => {
          return (
          <View style={styles.cardContainer}>
            <Image
            key={itemData.index}
              style={styles.image}
              source={{ uri: itemData.item.product_image_url }}
            />
            <View style={styles.productTextContainer}>
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{itemData.item.product_name}</Text>
              <Text style={styles.description}>{itemData.item.description}</Text>
            </View>
            <View style={styles.priceContainer}>
              <MaterialCommunityIcons.Button name="cart-outline" size={18} backgroundColor={null} color={'black'} onPress={() => handleProductPress(itemData.item.product_id)}/>
                <Text style={styles.price}>£{((itemData.item.price)/100).toFixed(2)}</Text>
              </View>
              </View>
          </View>)
      }}
      keyExtractor={(item) => item.product_id}/>
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
  width: '60%'
  },
  productDetails: {
  marginHorizontal: 16,
  marginTop: 4
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 24,
    textTransform: 'capitalize'
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 45,
    marginLeft: 18,
  },
});
