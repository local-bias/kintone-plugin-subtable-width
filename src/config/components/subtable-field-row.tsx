import React, { memo, VFCX } from 'react';
import styled from '@emotion/styled';
import { MenuItem, Slider, TextField, Typography, Button, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import { FieldsContainer, StorageContainer } from '../contexts';

type Props = {
  target: string;
  index: number;
};

const Component: VFCX<Props> = memo(({ className, target, index }) => {
  const { fields } = FieldsContainer.useContainer();
  const { storage, updateWidth, updateCode, addField, removeField } = StorageContainer.useContainer();

  const condition = storage.conditions[index];

  const subFields = (fields[target] as any)?.fields || {};

  return (
    <div className={className}>
      {condition.fields.map((field, fieldIndex) => (
        <div className='item' key={`${field}_${fieldIndex}`}>
          <TextField
            select
            value={field.code}
            size='small'
            label='サブテーブルの項目'
            style={{ minWidth: '200px', marginRight: '16px' }}
            onChange={(e) => updateCode(index, fieldIndex, e.target.value)}
          >
            {Object.keys(subFields).map((subFieldKey) => (
              <MenuItem key={subFieldKey} value={subFields[subFieldKey].code}>
                {subFields[subFieldKey].label}
              </MenuItem>
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
              onChange={(_, value) => updateWidth(index, fieldIndex, value)}
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
});

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
