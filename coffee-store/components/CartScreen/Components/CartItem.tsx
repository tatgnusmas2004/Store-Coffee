// CartItem.js
import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from '../CartScreen-css.js';
import QuantityControl from './QuantityControl';
import config from '../../config';

const CartItem = ({ item, updateQuantity }) => {
  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity);
  };
  return (
    <View style={styles.items}>
      <Image source={{ uri: item.imgURL }} style={styles.image} />
      <View style={styles.pdInfo}>
        <Text style={styles.pdName}>{item.productName}</Text>
        <Text style={styles.pdPrice}>{config.formatCurrency(item.price)}</Text>
        <Text style={styles.pdSize}>Kích cỡ: {item.size}</Text>
      </View>
      <QuantityControl
        quantity={item.quantity}
        setQuantity={handleQuantityChange}
      />
    </View>
  );
};

export default CartItem;
