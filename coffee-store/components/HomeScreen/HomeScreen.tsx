import React, { useCallback, useState } from 'react';
import { Text, View, FlatList, BackHandler, Alert } from 'react-native';
import ProductList from '../ProductScreen/ProductList';
import Header from '../Header/Header';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import config from '../config';
import axios from 'axios';
const HomeScreen = ({ route }) => {
  const [keyword, setKeyword] = useState('');
  const { selectedTableName, selectedTableId } = route.params;
  const navigation = useNavigation();

  // Cập nhật trạng thái của bàn
  const updateTableState = async (tbId, tbState) => {
    try {
      await fetch(`${config.TABLE_URL}/${tbId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tbState }),
      });
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật trạng thái bàn.');
      throw error;
    }
  };

  const clearCartItemsByTable = async () => {
    try {
      const response = await axios.delete(`${config.CART_ITEMS_URL}/clear/${selectedTableName}`);
      if (response.status === 200) {
        return;
      } else {
        Alert.alert("Thông báo", "Có lỗi khi xóa giỏ hàng.");
      }
    } catch (error) {
      return;
    }
  };

  // Xử lý nút "Back" chỉ trên màn hình HomeScreen
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Thông báo",
          "Bạn có muốn thoát khỏi ứng dụng không?",
          [
            { text: "Hủy", style: "cancel" },
            {
              text: "Xác nhận",
              onPress: async () => {
                await updateTableState(selectedTableId, 1);
                clearCartItemsByTable();
                navigation.navigate("TableScreen"); // Quay lại trang TableScreen
              },
            },
          ]
        );
        return true; // Chặn hành động "Back" mặc định
      };

      // Thêm sự kiện "Back" khi vào HomeScreen
      const backHandler = BackHandler.addEventListener("hardwareBackPress", onBackPress);

      // Gỡ bỏ sự kiện "Back" khi rời khỏi HomeScreen
      return () => backHandler.remove();
    }, [navigation])
  );

  const handleSearch = (keyword) => {
    setKeyword(keyword); 
  };

  return (
    <FlatList
      ListHeaderComponent={
        <View>
          <Header onSearch={handleSearch} />
          {selectedTableName ?
            <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 18 }}>
              Bàn số: {selectedTableName}
            </Text>
            :
            <Text>không có bàn</Text>}
        </View>
      }
      ListFooterComponent={
        <View style={{ padding: 10, backgroundColor: '#f0f0f0' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Danh sách sản phẩm</Text>
          <ProductList keyword={keyword} />
        </View>
      }
    />
  );
};

export default HomeScreen;
