package com.coffee_store.tableList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TableListService {
	@Autowired
	TableListRepository tableListRepository;

	public List<TableList> getAllTables() {
		return tableListRepository.findAll();
	}

//	Hàm dùng để phân trang
	public Page<TableList> getAllTables(Pageable pageable) {
		return tableListRepository.findAll(pageable);
	}

	public TableList getTableById(Long tbId) {
		return tableListRepository.findById(tbId).orElse(null);
	}

	public TableList saveTable(TableList table) {
		return tableListRepository.save(table);
	}

	public TableList updateTable(Long tbId, TableList table) {
		table.setTbId(tbId);
		return tableListRepository.save(table);
	}

	public void deleteTable(Long tbId) {
		tableListRepository.deleteById(tbId);
	}

}
