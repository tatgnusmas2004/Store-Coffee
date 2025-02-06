import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    color: '#000', // Màu chữ trắng
    fontSize: 20,
    fontWeight: 'bold',
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: "#fff",

    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  wrapper: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  contentText: {
    fontSize: 14,
    color: '#555',
    flexShrink: 1,
  },
});
export default styles;