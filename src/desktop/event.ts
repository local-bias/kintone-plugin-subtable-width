import { cx, css } from '@emotion/css';

import { restoreStorage } from '@/common/plugin';
import { getMetaSubtableFields_UNSTABLE } from '@konomi-app/kintone-utilities';

const events: EventType[] = ['app.record.index.show'];

const action: PluginAction = async (event, pluginId) => {
  const storage = restoreStorage(pluginId);

  const csss = [];

  for (const { targetSubtableCode, fields } of storage.conditions) {
    const subTableFields = getMetaSubtableFields_UNSTABLE(targetSubtableCode);

    if (!subTableFields) {
      continue;
    }

    for (const field of fields) {
      for (const subTableField of subTableFields) {
        if (subTableField.var !== field.code) {
          continue;
        }

        if (!field.width) {
          csss.push(css`
            .label-${subTableField.id}, .value-${subTableField.id} {
              display: none;
            }
          `);
        } else {
          csss.push(css`
            .label-${subTableField.id} {
              width: ${field.width}px;
            }
          `);
        }
      }
    }
  }

  document.body.classList.add(cx(...csss));
  return event;
};

export default { events, action };
