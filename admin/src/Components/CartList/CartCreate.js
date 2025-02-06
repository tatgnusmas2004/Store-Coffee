import React from 'react';
import { Create, NumberInput, SelectInput, SimpleForm, TextInput } from 'react-admin';

const CartCreate = () => {
  const sizeChoices = [
    { name: "S" },
    { name: "M" },
    { name: "L" },
  ];
  return (
    <Create>
      <SimpleForm>
        <TextInput source="productName" label="Tên món" />
        <TextInput source="imgURL" label="Ảnh" />
        <NumberInput source="price" label="Giá món" />
        <TextInput source="description" label="Mô tả" />
        <TextInput source="size" label="Kích thước" />
        <SelectInput source="quantity" label="Số lượng" choices={sizeChoices} />
        <SelectInput source="tbName" label="Tên bàn" />
      </SimpleForm>
    </Create>
  );
};

export default CartCreate;