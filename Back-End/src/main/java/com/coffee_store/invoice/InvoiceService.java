package com.coffee_store.invoice;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class InvoiceService {
	@Autowired
	InvoiceRepository invoiceRepository;

	public void saveInvoice(Invoice invoice) {
		invoiceRepository.save(invoice);
	}

	public Page<Invoice> getAllInvoices(Pageable pageable) {
		return invoiceRepository.findAll(pageable);
	}

	public Optional<Invoice> getInvoiceById(Long id) {
		return invoiceRepository.findById(id);
	}

	public void deleteInvoice(Long id) {
		invoiceRepository.deleteById(id);
	}

	public Invoice createInvoice(Invoice invoice) {
		return invoiceRepository.save(invoice);
	}

	public Invoice updateInvoice(Long id, Invoice invoice) {
		invoice.setId(id);
		return invoiceRepository.save(invoice);
	}
}
