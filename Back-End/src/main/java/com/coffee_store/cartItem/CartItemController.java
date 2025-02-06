package com.coffee_store.cartItem;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/carts")

public class CartItemController {
	@Autowired
	private CartItemService cartService;

	@PostMapping("/add")
	public ResponseEntity<CartItem> addCartItem(@RequestBody CartItem cartItem) {
		CartItem savedItem = cartService.addCartItem(cartItem);
		return ResponseEntity.ok(savedItem);
	}

	@DeleteMapping("/remove/{id}")
	public ResponseEntity<String> removeItem(@PathVariable Long id) {
		// Logic để xóa item khỏi cơ sở dữ liệu hoặc danh sách giỏ hàng
		boolean itemRemoved = cartService.removeItemById(id);

		if (itemRemoved) {
			return ResponseEntity.ok("Item removed successfully");
		} else {
			return ResponseEntity.status(404).body("Item not found");
		}
	}

	@DeleteMapping("/{id}")
	public void deleteCartItems(@PathVariable Long id) {
		cartService.deleteCartItems(id);
	}

	@GetMapping
	public List<CartItem> getAllCartItems() {
		return cartService.getAllCartItems();
	}

	@GetMapping("/table")
	public List<CartItem> getCartItemsByTable(@RequestParam String tbName) {
		return cartService.getCartItemsByTable(tbName);
	}

	@GetMapping("/page")
	public Page<CartItem> getAllCartItems(@RequestParam int page, @RequestParam int size) {
		return cartService.getAllCartItems(PageRequest.of(page, size));
	}

	@GetMapping("/{id}")
	public CartItem getCartItemsById(@PathVariable Long id) {
		return cartService.getCartItemsById(id);
	}

	@PostMapping
	public CartItem createCartItems(@RequestBody CartItem cartItem) {
		return cartService.saveCartItems(cartItem);
	}

	@PutMapping("/{id}")
	public CartItem updateCartItems(@PathVariable Long id, @RequestBody CartItem cartItem) {
		return cartService.updateCartItems(id, cartItem);
	}

	@PutMapping("/update-quantity/{id}")
	public ResponseEntity<String> updateQuantity(@PathVariable Long id, @RequestParam int quantity) {
		if (quantity <= 0) {
			boolean removed = cartService.removeItemById(id);
			if (removed) {
				return ResponseEntity.ok("Item removed successfully");
			} else {
				return ResponseEntity.status(404).body("Item not found");
			}
		} else {
			CartItem updatedItem = cartService.updateQuantity(id, quantity);
			if (updatedItem != null) {
				return ResponseEntity.ok("Quantity updated successfully");
			} else {
				return ResponseEntity.status(404).body("Item not found");
			}
		}
	}

//	================================
	@DeleteMapping("/clear/{tbName}")
	public ResponseEntity<String> clearCartItemsByTable(@PathVariable String tbName) {
		boolean isCleared = cartService.clearCartItemsByTable(tbName);

		if (isCleared) {
			return ResponseEntity.ok("Cart items cleared successfully");
		} else {
			return ResponseEntity.status(404).body("No cart items found for this table");
		}
	}
}