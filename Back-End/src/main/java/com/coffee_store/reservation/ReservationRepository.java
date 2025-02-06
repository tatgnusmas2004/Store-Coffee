package com.coffee_store.reservation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
	Reservation findByRsEmailAndRsCodeAndRsTableName(String rsEmail, String rsCode, String rsTableName);

	Reservation findByRsEmailAndRsCode(String email, String code);
}
