import React, { VFCX, useCallback } from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { useSnackbar } from 'notistack';

import { StorageContainer } from '../contexts';

const Component: VFCX = ({ className }) => {
  const { save } = StorageContainer.useContainer();
  const { enqueueSnackbar } = useSnackbar();

  const historyBack = useCallback(() => history.back(), []);

  const onClickSave = useCallback(() => {
    save();
    enqueueSnackbar('設定を保存しました', {
      variant: 'success',
    });
  }, []);

  return (
    <div className={className}>
      <Button variant='contained' color='primary' onClick={onClickSave} startIcon={<SaveIcon />}>
        設定を保存
      </Button>
      <Button variant='contained' onClick={historyBack} startIcon={<SettingsBackupRestoreIcon />}>
        プラグイン一覧へ戻る
      </Button>
    </div>
  );
};

const StyledComponent = styled(Component)`
  position: sticky;
  bottom: 24px;
  margin-top: 20px;
  background-color: inherit;
  border-top: 1px solid #eee;

  button {
    margin: 8px;
  }
`;

export default StyledComponent;
