import React from 'react';
import { Modal, View, Text, TextInput } from 'react-native';
import styles from '../TableScreen-css';
import { Button } from 'react-native-paper';

const EmailModal = ({ visible, email, setEmail, onConfirm, onCancel }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Nhập email để xác nhận đặt bàn:</Text>
          <TextInput
            placeholder="Nhập email của bạn"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <Button onPress={onConfirm} >Xác nhận đặt bàn</Button>
          <Button onPress={onCancel} >Hủy</Button>
        </View>
      </View>
    </Modal>
  );
};

export default EmailModal;
