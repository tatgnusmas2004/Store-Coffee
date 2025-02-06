// Booking.js
import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import styles from '../CartScreen-css.js';
import config from '../../config';
import { useNavigation } from '@react-navigation/native';

const Booking = ({ hasItems, totalQuantity, totalPrice, cartItems, selectedTableName }) => {
  const navigation = useNavigation();

  const handlePlaceOrder = () => {
    navigation.navigate('InvoiceScreen', {
      selectedTableName,
      cartItems,
      totalQuantity,
      totalPrice,
    });
  };
  return (
    <View style={styles.bookingContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.itemText}>số lượng: {totalQuantity} sản phẩm</Text>
        <Text style={styles.priceText}>{config.formatCurrency(totalPrice)}</Text>
      </View>
      <Button
        mode="contained"
        style={[styles.orderButton, hasItems ? styles.buttonEnabled : styles.buttonDisabled]}
        onPress={handlePlaceOrder}
        disabled={!hasItems}>
        Đặt món
      </Button>
    </View>
  );
};

export default Booking;
