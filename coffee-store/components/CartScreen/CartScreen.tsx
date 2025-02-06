// CartScreen.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import CartItem from './Components/CartItem';
import styles from './CartScreen-css';
import config from '../config';
import OrderOptions from './Components/OrderOption';
import Booking from './Components/Booking';

const CartScreen = ({ route }) => {
  const [cartItems, setCartItems] = useState([]);
  const selectedTableName = route.params?.selectedTableName;

  useEffect(() => {
    if (route.params?.cartItems) {
      // Nếu quay lại từ InvoiceScreen, lấy thông tin giỏ hàng cũ
      setCartItems(route.params.cartItems);
    } else {
      // Nếu không, fetch dữ liệu mới
      fetchCartItems();
    }
  }, [route.params]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`${config.CART_ITEMS_URL}/table?tbName=${selectedTableName}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setCartItems(data);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]); // Gán mảng trống nếu có lỗi xảy ra
    }
  };

  const updateQuantityOnServer = async (id, newQuantity) => {
    try {
      const response = await fetch(`${config.CART_ITEMS_URL}/update-quantity/${id}?quantity=${newQuantity}`, {
        method: 'PUT',
      });
      if (response.ok) {
        console.log(`Item ${id} quantity updated to ${newQuantity}`);
      } else {
        console.error(`Failed to update quantity for item ${id}`);
      }
    } catch (error) {
      console.error(`Error updating quantity for item ${id}:`, error);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity > 0) {
      // Cập nhật danh sách giỏ hàng trên client
      setCartItems((prevItems) =>
        prevItems.map((item) => item.id === id ? { ...item, quantity: newQuantity } : item));
    } else {
      // Xóa item khỏi danh sách và gọi API xóa trên server
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      // removeItemFromServer(id);
    }
    updateQuantityOnServer(id, newQuantity);
  };

  // Tính tổng số lượng và tổng giá tiền
  const calculateTotals = () => {
    let totalQuantity = 0;
    let totalPrice = 0;

    cartItems.forEach((item) => {
      totalQuantity += item.quantity;

      // Tổng giá sản phẩm
      let itemTotal = item.price * item.quantity;

      totalPrice += itemTotal;
    });

    return { totalQuantity, totalPrice };
  };

  const { totalQuantity, totalPrice } = calculateTotals();

  return (
    <ScrollView>

      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Giỏ hàng</Text>
        </View>

        <ScrollView style={styles.cartMain}>
          <View style={styles.cartList}>
            {cartItems.length === 0 ? (
              <Text style={styles.content}>Không có sản phẩm trong giỏ hàng</Text>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                />
              ))
            )}
          </View>
          <OrderOptions />
          <Booking hasItems={cartItems.length > 0} totalQuantity={totalQuantity} totalPrice={totalPrice} cartItems={cartItems} selectedTableName={selectedTableName} />
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default CartScreen;
