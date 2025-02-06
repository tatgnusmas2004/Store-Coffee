import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import styles from './Notification-css';

const NoticationScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerText}>Thông báo</Text>
      </View>
      <ScrollView>
        <View style={styles.notification}>
          <Image
            source={require('./img/user.png')}
            style={styles.img} />
          <View style={styles.wrapper}>
            <Text style={styles.title}>Tiêu đề thông báo</Text>
            <Text style={styles.contentText} numberOfLines={1}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, vitae totam! Ipsa nesciunt perferendis modi dicta doloremque nisi fugit voluptate quibusdam tempore pariatur non dolores atque sequi, vitae accusamus culpa.
            </Text>
          </View>

        </View>
        <View style={styles.notification}>
          <Image
            source={require('./img/user.png')}
            style={styles.img} />
          <View style={styles.wrapper}>
            <Text style={styles.title}>Tiêu đề thông báo</Text>
            <Text style={styles.contentText} numberOfLines={1}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, vitae totam! Ipsa nesciunt perferendis modi dicta doloremque nisi fugit voluptate quibusdam tempore pariatur non dolores atque sequi, vitae accusamus culpa.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NoticationScreen;