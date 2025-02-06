import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import config from '../config';
import styles from './TableScreen-css';
import Zone from './Components/Zone';
import TableModalGreen from './Components/TableModalGreen';
import EmailModal from './Components/EditModal';
import AuthModal from './Components/AuthModal';

//Component chính
const TableScreen = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [authModalVisible, setAuthModalVisible] = useState(false); // Modal xác thực
  const [modalVisible, setModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false); // Modal email
  const navigation = useNavigation();

  // Xử lí khi đăng nhập 
  const route = useRoute();
  const isGuest = route.params?.isGuest || false; // Xác định là khách hay người dùng

  useEffect(() => {
    fetch(config.TABLE_URL)
      .then(response => response.json())
      .then(data => setTables(data))
      .catch(error => console.error('Error fetching table data:', error));
  }, []);
  console.log(isGuest);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(config.TABLE_URL);
        const data = await response.json();
        setTables(data);

        // Kiểm tra và cập nhật trạng thái bàn
        await checkAndUpdateTableStatus();
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    fetchData();
  }, []);

  const handleTableClick = (table) => {
    if (table.tbState === 1) {
      setSelectedTable(table);
      setModalVisible(true);
    } else if (table.tbState === 2) { // Màu vàng
      setSelectedTable(table);
      setAuthModalVisible(true);
    } else if (table.tbState === 3) { // Màu đỏ
      Alert.alert('Thông báo', 'Bàn này đã có người ngồi, vui lòng chọn bàn khác.');
    } else if (table.tbState === 4) { // Màu xám
      Alert.alert('Thông báo', 'Bàn này bị hư và không thể chọn.');
    }
  };

  // Cập nhậ trang thái của bàn
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
      throw error; // Báo lỗi để dừng hàm chính
    }
  };

  const deleteReservation = async (email, code) => {
    try {
      await fetch(`${config.RESERVATION_URL}/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rsEmail: email, rsCode: code }),
      });
    } catch (error) {
      console.error('Lỗi khi xoá đơn đặt bàn:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi xoá đơn đặt bàn.');
    }
  };

  // Chức năng khi nhập mã và email để vào bàn
  const handleAuthSubmit = async () => {
    try {
      const response = await fetch(`${config.RESERVATION_URL}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rsEmail: email,
          rsCode: code,
          rsTableName: selectedTable.tbName,
        }),
      });
      const data = await response.json()

      if (!data.success) {
        Alert.alert('Lỗi', 'Email hoặc mã đặt bàn không chính xác.');
        return;
      }

      Alert.alert('Thành công', 'Xác thực thành công, chuyển đến trang Home.');
      setAuthModalVisible(false);

      // Cập nhật trạng thái của bàn 
      await updateTableState(selectedTable.tbId, 3);

      // Xoá reservation sau khi vào bàn
      await deleteReservation(email, code);
      // Chuyển hướng đến home
      navigation.navigate('Home', { selectedTableName: selectedTable.tbName });
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  const handleReservation = async () => {
    if (!email) {
      Alert.alert('Thông báo', 'Vui lòng nhập email.');
      return;
    }

    const confirmationCode = `${selectedTable.tbName}_${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      await fetch(`${config.RESERVATION_URL}/sendEmail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rsTableName: selectedTable.tbName,
          rsTime: new Date().toLocaleString(),
          rsCode: confirmationCode,
          rsEmail: email,
        }),
      });

      await updateTableState(selectedTable.tbId, 2);
      Alert.alert('Thông báo', 'Mã xác nhận đã được gửi!');
      setEmailModalVisible(false);
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi xử lý yêu cầu.');
    }
  };

  const handleEnterTable = async () => {
    if (selectedTable) {
      setModalVisible(false);
      await updateTableState(selectedTable.tbId, 3);
      navigation.navigate('Home', {
        selectedTableName: selectedTable.tbName,
        selectedTableId: selectedTable.tbId,
      });
    }
  };

  // Kiểm tra và cập nhật trạng thái bàn
  const checkAndUpdateTableStatus = async () => {
    try {
      // Lấy danh sách đơn đặt bàn
      const reservationsResponse = await fetch(`${config.RESERVATION_URL}`);
      const reservations = await reservationsResponse.json();

      // Duyệt qua danh sách bàn
      for (let reservation of reservations) {
        const { rsTableName } = reservation;
        // Kiểm tra bàn trong danh sách tables
        const matchedTable = tables.find(table => table.tbName === rsTableName);
        if (matchedTable) {
          // Cập nhật trạng thái bàn thành 2 (đã được đặt bàn)
          await updateTableState(matchedTable.tbId, 2);
        }

      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra và cập nhật trạng thái bàn:', error);
    }
  };

  return (
    <ScrollView horizontal={true} style={styles.container}>
      <View style={styles.wrap}>
        <Image
          style={styles.restText}
          source={require('./img/rest-room-2.png')}
          resizeMode="contain" />
        <Image
          style={styles.entranceText}
          source={require('./img/entrance.png')}
          resizeMode="contain" />
        <View style={styles.barCounter}>
          <Image
            style={styles.barText}
            source={require('./img/bar-counter.png')}
            resizeMode="contain" />
        </View>
      </View>
      {Object.entries(config.ZONE_TABLE(tables)).map(([zoneKey, zoneData]) => (
        <Zone
          key={zoneKey}
          zoneData={zoneData}
          zoneStyle={styles[zoneKey]}
          isGuest={isGuest}
          tableItemStyle={styles[`${zoneKey}TableItem`]}
          handleTableClick={handleTableClick}
        />
      ))}

      {/* Modal nhập email và mã đặt bàn */}
      <AuthModal
        visible={authModalVisible}
        email={email}
        code={code}
        setEmail={setEmail}
        setCode={setCode}
        onSubmit={handleAuthSubmit}
        onCancel={() => setAuthModalVisible(false)}
      />

      <TableModalGreen
        visible={modalVisible}
        table={selectedTable}
        onOpenEmailModal={() => setEmailModalVisible(true)} // Hiển thị modal email
        onEnter={handleEnterTable}
        onClose={() => setModalVisible(false)}
      />
      <EmailModal
        visible={emailModalVisible}
        email={email}
        setEmail={setEmail}
        onConfirm={handleReservation}
        onCancel={() => setEmailModalVisible(false)}
      />
    </ScrollView >
  );
};

export default TableScreen;