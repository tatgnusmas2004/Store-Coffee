package com.coffee_store.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

	Page<Product> findByPdNameContainingIgnoreCase(String pdName, Pageable pageable);

	Page<Product> findByPdType(String pdType, Pageable pageable);

	Page<Product> findByPdNameContainingIgnoreCaseAndPdType(String pdName, String pdType, Pageable pageable);

}
