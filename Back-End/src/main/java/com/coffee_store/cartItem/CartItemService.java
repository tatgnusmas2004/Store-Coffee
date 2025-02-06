package com.coffee_store.cartItem;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class CartItemService {
	@Autowired
	private CartItemRepository cartItemRepository;

	public CartItem addCartItem(CartItem cartItem) {
		return cartItemRepository.save(cartItem);
	}

	public List<CartItem> getAllCartItems() {
		return cartItemRepository.findAll();
	}

	public boolean removeItemById(Long id) {
		Optional<CartItem> item = cartItemRepository.findById(id);
		if (item.isPresent()) {
			cartItemRepository.deleteById(id);
			return true;
		} else {
			return false;
		}
	}

	public List<CartItem> getCartItemsByTable(String tbName) {
		return cartItemRepository.findByTbName(tbName);
	}

	// CRUD
	public Page<CartItem> getAllCartItems(PageRequest pageable) {
		return cartItemRepository.findAll(pageable);
	}

	public CartItem saveCartItems(CartItem cartItem) {
		return cartItemRepository.save(cartItem);
	}

	public CartItem updateCartItems(Long id, CartItem cartItem) {
		cartItem.setId(id);
		return cartItemRepository.save(cartItem);
	}

	public void deleteCartItems(Long id) {
		cartItemRepository.deleteById(id);
	}

	public CartItem getCartItemsById(Long id) {
		return cartItemRepository.findById(id).orElse(null);
	}

	public CartItem updateQuantity(Long id, int quantity) {
		Optional<CartItem> optionalItem = cartItemRepository.findById(id);
		if (optionalItem.isPresent()) {
			CartItem item = optionalItem.get();
			item.setQuantity(quantity);
			return cartItemRepository.save(item);
		} else {
			return null;
		}
	}

//===================================
	public boolean clearCartItemsByTable(String tbName) {
		List<CartItem> cartItems = cartItemRepository.findByTbName(tbName);
		if (!cartItems.isEmpty()) {
			cartItemRepository.deleteAll(cartItems);
			return true;
		}
		return false;
	}
}