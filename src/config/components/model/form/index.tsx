import React, { FC } from 'react';

import FieldsForm from './form-fields';
import DeleteButton from './condition-delete-button';
import {
  PluginFormSection,
  PluginFormTitle,
  PluginFormDescription,
} from '@konomi-app/kintone-utility-component';
import FormText from '@/lib/components/form-text';
import TargetSubtableForm from './form-target-subtable';

const Component: FC = () => {
  return (
    <div className='p-4'>
      <PluginFormSection>
        <PluginFormTitle>対象となるサブテーブル</PluginFormTitle>
        <PluginFormDescription last>
          一覧で幅を調整するサブテーブルを選択してください。
        </PluginFormDescription>
        <TargetSubtableForm />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>対象フィールド</PluginFormTitle>
        <PluginFormDescription last>
          この設定はサンプルです。このアプリの設定情報から、フィールド一覧を取得して表示しています。
        </PluginFormDescription>
        <FieldsForm />
      </PluginFormSection>
      <DeleteButton />
    </div>
  );
};

export default Component;
