// ProductItem.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../ProductList-css';
import config from '../../config'
const ProductItem = ({ item, onSelect }) => {
  const formattedPrice = config.formatCurrency(item.pdPrice)
  return (
    <TouchableOpacity onPress={onSelect} >
      <View style={styles.productContainer}>
        <Image source={{ uri: item.pdImgURL }} style={styles.productImage} />
        <Text style={styles.productName}> {item.pdName} </Text>
        <Text style={styles.productPrice}> Giá: {formattedPrice} </Text>
      </View>
    </TouchableOpacity>
  );
}

export default ProductItem;
