import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CheckBox from 'expo-checkbox';
import styles from './LoginScreenStyle'
import IonIcon from 'react-native-vector-icons/Ionicons';
import config from '../config';
const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    const response = await axios.post(config.LOGIN_URL, { username, password });
    if (response.data === "Đăng nhập thành công") {
      Alert.alert('Thông báo', "Đăng nhập thành công", [
        {
          text: "OK",
          // onPress: () => navigation.navigate("Home"),
          onPress: () => navigation.navigate("TableScreen", { isGuest: false })
        }
      ]
      )
    } else {
      setMessage('Đăng nhập thất bại');
    }
  };

  const handleGuestLogin = () => {
    navigation.navigate("TableScreen", { isGuest: true });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <Image
        source={require('./img/Logo.png')}
        style={styles.imgLogo}
      />

      <View style={styles.optionSelect}>
        <Text style={styles.opLogin}>Đăng nhập</Text>
        <Text style={styles.opRegister}>Đăng ký</Text>
      </View>

      <View style={styles.optionInput}>
        <View style={styles.optionInput1}>
          <IonIcon name='person-outline' style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.optionInput1}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>
      </View>
      <Button
        title="Đăng nhập"
        onPress={handleLogin}
      />
      <Text>{message}</Text>
      <TouchableOpacity onPress={handleGuestLogin} style={styles.guestButton}>
        <Text style={styles.guestButtonText}>Đăng nhập với tư cách khách</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;