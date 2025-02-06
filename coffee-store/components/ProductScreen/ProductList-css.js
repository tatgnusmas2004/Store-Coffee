import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  productContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  modalProductName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalPrice: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
  },
  modalDescription: {
    fontSize: 14,
    marginBottom: 10,
    color: '#777',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  radioButton: {
    padding: 0,
    marginVertical: 5,
  },

  // Quantity selector
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  quantityButton: {
    backgroundColor: '#ccc',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityDisplay: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f8f8f8',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
    color: '#333',
  },
});

export default styles;
