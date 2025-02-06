import React, { useEffect, useRef, useState } from 'react';
import { PanResponder, StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import config from '../../config';
import styles from '../TableScreen-css';

const TableButton = ({ table, posX, posY, onPress, tableItemStyle, isGuest }) => {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: posX, y: posY });
  const initialPosition = useRef({ x: posX, y: posY });
  const [position, setPosition] = useState({ x: posX, y: posY });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        if (!isGuest) {
          isPressed.value = true; // Chỉ cho phép khi không phải là khách
        }
      },
      onPanResponderMove: (e, gestureState) => {
        // Tính toán tọa độ mới dựa trên sự dịch chuyển (delta)
        const deltaX = gestureState.moveX - gestureState.x0; // Khoảng cách kéo theo X
        const deltaY = gestureState.moveY - gestureState.y0; // Khoảng cách kéo theo Y

        const newX = initialPosition.current.x + deltaX; // Vị trí X mới
        const newY = initialPosition.current.y + deltaY; // Vị trí Y mới

        setPosition({ x: newX, y: newY });
        offset.value = { x: newX, y: newY }; // Cập nhật vị trí trong Reanimated
      },
      onPanResponderRelease: (e, gestureState) => {
        const deltaX = gestureState.moveX - gestureState.x0;
        const deltaY = gestureState.moveY - gestureState.y0;

        const newX = initialPosition.current.x + deltaX;
        const newY = initialPosition.current.y + deltaY;

        // Lưu lại vị trí mới để lần sau kéo không bị lệch
        initialPosition.current = { x: newX, y: newY };

        // Cập nhật vị trí lên server
        updateTablePosition(newX, newY);
        isPressed.value = false;
      },
    })
  ).current;

  const animatedStyles = useAnimatedStyle(() => {
    let bgColor;
    switch (table.tbState) {
      case 1: bgColor = 'green'; break;
      case 2: bgColor = 'orange'; break;
      case 3: bgColor = 'red'; break;
      case 4: bgColor = 'gray'; break;
      default: bgColor = 'black'; break;
    }

    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: withSpring(isPressed.value ? 1.2 : 1) },
      ],
      backgroundColor: bgColor,
    };
  });

  const updateTablePosition = (x, y) => {
    // Cập nhật lên server mà không chờ đợi
    fetch(`${config.TABLE_URL}/${table.tbId}/position`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ x, y }),
    }).catch((error) => {
      console.error('Lỗi khi cập nhật tọa độ bàn:', error);
    });
  };
  return (
    <Animated.View
      style={[
        styles.tableItem,
        animatedStyles,
        tableItemStyle,
      ]}
      {...(!isGuest ? panResponder.panHandlers : {})} >
      <Text style={styles.text} onPress={() => onPress(table)}>{table.tbName}</Text>
    </Animated.View >
  );
};

export default TableButton;

