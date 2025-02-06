import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  itemContainer: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemSize: {
    fontSize: 14,
    marginVertical: 4,
  },
  toppingsHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  toppingItem: {
    fontSize: 14,
    marginLeft: 16,
    marginVertical: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: 8,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 16,
  },
  summaryContainer: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  summaryText: {
    fontSize: 14,
    marginVertical: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  backButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#ccc',
  },
  paymentButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#007bff',
  },
});

export default styles;
