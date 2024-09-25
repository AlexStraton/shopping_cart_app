import { Modal, Pressable, Text, View, TextInput, Alert } from "react-native";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { postProduct } from "./api";
import { Formik } from "formik";
import { productFormSchema } from "./schema/productValidation";

export default function AddProduct({ visible, onClose }) {
  async function handleSubmit(values: any, resetForm: any) {
    try {
      const response = await postProduct(values);

      if (response && response.status === 201) {
        Alert.alert("Successfully Added", "Your product has been added", [
          {
            text: "Confirm",
            onPress: () => {
              resetForm();
              onClose();
            },
            style: "cancel",
          },
        ]);
      } else {
        Alert.alert(
          "Not Added",
          "Your product could not be added, please try again",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred. Please try again.", [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
    }
  }

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modal}>
              <Formik
                initialValues={{
                  product_name: "",
                  description: "",
                  price: "",
                  product_image_url: "",
                }}
                validationSchema={productFormSchema}
                onSubmit={(values, { resetForm }) =>
                  handleSubmit(values, resetForm)
                }>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    <Pressable onPress={onClose} style={styles.closeButton}>
                      <MaterialCommunityIcons
                        name='close-circle-outline'
                        size={24}
                      />
                    </Pressable>

                    <View style={styles.inputField}>
                      <Text style={styles.inputLabel}>Product Name: </Text>
                      <TextInput
                        style={styles.input}
                        placeholder='Name...'
                        onChangeText={handleChange("product_name")}
                        onBlur={handleBlur("product_name")}
                        value={values.product_name}
                      />
                      {touched.product_name && errors.product_name && (
                        <Text style={styles.errorText}>
                          {errors.product_name}
                        </Text>
                      )}
                    </View>

                    <View style={styles.inputField}>
                      <Text style={styles.inputLabel}>Description: </Text>
                      <TextInput
                        style={styles.input}
                        placeholder='Description...'
                        onChangeText={handleChange("description")}
                        onBlur={handleBlur("description")}
                        value={values.description}
                        multiline
                        numberOfLines={4}
                        maxLength={100}
                      />
                      {touched.description && errors.description && (
                        <Text style={styles.errorText}>
                          {errors.description}
                        </Text>
                      )}
                    </View>

                    <View style={styles.inputField}>
                      <Text style={styles.inputLabel}>Price: </Text>
                      <TextInput
                        style={styles.input}
                        placeholder='Price...'
                        keyboardType='number-pad'
                        onChangeText={handleChange("price")}
                        onBlur={handleBlur("price")}
                        value={values.price}
                      />

                      {touched.price && errors.price && (
                        <Text style={styles.errorText}>{errors.price}</Text>
                      )}
                    </View>

                    <View style={styles.inputField}>
                      <Text style={styles.inputLabel}>Image URL: </Text>
                      <TextInput
                        style={styles.input}
                        placeholder='Image URL...'
                        onChangeText={handleChange("product_image_url")}
                        onBlur={handleBlur("product_image_url")}
                        value={values.product_image_url}
                      />
                      {touched.product_image_url &&
                        errors.product_image_url && (
                          <Text style={styles.errorText}>
                            {errors.product_image_url}
                          </Text>
                        )}
                    </View>

                    <Pressable style={styles.addButton} onPress={handleSubmit}>
                      <Text style={styles.buttonText}>Add Product</Text>
                    </Pressable>
                  </>
                )}
              </Formik>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  modal: {
    backgroundColor: "#B7D9DD",
    height: 650,
    width: "95%",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 5,
    marginLeft: 8,
    flex: 2,
  },
  inputField: {
    flex: 1,
    marginVertical: 8,
    marginBottom: "5%",
  },
  closeButton: {
    flexDirection: "row-reverse",
    marginBottom: 20,
  },
  addButton: {
    borderColor: "black",
    borderWidth: 2,
    width: "50%",
    padding: 12,
    borderRadius: 10,
    alignSelf: "center",
    margin: 20,
    backgroundColor: "#1F5673",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  errorText: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 4,
    color: "#b22222",
  },
  inputLabel: {
    textAlignVertical: "center",
    marginBottom: 10,
    flex: 1,
    fontWeight: "bold",
  },
});
