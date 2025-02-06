import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import styles from './ProfileScreen-css';
import ProductItem from '../ProductScreen/Components/ProductItem';
import { ActivityIndicator } from 'react-native-paper';
import ProductModal from '../ProductScreen/Components/ProductModal';
import axios from 'axios';
import config from '../config';

const ProfileScreen = ({ keyword }) => {
  const [foods, setFoods] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(0); // Trang hiện tại
  const [loading, setLoading] = useState(false); // Trạng thái đang tải
  const [hasMore, setHasMore] = useState(true); // Kiểm tra còn dữ liệu để tải không

  const fetchProducts = async () => {
    if (loading || !hasMore) return; // Nếu đang tải hoặc không còn dữ liệu, không thực hiện nữa
    setLoading(true);

    const url = keyword ? config.SEARCH_PRODUCTS_URL : `${config.PRODUCTS_URL}/page`;
    const params = keyword ? { name: keyword, page, size: 6 } : { page, size: 6 };

    try {
      const response = await axios.get(url, { params });
      const newProducts = response.data.content || response.data; // Lấy dữ liệu từ API

      setFoods((prevFoods) => [...prevFoods, ...newProducts]); // Ghép dữ liệu cũ với dữ liệu mới
      setHasMore(newProducts.length > 0); // Nếu không có sản phẩm mới, dừng tải
      setPage((prevPage) => prevPage + 1); // Tăng trang hiện tại
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFoods([]); // Reset danh sách sản phẩm khi thay đổi keyword
    setPage(0);
    setHasMore(true);
  }, [keyword]);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <View style={styles.container}>
      <FlatList
        data={foods}
        keyExtractor={(item) => item.pdId?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <ProductItem item={item} onSelect={() => setSelectedProduct(item)} />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {keyword ? "Không tìm thấy sản phẩm phù hợp." : "Không có sản phẩm nào."}
          </Text>
        }
        onEndReached={fetchProducts} // Gọi khi kéo đến cuối danh sách
        onEndReachedThreshold={0.5} // Gần cuối danh sách (50%) thì tải
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
      />
      <ProductModal
        visible={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </View>
  );
};

export default ProfileScreen;