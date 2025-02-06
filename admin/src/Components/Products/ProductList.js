import React from 'react';
import { List, Datagrid, TextField, TextInput, NumberField, EditButton, DeleteButton, ImageField, Filter } from 'react-admin';

// Bộ lọc tìm kiếm và loại
const ProductFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Tìm theo tên" source="pdName" alwaysOn />
    <TextInput label="Lọc theo loại" source="pdType" alwaysOn />
  </Filter>
);

const ProductList = () => (
  <List filters={<ProductFilter />} perPage={10}>
    <Datagrid rowClick="edit">
      <TextField source="pdId" label="ID" />
      <ImageField source='pdImgURL' label='Ảnh' />
      <TextField source="pdName" label="Tên" />
      <NumberField source="pdPrice" label='Giá' />
      <TextField source="pdType" label="Loại" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default ProductList;
