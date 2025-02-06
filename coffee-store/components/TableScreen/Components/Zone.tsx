import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../TableScreen-css';
import TableButton from './TableButton';

// Component khu vực bàn
const Zone = ({ zoneData, zoneStyle, handleTableClick, tableItemStyle, isGuest }) => {
  return (

    <View style={[styles.zone, zoneStyle]}>
      {zoneData.map((table, index) => (
        <TableButton
          key={index}
          table={table}
          posX={table.x}  // Nếu không có giá trị tọa độ, mặc định là 0
          posY={table.y}
          isGuest={isGuest}
          onPress={handleTableClick}
          tableItemStyle={tableItemStyle}
        />
      ))}
    </View>
  );
};

export default Zone;