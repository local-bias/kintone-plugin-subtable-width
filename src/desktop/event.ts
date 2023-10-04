import { cx, css } from '@emotion/css';

import { restorePluginConfig } from '@/lib/plugin';
import { getMetaSubtableFields_UNSTABLE } from '@konomi-app/kintone-utilities';
import { listener } from '@/lib/listener';

listener.add(['app.record.index.show'], async (event) => {
  const storage = restorePluginConfig();

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
});
