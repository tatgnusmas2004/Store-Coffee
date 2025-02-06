import React from 'react';
import { Datagrid, DeleteButton, EditButton, List, TextField } from 'react-admin';

const ReservationList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source='rsId' label='ID' />s
        <TextField source='rsTableName' label='Table name' />
        <TextField source='rsTime' label='Time' />
        <TextField source='rsCode' label='Code' />
        <TextField source='rsEmail' label='Email' />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default ReservationList;