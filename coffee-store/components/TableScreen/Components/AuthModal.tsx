import React from 'react';
import { View, Text, TextInput, Modal } from 'react-native';
import { Button } from 'react-native-paper';
import styles from '../TableScreen-css';

const AuthModal = ({ visible, email, code, setEmail, setCode, onSubmit, onCancel }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Bàn này đã được đặt chỗ</Text>
          <Text>Vui lòng nhập email và mã đặt bàn</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Nhập mã đặt bàn"
            value={code}
            onChangeText={setCode}
          />
          <Button onPress={onSubmit}>Vào bàn</Button>
          <Button onPress={onCancel}>Huỷ</Button>
        </View>
      </View>
    </Modal>
  );
};

export default AuthModal;
