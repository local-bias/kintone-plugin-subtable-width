import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import { Properties } from '@kintone/rest-api-client/lib/client/types/app/form';

import { getAppFields } from '../actions';

const hooks = (initialState = '') => {
  const [fields, setFields] = useState<Properties>({});
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
