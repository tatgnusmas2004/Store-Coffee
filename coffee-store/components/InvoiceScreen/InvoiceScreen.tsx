import React from 'react';
import { Alert, Linking, ScrollView, Text, View } from 'react-native';
import config from '../config';
import styles from './InvoiceScreen-css';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const InvoiceScreen = ({ route }) => {
  const { cartItems, totalQuantity, totalPrice, selectedTableName } = route.params;
  const navigation = useNavigation();

  const saveInvoiceToDatabase = async () => {
    const invoiceData = {
      invoItems: cartItems.map(item => ({
        invoPdName: item.productName,
        invoPdSize: item.size,
        invoPdPrice: item.price,
        invoQuantity: item.quantity,
      })),
      invoTotalPrice: totalPrice,
      invoDateCreate: new Date().toISOString(), // Lưu thời gian hiện tại
      invoTbName: selectedTableName, // Nếu có thông tin bàn
    };

    try {
      const response = await fetch(`${config.INVOICE_URL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceData),
      });

      if (response.ok) {
        console.log('Hóa đơn đã được lưu thành công');
        // handlePaymentSuccess();
      } else {
        console.error('Lỗi khi lưu hóa đơn:', await response.text());
      }
    } catch (error) {
      console.error('Lỗi kết nối API:', error);
    }
  };

  const handlePayment = async () => {
    try {
      // Gọi API /vn-pay với tham số amount
      const response = await fetch(`${config.PAYMENT_URL}/vn-pay?amount=${totalPrice}`);
      const data = await response.json();

      if (data.data.code === "ok" && data.data.paymentUrl) {
        Linking.openURL(data.data.paymentUrl);
      } else {
        Alert.alert('Lỗi', 'Không thể lấy đường dẫn thanh toán');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi thanh toán');
      console.error(error);
    }
  };

  const returnHomeScreen = () => {
    navigation.navigate('Home', selectedTableName);
  }

  const clearCartItemsByTable = async () => {
    try {
      const response = await fetch(`${config.CART_ITEMS_URL}/clear/${selectedTableName}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        return;
      } else {
        Alert.alert("Thông báo", "Có lỗi khi xóa giỏ hàng.");
      }
    } catch (error) {
      console.error("Error clearing cart items:", error);
      Alert.alert("Thông báo", "Đã có lỗi xảy ra khi thực hiện thanh toán.");
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Hóa đơn bàn: {selectedTableName}</Text>
      <ScrollView>
        {cartItems.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.productName}</Text>
            <Text style={styles.itemSize}>Kích thước: {item.size}</Text>
            <Text style={styles.itemPrice}>
              Giá: {config.formatCurrency(item.price)} x {item.quantity}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.divider} />
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Thời gian: {new Date().toLocaleString()}</Text>
        <Text style={styles.summaryText}>Tổng số lượng: {totalQuantity}</Text>
        <Text style={styles.summaryText}>
          Tổng tiền: {config.formatCurrency(totalPrice)}
        </Text>
        <Button
          mode="contained"
          style={styles.paymentButton}
          onPress={() => {
            handlePayment();
            // saveInvoiceToDatabase();
            returnHomeScreen();
            clearCartItemsByTable();
          }}>

          Thanh toán
        </Button>
      </View>
    </ScrollView>
  );
};

export default InvoiceScreen;