package com.coffee_store.invoice;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/invoices")
public class InvoiceController {
	@Autowired
	private InvoiceService invoiceService;

	@PostMapping("/create")
	public ResponseEntity<String> createInvoice(@RequestBody Invoice invoice) {
		invoice.setInvoDateCreate(LocalDateTime.now());
		invoiceService.createInvoice(invoice);
		return ResponseEntity.ok("Hóa đơn được lưu thành công!");
	}

	@GetMapping("/page")
	public ResponseEntity<Page<Invoice>> getAllInvoices(Pageable pageable) {
		return ResponseEntity.ok(invoiceService.getAllInvoices(pageable));
	}

	@GetMapping("/{id}")
	public ResponseEntity<Invoice> getInvoiceById(@PathVariable Long id) {
		Optional<Invoice> invoice = invoiceService.getInvoiceById(id);
		return invoice.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PutMapping("/{id}")
	public ResponseEntity<Invoice> updateInvoice(@PathVariable Long id, @RequestBody Invoice invoiceDetails) {
		Optional<Invoice> optionalInvoice = invoiceService.getInvoiceById(id);
		if (optionalInvoice.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		Invoice invoice = optionalInvoice.get();
		invoice.setInvoTbName(invoiceDetails.getInvoTbName());
		invoice.setInvoTotalPrice(invoiceDetails.getInvoTotalPrice());
		invoice.setInvoItems(invoiceDetails.getInvoItems());
		Invoice updatedInvoice = invoiceService.updateInvoice(id, invoice);
		return ResponseEntity.ok(updatedInvoice);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteInvoice(@PathVariable Long id) {
		invoiceService.deleteInvoice(id);
		return ResponseEntity.noContent().build();
	}
}
