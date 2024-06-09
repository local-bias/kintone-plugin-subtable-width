import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';

import { getAppFields } from '../actions';
import { kintoneAPI } from '@konomi-app/kintone-utilities';

const hooks = (initialState = '') => {
  const [fields, setFields] = useState<kintoneAPI.FieldProperties>({});
  const [subtableCodes, setSubtableCodes] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const appFields = await getAppFields(String(kintone.app.getId()));
      const subtables = Object.keys(appFields).filter((key) => appFields[key].type === 'SUBTABLE');

      setFields(appFields);
      setSubtableCodes(subtables);
    })();
  }, []);

  return { fields, subtableCodes };
};

export default createContainer(hooks);
