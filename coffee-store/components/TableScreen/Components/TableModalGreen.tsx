import React from 'react';
import { Modal, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import styles from '../TableScreen-css';

const TableModalGreen = ({ visible, table, onOpenEmailModal, onEnter, onClose }) => {

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Bạn muốn làm gì với bàn {table?.tbName}?</Text>
          <Button onPress={onOpenEmailModal} style={styles.btnBook}>Đặt bàn</Button>
          <Button style={styles.btnEnter} onPress={onEnter} >Vào bàn</Button>
          <Button style={styles.btnCancle} onPress={onClose}>Hủy</Button>
        </View>
      </View>
    </Modal>
  );

};

export default TableModalGreen;