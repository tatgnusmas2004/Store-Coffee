// CartScreen-css.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartMain: {
    padding: 10,
  },
  cartList: {
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'transparent',
    shadowRadius: 5,
  },
  content: {
    color: '#ccc',
  },
  items: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  pdInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  pdName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pdPrice: {
    color: '#333',
    marginTop: 5,
  },
  pdSize: {
    color: '#666',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: 'transparent', // Không có nền
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  option: {
    backgroundColor: '#fff',
    padding: 10,
  },
  selectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  selectInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  selectTable: {
    fontSize: 16,
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  // Booking
  bookingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  priceText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  orderButton: {
    width: '45%',
    borderRadius: 5,
  },
  buttonEnabled: {
    backgroundColor: '#f89520',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
});

export default styles;
