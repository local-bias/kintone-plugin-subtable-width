import React, { FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { TextField, Autocomplete } from '@mui/material';
import { kintoneAPI } from '@konomi-app/kintone-utilities';

import { subtableFieldsState } from '../../../states/kintone';
import { targetSubtableCodeState } from '@/config/states/plugin';

const Container: FC = () => {
  const fieldCode = useRecoilValue(targetSubtableCodeState);
  const fields = useRecoilValue(subtableFieldsState);
  const value = fields.find((field) => field.code === fieldCode) ?? null;

  const onFieldChange = useRecoilCallback(
    ({ set }) =>
      (_: any, field: kintoneAPI.FieldProperty | null) => {
        if (field) {
          set(targetSubtableCodeState, field.code);
        }
      },
    []
  );

  return (
    <Autocomplete
      value={value}
      sx={{ width: '350px' }}
      options={fields}
      isOptionEqualToValue={(option, v) => option.code === v.code}
      getOptionLabel={(option) => `${option.label}(${option.code})`}
      onChange={onFieldChange}
      renderInput={(params) => (
        <TextField {...params} label='対象サブテーブル' variant='outlined' color='primary' />
      )}
    />
  );
};

export default Container;
