package com.coffee_store.reservation;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Reservation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long rsId;
	private String rsTableName;

	@JsonFormat(pattern = "HH:mm:ss d/M/yyyy")
	private LocalDateTime rsTime;
	private String rsCode;
	private String rsEmail;

	public Long getRsId() {
		return rsId;
	}

	public void setRsId(Long rsId) {
		this.rsId = rsId;
	}

	public String getRsTableName() {
		return rsTableName;
	}

	public void setRsTableName(String rsTableName) {
		this.rsTableName = rsTableName;
	}

	public LocalDateTime getRsTime() {
		return rsTime;
	}

	public void setRsTime(LocalDateTime rsTime) {
		this.rsTime = rsTime;
	}

	public String getRsCode() {
		return rsCode;
	}

	public void setRsCode(String rsCode) {
		this.rsCode = rsCode;
	}

	public String getRsEmail() {
		return rsEmail;
	}

	public void setRsEmail(String rsEmail) {
		this.rsEmail = rsEmail;
	}

}
