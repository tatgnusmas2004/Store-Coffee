package com.coffee_store.product;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
@RequestMapping("api/products")
public class ProductController {
	@Autowired
	private ProductService productService;

	@GetMapping("/search")
	public Page<Product> searchProductsByPdName(@RequestParam String pdName, @RequestParam int page,
			@RequestParam int size) {
		return productService.findProductsByPdName(pdName, PageRequest.of(page, size));
	}

	@GetMapping("/page")
	public Page<Product> getAllProduct(@RequestParam int page, @RequestParam int size) {
		return productService.getAllProducts(PageRequest.of(page, size));
	}

	@GetMapping
	public List<Product> getAllProduct() {
		return productService.getAllProducts();
	}

	@PostMapping
	public Product createProduct(@RequestBody Product product) {
		return productService.createProduct(product);
	}

	@PutMapping("/{pdId}")
	public Product updateProduct(@PathVariable Long pdId, @RequestBody Product product) {
		return productService.updateProduct(pdId, product);
	}

	@DeleteMapping("/{pdId}")
	public void deleteProduct(@PathVariable Long pdId) {
		productService.deleteProduct(pdId);
	}

	@GetMapping("/{pdId}")
	public Product getProductById(@PathVariable Long pdId) {
		return productService.getProductById(pdId);
	}

	@GetMapping("/filter")
	public Page<Product> filterProducts(@RequestParam(required = false) String pdName,
			@RequestParam(required = false) String pdType, @RequestParam int page, @RequestParam int size) {
		return productService.filterProducts(pdName, pdType, PageRequest.of(page, size));
	}

//	@GetMapping("/group-by-type")
//	public Map<String, List<Product>> getProductsGroupedByType(@RequestParam int page, @RequestParam int size) {
//		return productService.getProductsGroupedByType(PageRequest.of(page, size));
//	}
	@GetMapping("/group-by-type")
	public Map<String, List<Product>> getProductsGroupedByType() {
		List<Product> products = productService.getAllProducts();
		return products.stream().collect(Collectors.groupingBy(Product::getPdType));
	}
}
