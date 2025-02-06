package com.coffee_store.tableList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TableListRepository extends JpaRepository<TableList, Long> {

}
