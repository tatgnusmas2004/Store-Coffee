package com.coffee_store.tableList;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tables")
public class TableController {
	@Autowired
	TableListService tableListService;

	@PatchMapping("/{id}")
	public ResponseEntity<TableList> updateTableState(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
		TableList table = tableListService.getTableById(id);
		if (table == null) {
			return ResponseEntity.notFound().build();
		}
		if (updates.containsKey("tbState")) {
			table.setTbState((int) updates.get("tbState"));
		}
		TableList updatedTable = tableListService.saveTable(table);
		return ResponseEntity.ok(updatedTable);
	}

	@GetMapping("/page")
	public Page<TableList> getAllTables(@RequestParam int page, @RequestParam int size) {
		return tableListService.getAllTables(PageRequest.of(page, size));
	}

	@GetMapping
	public List<TableList> getAllTables() {
		return tableListService.getAllTables();
	}

	@PostMapping
	public TableList createTableList(@RequestBody TableList tableList) {
		return tableListService.saveTable(tableList);
	}

	@PutMapping("/{tbId}")
	public TableList updateTable(@PathVariable Long tbId, @RequestBody TableList tableList) {
		return tableListService.updateTable(tbId, tableList);
	}

	@DeleteMapping("/{tbId}")
	public void deleteTable(@PathVariable Long tbId) {
		tableListService.deleteTable(tbId);
	}

	@GetMapping("/{tbId}")
	public TableList getTableById(@PathVariable Long tbId) {
		return tableListService.getTableById(tbId);
	}

	@PatchMapping("/{tbId}/position")
	public ResponseEntity<TableList> updateTablePosition(@PathVariable Long tbId, @RequestBody TableList tableList) {
		try {
			// Tìm bàn theo tbId
			TableList table = tableListService.getTableById(tbId);
			if (table == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			}

			// Cập nhật tọa độ
			table.setX(tableList.getX());
			table.setY(tableList.getY());

			// Lưu lại thay đổi
			tableListService.saveTable(table);

			return ResponseEntity.ok(table);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
}
