import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Căn giữa theo trục dọc
    alignItems: 'center',     // Căn giữa theo trục ngang
    padding: 16,
  },
  title: {
    fontWeight: '500',
    fontSize: 30,
    marginBottom: 20, // Khoảng cách giữa tiêu đề và logo
  },
  imgLogo: {
    width: 200,
    height: 100,
    marginBottom: 20, // Khoảng cách giữa logo và các thành phần khác
  },
  optionSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Đảm bảo chiều rộng của thanh lựa chọn
    paddingHorizontal: 20, // Khoảng cách giữa hai nút
    marginBottom: 20, // Khoảng cách dưới thanh lựa chọn
  },
  optionInput: {
    width: '100%', // Đảm bảo chiều rộng của khung nhập liệu
    paddingHorizontal: 20, // Thêm khoảng cách vào bên trái và bên phải
  },
  optionInput1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Căn giữa các thành phần bên trong
    marginBottom: 10, // Khoảng cách giữa các trường nhập liệu
  },
  icon: {
    fontSize: 20,
    paddingLeft: 10, // Thêm khoảng cách bên trái cho biểu tượng
    position: 'absolute',
    right: 24
  },
  input: {
    height: 40,
    borderColor: 'gray',
    position: 'relative',
    borderWidth: 1,
    padding: 10,
    flex: 1, // Chiếm không gian còn lại
    marginRight: 10, // Khoảng cách giữa TextInput và biểu tượng
  },
  optionForget: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Căn chỉnh khoảng cách giữa hai phần
    alignItems: 'center', // Căn giữa các thành phần theo chiều dọc
    paddingVertical: 10, // Thêm khoảng cách trên và dưới
    width: '100%', // Đảm bảo chiều rộng của phần quên mật khẩu
    paddingHorizontal: 20, // Thêm khoảng cách hai bên
  },
  checkbox: {
    marginRight: 10,
  },
  remember: {
    flexDirection: 'row',
    alignItems: 'center', // Căn giữa checkbox và text
  },
  rememberText: {
    fontSize: 16, // Kích thước chữ
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 16, // Kích thước chữ
  },
  opLogin: {
    marginRight: 10,
    fontSize: 16, // Kích thước chữ
  },
  opRegister: {
    fontSize: 16, // Kích thước chữ
  },
  message: {
    marginTop: 10, // Khoảng cách trên cho thông báo
    color: 'red', // Màu chữ thông báo
  },
});

export default styles;
