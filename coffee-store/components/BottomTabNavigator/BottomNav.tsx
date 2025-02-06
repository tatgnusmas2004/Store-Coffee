import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../HomeScreen/HomeScreen';
import styles from './BottomNav-css';
import NoticationScreen from '../NotificationScreen/NoticationScreen';
import CartScreen from '../CartScreen/CartScreen';
import ProfileScreen from '../ProfileScreen/ProfileScreen';

const BottomNav = ({ route }) => {
  const selectedTableName = route.params?.selectedTableName;
  const selectedTableId = route.params?.selectedTableId;

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons = {
            "Trang chủ": 'home',
            'Thông báo': 'bell',
            'Đặt món': 'shopping-cart',
            'Cá nhân': 'user',
          }
          return <FontAwesome name={icons[route.name]} size={size} color={color} />
        },
        tabBarActiveTintColor: '#f89520',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBars,
      })}>
      <Tab.Screen
        name='Trang chủ'
        component={HomeScreen}
        options={{ headerShown: false }}
        initialParams={{ selectedTableName, selectedTableId }}
      />
      {/* <Tab.Screen
        name="Thông báo"
        component={NoticationScreen}
        options={{ headerShown: false }}
      /> */}
      <Tab.Screen
        name="Đặt món"
        component={CartScreen}
        options={{ headerShown: false }}
        initialParams={{ selectedTableName }}
      />
      <Tab.Screen
        name="Đánh giá"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;