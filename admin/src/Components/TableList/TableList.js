import React from 'react';
import { List, Datagrid, TextField, NumberField, EditButton, DeleteButton, Pagination, FunctionField } from 'react-admin';

const TableList = () => {
  const renderState = (record) => {
    switch (record.tbState) {
      case 1:
        return "Bàn trống";
      case 2:
        return "Bàn đã được đặt chỗ";
      case 3:
        return "Bàn đã có người";
      case 4:
        return "Bàn bị hỏng";
      default:
        return "Không xác định";
    }
  };

  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="tbId" label="ID" />
        <TextField source="tbName" label='Tên Bàn' />
        <NumberField source="numSeat" label="Số Ghế" />
        <FunctionField label="Trạng Thái" render={renderState} />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
}
export default TableList;
