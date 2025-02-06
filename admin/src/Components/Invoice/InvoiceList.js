// src/Components/Invoice/InvoiceList.js
import React from 'react';
import { List, Datagrid, TextField, DateField, NumberField, DeleteButton, EditButton } from 'react-admin';

const InvoiceList = () => (
  <List>
    <Datagrid>
      {/* <TextField source="invoTbName" label="Tên bàn" /> */}
      <TextField source="bankCode" label="Tên ngân hàng" />
      <TextField source="transactionId" label="Mã giao dịch" />
      <DateField source="invoDateCreate" label="Ngày Tạo" />
      <NumberField source="invoTotalPrice" label="Tổng Giá" />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default InvoiceList;