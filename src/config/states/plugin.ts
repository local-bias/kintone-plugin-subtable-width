import { getConditionField, getUpdatedStorage, restorePluginConfig } from '@/lib/plugin';
import { kintoneAPI } from '@konomi-app/kintone-utilities';
import { atom, selector } from 'recoil';
import { subtableFieldsState } from './kintone';

const PREFIX = 'plugin';

export const storageState = atom<kintone.plugin.LatestStorage>({
  key: `${PREFIX}storageState`,
  default: restorePluginConfig(),
});

export const loadingState = atom<boolean>({
  key: `${PREFIX}loadingState`,
  default: false,
});

export const tabIndexState = atom<number>({
  key: `${PREFIX}tabIndexState`,
  default: 0,
});

export const conditionsState = selector<kintone.plugin.Condition[]>({
  key: `${PREFIX}conditionsState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage?.conditions ?? [];
  },
});

export const targetSubtableCodeState = selector<string>({
  key: `${PREFIX}targetSubtableCodeState`,
  get: ({ get }) => {
    const conditionIndex = get(tabIndexState);
    return getConditionField(get(storageState), {
      conditionIndex,
      key: 'targetSubtableCode',
      defaultValue: '',
    });
  },
  set: ({ get, set }, newValue) => {
    const conditionIndex = get(tabIndexState);
    set(storageState, (current) =>
      getUpdatedStorage(current, {
        conditionIndex,
        key: 'targetSubtableCode',
        value: newValue as string,
      })
    );
  },
});

export const fieldsState = selector<{ code: string; label: string; width: number }[]>({
  key: `${PREFIX}fieldsState`,
  get: ({ get }) => {
    const conditionIndex = get(tabIndexState);
    return getConditionField(get(storageState), {
      conditionIndex,
      key: 'fields',
      defaultValue: [{ code: '', label: '', width: 200 }],
    });
  },
  set: ({ get, set }, newValue) => {
    const conditionIndex = get(tabIndexState);
    set(storageState, (current) =>
      getUpdatedStorage(current, {
        conditionIndex,
        key: 'fields',
        value: newValue as { code: string; label: string; width: number }[],
      })
    );
  },
});

export const targetSubtablePropertyState = selector<kintoneAPI.property.Subtable | null>({
  key: `${PREFIX}targetSubtablePropertyState`,
  get: ({ get }) => {
    const targetSubtableCode = get(targetSubtableCodeState);
    const sutableFields = get(subtableFieldsState);
    return sutableFields.find((field) => field.code === targetSubtableCode) ?? null;
  },
});
