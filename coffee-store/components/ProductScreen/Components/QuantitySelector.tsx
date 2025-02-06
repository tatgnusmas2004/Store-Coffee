// QuantitySelector.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../ProductList-css';

const QuantitySelector = ({ quantity, setQuantity }) => {
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <View style={styles.quantityContainer}>
      <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
        <Text style={styles.quantityText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantityDisplay}>{quantity}</Text>
      <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
        <Text style={styles.quantityText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuantitySelector;
