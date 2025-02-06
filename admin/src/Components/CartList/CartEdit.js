import React from 'react';
import { Edit, NumberInput, SelectInput, SimpleForm, TextInput } from 'react-admin';

const CartEdit = () => {
  const sizeChoices = [
    { id: "S", name: "S" },
    { id: "M", name: "M" },
    { id: "L", name: "L" },
  ];
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="productName" label="Tên món" />
        <TextInput source="imgURL" label="Ảnh" />
        <NumberInput source="price" label="Giá món" />
        <TextInput source="description" label="Mô tả" />
        <SelectInput source="size" label="Kích thước" choices={sizeChoices} />
        <NumberInput source="quantity" label="Số lượng" />
        <TextInput source="tbName" label="Tên bàn" />
      </SimpleForm>
    </Edit>
  );
};

export default CartEdit;