package com.coffee_store.product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepository;

	public Page<Product> getAllProducts(Pageable pageable) {
		return productRepository.findAll(pageable);
	}

	public Product getProductById(Long pdId) {
		return productRepository.findById(pdId).orElseThrow(() -> new RuntimeException("Product not found"));
	}

	public Product createProduct(Product product) {
		return productRepository.save(product);
	}

	public Product updateProduct(Long pdId, Product product) {
		product.setPdId(pdId);
		return productRepository.save(product);
	}

	public void deleteProduct(Long pdId) {
		productRepository.deleteById(pdId);
	}

	public Page<Product> findProductsByPdName(String pdName, Pageable pageable) {
		return productRepository.findByPdNameContainingIgnoreCase(pdName, pageable);
	}

	public Page<Product> filterProducts(String pdName, String pdType, Pageable pageable) {
		if (pdName != null && pdType != null) {
			return productRepository.findByPdNameContainingIgnoreCaseAndPdType(pdName, pdType, pageable);
		} else if (pdName != null) {
			return productRepository.findByPdNameContainingIgnoreCase(pdName, pageable);
		} else if (pdType != null) {
			return productRepository.findByPdType(pdType, pageable);
		}
		return productRepository.findAll(pageable);
	}

	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}
}
