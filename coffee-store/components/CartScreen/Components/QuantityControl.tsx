import React from 'react';
import { Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import styles from '../CartScreen-css';

const QuantityControl = ({ quantity, setQuantity }) => {
  const increase = () => {
    setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(0); // Số lượng về 0 để xóa
    }
  };
  return (
    <View style={styles.quantityContainer}>
      <IconButton icon="minus" onPress={decrease} style={styles.iconButton} />
      <Text style={styles.quantityText}>{quantity}</Text>
      <IconButton icon="plus" onPress={increase} style={styles.iconButton} />
    </View>
  );
};

export default QuantityControl;
