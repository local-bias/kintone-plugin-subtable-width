import React, { useCallback, VFCX } from 'react';
import styled from '@emotion/styled';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Divider,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { FieldsContainer, StorageContainer } from '../contexts';
import SubtableFieldRow from './subtable-field-row';

type Props = {
  condition: PluginCondition;
  index: number;
};

const Component: VFCX<Props> = ({ className, condition, index }) => {
  const { storage, dispatch, removeCondition } = StorageContainer.useContainer();
  const { fields, subtableCodes } = FieldsContainer.useContainer();

  const onChangeTraget = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    dispatch({ type: 'updateCondition', index, name: 'targetSubtableCode', value: event.target.value });
  }, []);

  return (
    <div className={className}>
      <Accordion className='accordion' defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} className='accordion-summary'>
          {condition.targetSubtableCode && (
            <Typography style={{ color: '#3f51b5', margin: '0 16px 0 0' }}>{condition.targetSubtableCode}</Typography>
          )}
          {condition.fields.map((field) => (
            <>
              {field.code && (
                <Chip
                  size='small'
                  color='primary'
                  label={(fields[condition.targetSubtableCode] as any)?.fields[field.code]?.label}
                  deleteIcon={<span>{field.width}</span>}
                  style={{ margin: '0 4px' }}
                />
              )}
            </>
          ))}
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            select
            size='small'
            label='対象のサブテーブル'
            value={condition.targetSubtableCode}
            onChange={onChangeTraget}
            onSelect={(event) => event.stopPropagation()}
            style={{ minWidth: '250px' }}
          >
            {subtableCodes.map((code) => (
              <MenuItem key={code} value={code}>
                {fields[code].label}
              </MenuItem>
            ))}
          </TextField>
          <Divider orientation='vertical' flexItem style={{ margin: '0 16px' }} />
          <SubtableFieldRow index={index} target={condition.targetSubtableCode} />
        </AccordionDetails>
      </Accordion>
      {storage.conditions.length > 1 && (
        <IconButton onClick={() => removeCondition(index)}>
          <DeleteIcon fontSize='small' />
        </IconButton>
      )}
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  align-items: flex-start;

  .accordion {
    flex-grow: 1;
    box-shadow: none;
    border: 1px solid #ddd;
    margin-top: -1px;
  }
  .accordion-summary > div {
    display: flex;
    align-items: center;
  }
`;

export default StyledComponent;
