import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import { getFormFields, kintoneAPI } from '@konomi-app/kintone-utilities';

const hooks = (initialState = '') => {
  const [fields, setFields] = useState<kintoneAPI.FieldProperties>({});
  const [subtableCodes, setSubtableCodes] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { properties } = await getFormFields({ app: String(kintone.app.getId()) });
      const subtables = Object.keys(properties).filter(
        (key) => properties[key].type === 'SUBTABLE'
      );

      setFields(properties);
      setSubtableCodes(subtables);
    })();
  }, []);

  return { fields, subtableCodes };
};

export default createContainer(hooks);
