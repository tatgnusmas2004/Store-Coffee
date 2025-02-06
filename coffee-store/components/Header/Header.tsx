import React, { useState } from 'react';
import { View, Image, TextInput } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import styles from './Header-css';
import SwiperScreen from '../Swiper/SwiperScreen';
const Header = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
    onSearch(text); // Gọi hàm onSearch khi thay đổi giá trị
  };

  return (
    <View style={styles.container}>
      <View style={styles.part1}>
        <Image source={require('./img/Logo.png')} style={styles.imgLogo} />

        <View style={styles.part2}>
          <IonIcon name="search" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm..."
            placeholderTextColor="#cccccc"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      <SwiperScreen />
    </View>
  );
};

export default Header;