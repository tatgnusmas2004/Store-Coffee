import React from 'react';
import { Image, View } from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './Swiper-css'

const SwiperScreen = () => {
  const slideData = [
    { id: 1, uri: require('./img/slider-1.png') },
    { id: 2, uri: require('./img/slider-2.png') },
    { id: 3, uri: require('./img/slider-1.png') },
    { id: 4, uri: require('./img/slider-2.png') },
  ]

  return (
    <View style={styles.part3}>
      <Swiper
        showsButtons={false}
        showsPagination={true}
        autoplay={true}
        autoplayTimeout={3}>
        {slideData.map(slide => (
          <View key={slide.id} style={styles.slide}>
            <Image style={styles.sliderImg} source={slide.uri}></Image>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default SwiperScreen;