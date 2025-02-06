package com.coffee_store.tableList;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tableList")
public class TableList {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long tbId;
	private int tbState;
	private String tbName;
	private int numSeat;

	private double x; // Vị trí theo trục X
	private double y; // Vị trí theo trục Y

	public double getX() {
		return x;
	}

	public void setX(double x) {
		this.x = x;
	}

	public double getY() {
		return y;
	}

	public void setY(double y) {
		this.y = y;
	}

	public Long getTbId() {
		return tbId;
	}

	public void setTbId(Long tbId) {
		this.tbId = tbId;
	}

	public int getTbState() {
		return tbState;
	}

	public void setTbState(int tbState) {
		this.tbState = tbState;
	}

	public String getTbName() {
		return tbName;
	}

	public void setTbName(String tbName) {
		this.tbName = tbName;
	}

	public int getNumSeat() {
		return numSeat;
	}

	public void setNumSeat(int numSeat) {
		this.numSeat = numSeat;
	}

}
