package com.coffee_store.invoice;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class InvoiceItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long invoItemId;
	private String invoPdName;
	private String invoPdSize;
	private Double invoPdPrice;
	private Integer invoQuantity;

	public Long getInvoItemId() {
		return invoItemId;
	}

	public void setInvoItemId(Long invoItemId) {
		this.invoItemId = invoItemId;
	}

	public String getInvoPdName() {
		return invoPdName;
	}

	public void setInvoPdName(String invoPdName) {
		this.invoPdName = invoPdName;
	}

	public String getInvoPdSize() {
		return invoPdSize;
	}

	public void setInvoPdSize(String invoPdSize) {
		this.invoPdSize = invoPdSize;
	}

	public Double getInvoPdPrice() {
		return invoPdPrice;
	}

	public void setInvoPdPrice(Double invoPdPrice) {
		this.invoPdPrice = invoPdPrice;
	}

	public Integer getInvoQuantity() {
		return invoQuantity;
	}

	public void setInvoQuantity(Integer invoQuantity) {
		this.invoQuantity = invoQuantity;
	}
}