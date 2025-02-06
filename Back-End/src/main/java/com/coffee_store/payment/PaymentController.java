package com.coffee_store.payment;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.coffee_store.invoice.Invoice;
import com.coffee_store.invoice.InvoiceService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("api/payment")
public class PaymentController {
	private final PaymentService paymentService;
	private final InvoiceService invoiceService;

	public PaymentController(PaymentService paymentService, InvoiceService invoiceService) {
		this.paymentService = paymentService;
		this.invoiceService = invoiceService;
	}

	// Dành cho @RestController
	@GetMapping("/vn-pay")
	public ResponseObject<PaymentDTO.VNPayResponse> pay(HttpServletRequest request) {
		return new ResponseObject<>(HttpStatus.OK, "Success", paymentService.createVnPayPayment(request));
	}

	@GetMapping("/vn-pay-callback")
	public String payCallbackHandler(HttpServletRequest request, Model model) {
		String status = request.getParameter("vnp_ResponseCode");
		if ("00".equals(status)) {
			// Payment successful
			String transactionId = request.getParameter("vnp_TransactionNo");
			String bankCode = request.getParameter("vnp_BankCode");
			String amount = request.getParameter("vnp_Amount");
			String transactionDate = request.getParameter("vnp_PayDate");

			// Format transaction info
			double formattedAmount = Double.parseDouble(amount) / 100;
			String formattedDate = transactionDate.substring(0, 4) + "-" + transactionDate.substring(4, 6) + "-"
					+ transactionDate.substring(6, 8) + " " + transactionDate.substring(8, 10) + ":"
					+ transactionDate.substring(10, 12) + ":" + transactionDate.substring(12);
// 			======================================
			// Tạo hóa đơn
			Invoice invoice = new Invoice();
			invoice.setTransactionId(transactionId);
			invoice.setBankCode(bankCode);
			invoice.setInvoTotalPrice(formattedAmount);
			invoice.setInvoDateCreate(LocalDateTime.now());

			invoiceService.saveInvoice(invoice);
//			======================================
			// Add to model
			model.addAttribute("transactionId", transactionId);
			model.addAttribute("bankCode", bankCode);
			model.addAttribute("formattedDate", formattedDate);
			model.addAttribute("formattedAmount", formattedAmount);

			return "success";
		} else {
			return "failure";
		}
	}
}