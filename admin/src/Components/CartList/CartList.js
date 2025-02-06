import React from 'react';
import { Datagrid, DeleteButton, EditButton, ImageField, List, NumberField, TextField } from 'react-admin';
import './css/CartList.css';
const CartList = () => {
  return (
    <List>
      <Datagrid rowClick="edit" sx={{ '& .RaDatagrid-headerCell, & .RaDatagrid-cell': { textAlign: 'center' } }} >
        <TextField source="productName" label="Tên món" className='productName' />
        <ImageField source="imgURL" label="Ảnh" className='imgURL' />
        <NumberField source="price" label="Giá món" className='price' />
        <TextField source="size" label="Kích thước" className='size' />
        <TextField source="quantity" label="Số lượng" className='quantity' />
        <TextField source="tbName" label="Tên bàn" className='tbName' />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List >
  );
};

export default CartList;