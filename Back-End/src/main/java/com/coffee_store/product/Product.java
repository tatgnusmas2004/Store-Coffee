package com.coffee_store.product;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long pdId;
	private String pdName;
	private String pdImgURL;
	private Double pdPrice;

	@Column(columnDefinition = "LONGTEXT")
	private String pdDescription;
	private String pdType;
	private String pdSize;

	public Long getPdId() {
		return pdId;
	}

	public void setPdId(Long pdId) {
		this.pdId = pdId;
	}

	public String getPdImgURL() {
		return pdImgURL;
	}

	public void setPdImgURL(String pdImgURL) {
		this.pdImgURL = pdImgURL;
	}

	public String getPdName() {
		return pdName;
	}

	public void setPdName(String pdName) {
		this.pdName = pdName;
	}

	public Double getPdPrice() {
		return pdPrice;
	}

	public void setPdPrice(Double pdPrice) {
		this.pdPrice = pdPrice;
	}

	public String getPdDescription() {
		return pdDescription;
	}

	public void setPdDescription(String pdDescription) {
		this.pdDescription = pdDescription;
	}

	public String getPdType() {
		return pdType;
	}

	public void setPdType(String pdType) {
		this.pdType = pdType;
	}

	public String getPdSize() {
		return pdSize;
	}

	public void setPdSize(String pdSize) {
		this.pdSize = pdSize;
	}

}
