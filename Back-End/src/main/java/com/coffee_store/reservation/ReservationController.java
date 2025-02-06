package com.coffee_store.reservation;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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
@RequestMapping("/api/reservations")
public class ReservationController {

	@Autowired
	private ReservationRepository reservationRepository;

	@Autowired
	private ReservationService reservationService;

	@Autowired
	private JavaMailSender mailSender;

//	Đặt bàn Mobile
	@PostMapping("/sendEmail")
	public ResponseEntity<Reservation> sendEmail(@RequestBody Reservation reservation) {
//		Lưu vào CSDL
		Reservation savedReservation = createReservation(reservation);

		// Định dạng thời gian
//		reservation.setRsTime(LocalDateTime.now());
		String formattedTime = formatReservationTime(reservation.getRsTime());

		// Gửi email
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(reservation.getRsEmail());
		message.setSubject("Cảm ơn bạn đã xác nhận đặt bàn");
		message.setText("Thời gian đặt bàn của bạn là: " + formattedTime + "\n " + "Số bàn mà bạn đã đặt là: "
				+ reservation.getRsTableName() + "\n " + "Mã đặt bàn của bạn là: " + reservation.getRsCode());

		mailSender.send(message);
		return ResponseEntity.ok(savedReservation);
	}

//	hàm định dạng thời gian 
	private String formatReservationTime(LocalDateTime rsTime) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss, dd/MM/yyyy");
		return rsTime.format(formatter);
	}

//	phương thức kiểm tra email và mã có hợp lệ hay không để vào bàn
	@PostMapping("/auth")
	public ResponseEntity<?> authenticateReservation(@RequestBody Map<String, String> payload) {
		String email = payload.get("rsEmail");
		String code = payload.get("rsCode");
		String tableName = payload.get("rsTableName");

		Reservation reservation = reservationRepository.findByRsEmailAndRsCodeAndRsTableName(email, code, tableName);
		if (reservation != null) {
			return ResponseEntity.ok(Collections.singletonMap("success", true));
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("success", false));
	}

	// Phương thức xoá đơn đặt bàn khi đã vào bàn
	@DeleteMapping("/delete")
	public ResponseEntity<String> deleteReservation(@RequestBody Map<String, String> payload) {
		String email = payload.get("rsEmail");
		String code = payload.get("rsCode");

		Reservation reservation = reservationRepository.findByRsEmailAndRsCode(email, code);
		if (reservation != null) {
			reservationRepository.delete(reservation);
			return ResponseEntity.ok("Đã xóa đơn đặt bàn thành công.");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy đơn đặt bàn.");
		}
	}

//	Hàm lấy ra danh sách được phân trang
	@GetMapping("/page")
	public Page<Reservation> getAllReservations(@RequestParam int page, @RequestParam int size) {
		return reservationService.getAllReservations(PageRequest.of(page, size));
	}

	@GetMapping
	public List<Reservation> getAllReservations() {
		return reservationService.getAllReservations();
	}

//	Quản lý đặt bàn
	@PostMapping("/create")
	public Reservation createReservation(@RequestBody Reservation reservation) {
		return reservationService.createReservation(reservation);
	}

	@PutMapping("/{rsId}")
	public Reservation updateReservation(@PathVariable Long rsId, @RequestBody Reservation reservation) {
		return reservationService.updateReservation(rsId, reservation);
	}

	@DeleteMapping("/{rsId}")
	public void deleteReservation(@PathVariable Long rsId) {
		reservationService.deleteReservation(rsId);
	}

	@GetMapping("/{rsId}")
	public Reservation getReservationById(@PathVariable Long rsId) {
		return reservationService.getReservationById(rsId);
	}

}