import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../api/config';
import './css/TableDetail.css'
import './css/Modal.css'
const TableDetail = () => {
  const { tbId } = useParams(); // Lấy id của bàn từ URL
  const [selectedTable, setselectedTable] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('S');

  // Hàm mở modal đặt món
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setQuantity(1);
    setSelectedSize('S');
  };

  // Hàm đóng modal đặt món
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Hàm thêm món vào giỏ hàng
  const handleAddToCart = async () => {
    const priceAdjustment = selectedSize === 'M' ? 3000 : selectedSize === 'L' ? 5000 : 0;
    const totalPrice = selectedProduct.pdPrice + priceAdjustment;

    const cartItem = {
      productName: selectedProduct.pdName,
      imgURL: selectedProduct.pdImgURL,
      price: totalPrice,
      description: selectedProduct.pdDescription,
      size: selectedSize,
      quantity,
      tbName: selectedTable.tbName,
    };

    try {
      const response = await fetch(`${config.CART_ITEMS_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartItem),
      });

      if (!response.ok) throw new Error('Failed to add to cart');
      fetchCartItems();
      handleCloseModal();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  // =========================================

  // Lấy ra thông tin của bàn được chọn
  const fetchselectedTable = async () => {
    try {
      const response = await fetch(`${config.TABLES_URL}/${tbId}`);
      if (!response.ok) throw new Error('Failed to fetch table info');
      const data = await response.json();
      setselectedTable(data);
    } catch (error) {
      console.error('Error fetching table info:', error);
    }
  };

  // Lấy ra danh sách sản phẩm trong giỏ hàng theo tên bàn
  const fetchCartItems = async () => {
    if (!selectedTable?.tbName) return;
    try {
      const response = await fetch(`${config.CART_ITEMS_URL}/table?tbName=${selectedTable.tbName}`);
      if (!response.ok) throw new Error('Failed to fetch cart items');
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  // Lấy ra danh sách sản phẩm
  const fetchProducts = async () => {
    try {
      const response = await fetch(config.PRODUCTS_URL);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  //Cập nhật số lượng sản phẩm trong giỏ hàng
  const updateCartItemQuantity = async (id, quantity) => {
    try {
      const response = await fetch(`${config.CART_ITEMS_URL}/update-quantity/${id}?quantity=${quantity}`, {
        method: 'PUT',
      });
      if (!response.ok) throw new Error('Failed to update quantity');
      fetchCartItems(); // Refresh giỏ hàng sau khi cập nhật
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Xử lý tăng số lượng sản phẩm trong giỏ hàng
  const handleIncrease = (itemId, currentQuantity) => {
    updateCartItemQuantity(itemId, currentQuantity + 1);
  };

  // Xử lý giảm số lượng sản phẩm trong giỏ hàng
  const handleDecrease = (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateCartItemQuantity(itemId, currentQuantity - 1);
    } else {
      updateCartItemQuantity(itemId, 0); // Xóa sản phẩm nếu số lượng về 0
    }
  };

  // Lấy thông tin chi tiết bàn
  useEffect(() => {
    fetchselectedTable();
    fetchProducts();
  }, [tbId]);

  useEffect(() => {
    fetchCartItems();
  }, [selectedTable]);

  // Hàm tính tổng số lượng và giá
  const calculateTotals = () => {
    let totalQuantity = 0;
    let totalPrice = 0;

    cartItems.forEach((item) => {
      totalQuantity += item.quantity;

      // Tổng giá sản phẩm
      let itemTotal = item.price * item.quantity;

      // Tổng giá topping
      if (item.toppings?.length) {
        item.toppings.forEach((topping) => {
          itemTotal += topping.tpPrice * item.quantity;
        });
      }

      totalPrice += itemTotal;
    });

    return { totalQuantity, totalPrice };
  };

  const { totalQuantity, totalPrice } = calculateTotals();

  // Xử lý thanh toán (xoá cartItem sau khi thanh toán)
  const clearCartItemsByTable = async () => {
    try {
      const response = await fetch(`${config.CART_ITEMS_URL}/clear/${selectedTable.tbName}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCartItems([]);
      } else {
        alert('Thanh toán thất bại!');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  // Xư lý thanh toán(chuyển đến trang thanh toán)
  const handlePayment = async () => {
    try {
      // Gọi API /vn-pay với tham số amount
      const response = await fetch(`${config.PAYMENT_URL}/vn-pay?amount=${totalPrice}`);
      const data = await response.json();

      if (data.data.code === "ok" && data.data.paymentUrl) {
        window.location.href = data.data.paymentUrl;
      } else {
        alert('Lỗi', 'Không thể lấy đường dẫn thanh toán');
      }
    } catch (error) {
      alert('Lỗi', 'Đã xảy ra lỗi khi thanh toán');
    }
  };

  // const saveInvoiceToDatabase = async () => {
  //   const invoiceData = {
  //     invoItems: cartItems.map(item => ({
  //       invoPdName: item.productName,
  //       invoPdSize: item.size,
  //       invoPdPrice: item.price,
  //       invoQuantity: item.quantity,
  //     })),
  //     invoTotalPrice: totalPrice,
  //     invoDateCreate: new Date().toISOString(), // Lưu thời gian hiện tại
  //     invoTbName: selectedTable?.tbName, // Nếu có thông tin bàn
  //   };

  //   try {
  //     const response = await fetch(`${config.INVOICE_URL}/create`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(invoiceData),
  //     });

  //     if (response.ok) {
  //       console.log('Hóa đơn đã được lưu thành công');
  //     } else {
  //       console.error('Lỗi khi lưu hóa đơn:', await response.text());
  //     }
  //   } catch (error) {
  //     console.error('Lỗi kết nối API:', error);
  //   }
  // };

  return (
    <div className="table-detail">
      <div className="cart">
        <h2 className='cart-header'>Giỏ hàng</h2>
        <ul className='cart-list'>
          {cartItems.map((item) => (
            <li className='cart-item' key={item.id}>
              <p className='product-name'>{item.productName}</p>
              <img className='product-img' src={item.imgURL} alt="" />
              <p>Số lượng:</p>
              <div className='quantity'>
                <button onClick={() => handleDecrease(item.id, item.quantity)}>-</button>
                {item.quantity}
                <button onClick={() => handleIncrease(item.id, item.quantity)}>+</button>
                <br />
              </div>
              <p>Giá: {item.quantity * item.price} VND</p>
            </li>
          ))}
        </ul>
        <div className="total">
          <p>Tổng số lượng: {totalQuantity}</p>
          <p>Tổng giá tiền: {totalPrice} VND</p>
          <button
            onClick={() => {
              handlePayment();
              clearCartItemsByTable();
            }}>
            Thanh toán
          </button>
        </div>
      </div>

      <div className="product-list">
        <h2>Danh sách sản phẩm</h2>
        <ul>
          {products.map((product) => (
            <li key={product.pdId} onClick={() => handleOpenModal(product)}>
              <img src={product.pdImgURL} alt={product.pdName} />
              <h3>{product.pdName}</h3>
              <p className="price">{product.pdPrice} VND</p>
            </li>
          ))}
        </ul>

        {/* Modal Chi Tiết Sản Phẩm */}
        {isModalOpen && selectedProduct && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>{selectedProduct.pdName}</h2>
              <p>Giá gốc: {selectedProduct.pdPrice} VND</p>

              <label>Kích thước:</label>
              <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                <option value="S">S</option>
                <option value="M">M (+3000 VND)</option>
                <option value="L">L (+5000 VND)</option>
              </select>

              <div className="quantity-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <p>
                Tổng tiền: {(selectedProduct.pdPrice + (selectedSize === 'M' ? 3000 : selectedSize === 'L' ? 5000 : 0)) * quantity}{' '}
                VND
              </p>

              <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
              <button onClick={handleCloseModal}>Đóng</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableDetail;
