import { Autocomplete, IconButton, Skeleton, TextField, Tooltip } from '@mui/material';
import React, { FC, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { produce } from 'immer';

import { fieldsState, targetSubtablePropertyState } from '../../../states/plugin';

const Component: FC = () => {
  const fields = useRecoilValue(fieldsState);
  const property = useRecoilValue(targetSubtablePropertyState);

  if (!property) {
    return null;
  }

  const onFieldCodeChange = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number, value: string) => {
        set(fieldsState, (current) =>
          produce(current, (draft) => {
            draft[rowIndex].code = value;
          })
        );
      },
    []
  );

  const addField = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number) => {
        set(fieldsState, (current) =>
          produce(current, (draft) => {
            draft.splice(rowIndex + 1, 0, '');
          })
        );
      },
    []
  );

  const removeField = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number) => {
        set(fieldsState, (current) =>
          produce(current, (draft) => {
            draft.splice(rowIndex, 1);
          })
        );
      },
    []
  );

  return (
    <div className='flex flex-col gap-4'>
      {fields.map((field, i) => (
        <div key={i} className='flex items-center gap-2'>
          <Autocomplete
            value={field.code}
            sx={{ width: '350px' }}
            options={Object.values(property.fields).map((f) => f.code)}
            isOptionEqualToValue={(option, v) => option === v}
            getOptionLabel={(option) => `${option}`}
            onChange={(_, field) => onFieldCodeChange(i, field ?? '')}
            renderInput={(params) => (
              <TextField
                {...params}
                label='対象フィールドコード'
                variant='outlined'
                color='primary'
              />
            )}
          />
          <Tooltip title='フィールドを追加する'>
            <IconButton size='small' onClick={() => addField(i)}>
              <AddIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          {fields.length > 1 && (
            <Tooltip title='このフィールドを削除する'>
              <IconButton size='small' onClick={() => removeField(i)}>
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          )}
        </div>
      ))}
    </div>
  );
};

const Placeholder: FC = () => (
  <div className='flex flex-col gap-4'>
    {new Array(3).fill('').map((_, i) => (
      <div key={i} className='flex items-center gap-2'>
        <Skeleton variant='rounded' width={360} height={56} />
        <Skeleton variant='circular' width={24} height={24} />
        <Skeleton variant='circular' width={24} height={24} />
      </div>
    ))}
  </div>
);

const Container: FC = () => {
  return (
    <Suspense fallback={<Placeholder />}>
      <Component />
    </Suspense>
  );
};

export default memo(Container);
