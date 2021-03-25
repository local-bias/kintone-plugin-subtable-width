import React, { useState, VFCX } from 'react';
import styled from '@emotion/styled';
import { MenuItem, Slider, TextField, Typography, Button, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import { FieldsContainer, StorageContainer } from '../contexts';

type Props = {
  target: string;
  index: number;
};

const Component: VFCX<Props> = ({ className, target, index }) => {
  const { fields } = FieldsContainer.useContainer();
  const { storage, updateWidth, updateCode, addField, removeField } = StorageContainer.useContainer();

  const condition = storage.conditions[index];

  const subFields = (fields[target] as any)?.fields || {};

  const onChangeWidth = (fieldIndex: number, value: number | number[]) => {
    if (typeof value === 'number') {
      updateWidth(index, fieldIndex, value);
    } else {
      updateWidth(index, fieldIndex, value[0]);
    }
  };

  const onChangeCode = (fieldIndex: number, value: string) => updateCode(index, fieldIndex, value);

  return (
    <div className={className}>
      {condition.fields.map((field, fieldIndex) => (
        <div className='item'>
          <TextField
            select
            value={field.code}
            size='small'
            label='サブテーブルの項目'
            style={{ minWidth: '200px', marginRight: '16px' }}
            onChange={(e) => onChangeCode(fieldIndex, e.target.value)}
          >
            {Object.keys(subFields).map((subFieldKey) => (
              <MenuItem value={subFields[subFieldKey].code}>{subFields[subFieldKey].label}</MenuItem>
            ))}
          </TextField>
          <div>
            <Typography gutterBottom>フィールドの幅(0で非表示)</Typography>
            <Slider
              valueLabelDisplay='auto'
              step={1}
              min={0}
              max={1000}
              value={field.width}
              onChange={(e, value) => onChangeWidth(fieldIndex, value)}
            />
          </div>
          <IconButton onClick={() => removeField(index, fieldIndex)}>
            <DeleteIcon fontSize='small' />
          </IconButton>
        </div>
      ))}
      <Button variant='outlined' color='primary' size='small' startIcon={<AddIcon />} onClick={() => addField(index)}>
        行を追加する
      </Button>
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > .item {
    display: flex;
    align-items: flex-start;
  }
`;

export default StyledComponent;
