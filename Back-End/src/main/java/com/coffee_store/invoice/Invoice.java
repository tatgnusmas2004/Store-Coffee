package com.coffee_store.invoice;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Invoice {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String invoTbName;
	private LocalDateTime invoDateCreate;
	private Double invoTotalPrice;
	private String transactionId; // Mã giao dịch từ VNPay
	private String bankCode; // Mã ngân hàng thanh toán
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
	private List<InvoiceItem> invoItems;

	public String getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	public String getBankCode() {
		return bankCode;
	}

	public void setBankCode(String bankCode) {
		this.bankCode = bankCode;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getInvoTbName() {
		return invoTbName;
	}

	public void setInvoTbName(String invoTbName) {
		this.invoTbName = invoTbName;
	}

	public List<InvoiceItem> getInvoItems() {
		return invoItems;
	}

	public void setInvoItems(List<InvoiceItem> invoItems) {
		this.invoItems = invoItems;
	}

	public LocalDateTime getInvoDateCreate() {
		return invoDateCreate;
	}

	public void setInvoDateCreate(LocalDateTime invoDateCreate) {
		this.invoDateCreate = invoDateCreate;
	}

	public Double getInvoTotalPrice() {
		return invoTotalPrice;
	}

	public void setInvoTotalPrice(Double invoTotalPrice) {
		this.invoTotalPrice = invoTotalPrice;
	}

}
