import { useCallback, Reducer, useReducer } from 'react';
import { createContainer } from 'unstated-next';

import { restoreStorage, storeStorage, getNewCondition, getNewFieldCondition } from '@/common/plugin';

type State = {
  storage: PluginStorage;
};

type Action =
  | {
      type: 'save';
    }
  | {
      type: 'update';
      storage: PluginStorage;
    }
  | {
      type: 'addCondition';
    }
  | {
      type: 'removeCondition';
      index: number;
    }
  | {
      type: 'updateCondition';
      index: number;
      name: keyof PluginCondition;
      value: any;
    }
  | {
      type: 'updateWidth';
      index: number;
      fieldIndex: number;
      value: number | number[];
    }
  | {
      type: 'updateCode';
      index: number;
      fieldIndex: number;
      value: string;
    }
  | {
      type: 'addField';
      index: number;
    }
  | {
      type: 'removeField';
      index: number;
      fieldIndex: number;
    };

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'save': {
      storeStorage(state.storage, () => true);
      return state;
    }
    case 'update': {
      return { ...state, storage: { ...action.storage } };
    }
    case 'addCondition': {
      return {
        ...state,
        storage: {
          ...state.storage,
          conditions: [...state.storage.conditions, getNewCondition()],
        },
      };
    }
    case 'removeCondition': {
      const newCondition = state.storage.conditions;
      newCondition.splice(action.index, 1);
      return { ...state, storage: { ...state.storage, conditions: newCondition } };
    }
    case 'updateCondition': {
      const newCondition = [...state.storage.conditions];
      newCondition[action.index] = { ...newCondition[action.index], [action.name]: action.value };

      return { ...state, storage: { ...state.storage, conditions: newCondition } };
    }
    case 'updateWidth': {
      const { value, index } = action;
      const newCondition = [...state.storage.conditions];
      const newFields = newCondition[index].fields;
      newFields[action.fieldIndex] = {
        ...newFields[action.fieldIndex],
        width: typeof value === 'number' ? value : value[0],
      };
      newCondition[index] = { ...newCondition[index], fields: newFields };

      return { ...state, storage: { ...state.storage, conditions: newCondition } };
    }
    case 'updateCode': {
      const newCondition = [...state.storage.conditions];
      const newFields = newCondition[action.index].fields;
      newFields[action.fieldIndex] = { ...newFields[action.fieldIndex], code: action.value };
      newCondition[action.index] = { ...newCondition[action.index], fields: newFields };

      return { ...state, storage: { ...state.storage, conditions: newCondition } };
    }
    case 'addField': {
      const newCondition = [...state.storage.conditions];
      const newFields = [...newCondition[action.index].fields, getNewFieldCondition()];
      newCondition[action.index] = { ...newCondition[action.index], fields: newFields };

      return { ...state, storage: { ...state.storage, conditions: newCondition } };
    }
    case 'removeField': {
      const newCondition = [...state.storage.conditions];
      const newFields = [...newCondition[action.index].fields];
      newFields.splice(action.fieldIndex, 1);
      newCondition[action.index] = { ...newCondition[action.index], fields: newFields };

      return { ...state, storage: { ...state.storage, conditions: newCondition } };
    }
  }
};

/**
 *
 * @param initialState
 * @returns 使用するReactのフック
 */
const hooks = (initialState: string = '') => {
  const [{ storage }, dispatch] = useReducer(reducer, { storage: restoreStorage(initialState) });

  const save = useCallback(() => dispatch({ type: 'save' }), []);
  const addCondition = useCallback(() => dispatch({ type: 'addCondition' }), []);
  const removeCondition = useCallback((index: number) => dispatch({ type: 'removeCondition', index }), []);
  const updateWidth = useCallback(
    (index: number, fieldIndex: number, value: number | number[]) =>
      dispatch({ type: 'updateWidth', index, fieldIndex, value }),
    []
  );
  const updateCode = useCallback(
    (index: number, fieldIndex: number, value: string) => dispatch({ type: 'updateCode', index, fieldIndex, value }),
    []
  );
  const addField = useCallback((index: number) => dispatch({ type: 'addField', index }), []);
  const removeField = useCallback(
    (index: number, fieldIndex: number) => dispatch({ type: 'removeField', index, fieldIndex }),
    []
  );

  return { storage, dispatch, save, addCondition, removeCondition, updateWidth, updateCode, addField, removeField };
};

export default createContainer(hooks);
