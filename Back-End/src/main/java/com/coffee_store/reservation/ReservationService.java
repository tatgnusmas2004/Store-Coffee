package com.coffee_store.reservation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {
	@Autowired
	ReservationRepository reservationRepository;

	public List<Reservation> getAllReservations() {
		return reservationRepository.findAll();
	}

	public Page<Reservation> getAllReservations(Pageable pageable) {
		return reservationRepository.findAll(pageable);
	}

	public Reservation getReservationById(Long rsId) {
		return reservationRepository.findById(rsId).orElse(null);
	}

	public Reservation createReservation(Reservation reservation) {
		return reservationRepository.save(reservation);
	}

	public Reservation updateReservation(Long rsId, Reservation reservation) {
		reservation.setRsId(rsId);
		return reservationRepository.save(reservation);
	}

	public void deleteReservation(Long rsId) {
		reservationRepository.deleteById(rsId);
	}
}
