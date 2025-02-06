import React, { useEffect, useState } from 'react';
import { View, Text, Modal, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { RadioButton, Button, Checkbox } from 'react-native-paper';
import styles from '../ProductList-css';
import QuantitySelector from './QuantitySelector';
import config from '../../config';
import { useRoute } from '@react-navigation/native';

const ProductModal = ({ visible, product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  // khai báo tên bàn đã được chọn từ TableScreen
  const route = useRoute();
  const selectedTableName = route.params?.selectedTableName;

  if (!product) return null;

  const renderSizeOptions = () => (
    ["S", "M", "L"].map(size => (
      <RadioButton.Item
        key={size}
        label={size === "S" ? "S" : size === "M" ? "M (+3000 VNĐ)" : "L (+ 5000VNĐ)"}
        value={size}
        style={styles.radioButton}
      />
    ))
  );

  const handleAddToCart = () => {
    let sizePrice = 0;
    if (selectedSize === "M") sizePrice = 3000;
    else if (selectedSize === "L") sizePrice = 5000;

    const totalPrice = (product.pdPrice + sizePrice); // Tính tổng giá
    const cartItem = {
      productName: product.pdName,
      imgURL: product.pdImgURL,
      price: totalPrice,
      description: product.pdDescription,
      size: selectedSize,
      quantity: quantity,
      tbName: selectedTableName,
    };
    addToCart(cartItem);
    onClose(); // Đóng modal sau khi thêm vào giỏ
  };

  const addToCart = async (cartItem) => {
    try {
      const response = await fetch(`${config.CART_ITEMS_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(cartItem),
      });

      if (response.ok) {
        alert("Đã thêm vào giỏ hàng");
        console.log('Added to cart successfully');
      } else {
        console.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Bàn: {selectedTableName}</Text>
            <Text style={styles.modalProductName}>{product.pdName}</Text>
            <Text style={styles.modalPrice}>Giá: {config.formatCurrency(product.pdPrice)}</Text>
            <Text style={styles.modalPrice}>Loại sản phẩm: {product.pdType}</Text>
            <Text style={styles.sectionTitle}>Kích thước:</Text>
            <RadioButton.Group onValueChange={setSelectedSize} value={selectedSize}>
              {renderSizeOptions()}
            </RadioButton.Group>
            <Text style={styles.sectionTitle}>Số lượng:</Text>
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

            {/* <Button onPress={addToCart} style={styles.button}>Thêm vào đơn món</Button> */}
            <Button onPress={handleAddToCart} style={styles.button}>Thêm vào đơn món</Button>
            <Button onPress={onClose} style={styles.button}>Đóng</Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ProductModal;
