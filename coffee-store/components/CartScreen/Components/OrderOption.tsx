
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import styles from '../CartScreen-css';

const OrderOptions = () => {
  const [text, setText] = useState('');
  return (
    <View style={styles.option}>

      <View style={styles.selectItem}>
        <IonIcon name="clipboard-outline" size={20} />
        <View style={styles.selectInfo}>
          <TextInput
            style={styles.selectTable}
            placeholder='Ghi chú'
            onChangeText={setText} />
        </View>
        <IonIcon name="chevron-forward-outline" size={20} />
      </View>
    </View>
  );
};

export default OrderOptions;
