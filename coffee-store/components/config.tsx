const API_BASE_URL = 'http://192.168.1.2:8888/api';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// Chia bàn thành các khu vực nhỏ hơn
const groupTablesByZone = (tables) => ({
  zone1a: tables.filter(table => parseInt(table.tbName) >= 101 && parseInt(table.tbName) <= 104),
  zone1b: tables.filter(table => parseInt(table.tbName) >= 105 && parseInt(table.tbName) <= 108),
  zone1c: tables.filter(table => parseInt(table.tbName) >= 109 && parseInt(table.tbName) <= 111),
  zone2: tables.filter(table => parseInt(table.tbName) >= 201 && parseInt(table.tbName) <= 205),
  zone3: tables.filter(table => parseInt(table.tbName) >= 206 && parseInt(table.tbName) <= 208),
  zone4: tables.filter(table => parseInt(table.tbName) >= 301 && parseInt(table.tbName) <= 306),
});

export default {
  PRODUCTS_URL: `${API_BASE_URL}/products`,
  TOPPING_URL: `${API_BASE_URL}/toppings`,
  CART_ITEMS_URL: `${API_BASE_URL}/carts`,
  TABLE_URL: `${API_BASE_URL}/tables`,
  RESERVATION_URL: `${API_BASE_URL}/reservations`,
  INVOICE_URL: `${API_BASE_URL}/invoices`,
  PAYMENT_URL: `${API_BASE_URL}/payment`,
  LOGIN_URL: `${API_BASE_URL}/admin/login`,

  SEARCH_PRODUCTS_URL: `${API_BASE_URL}/products/search`,
  ADD_TO_CART: `${API_BASE_URL}/carts/add`,
  DELETE_BOOK_TABLE: `${API_BASE_URL}/reservations/delete`,

  formatCurrency,
  ZONE_TABLE: groupTablesByZone,
};
