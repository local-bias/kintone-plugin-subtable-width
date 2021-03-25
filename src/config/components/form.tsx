import React, { VFCX } from 'react';
import styled from '@emotion/styled';
import { CircularProgress, Backdrop, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { FieldsContainer, StorageContainer } from '../contexts';
import FormRow from './form-row';

const Component: VFCX = ({ className }) => {
  const { fields } = FieldsContainer.useContainer();
  const { storage, addCondition } = StorageContainer.useContainer();

  return (
    <>
      <div className={className}>
        {storage.conditions.map((condition, index) => (
          <FormRow key={index} condition={condition} index={index} />
        ))}
        <Button
          variant='outlined'
          color='primary'
          size='small'
          startIcon={<AddIcon />}
          onClick={addCondition}
          style={{ marginTop: '16px' }}
        >
          サブテーブルを追加する
        </Button>
      </div>
      <Backdrop open={!Object.keys(fields).length} style={{ zIndex: 1000 }}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
};

const StyledComponent = styled(Component)``;

export default StyledComponent;
