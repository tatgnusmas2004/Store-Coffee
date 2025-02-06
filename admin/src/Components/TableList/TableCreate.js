import React from 'react';
import { Create, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin';

const TableCreate = () => {
  const stateChoices = [
    { id: 1, name: "Bàn trống" },
    { id: 2, name: "Bàn đã được đặt chỗ" },
    { id: 3, name: "Bàn đã có người" },
    { id: 4, name: "Bàn bị hỏng" },
  ];
  return (
    <Create>
      <SimpleForm>
        <TextInput source="tbName" label="Tên Bàn" />
        <NumberInput source="numSeat" label="Số Ghế" />
        <SelectInput source="tbState" label="Trạng Thái" choices={stateChoices} />
      </SimpleForm>
    </Create>
  );
}

export default TableCreate;
