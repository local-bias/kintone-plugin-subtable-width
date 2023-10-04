import { PluginSidebar } from '@konomi-app/kintone-utility-component';
import React, { FC } from 'react';
import AdditionButton from './condition-addition-button';
import Tabs from './sidebar-tabs';

const Component: FC = () => (
  <PluginSidebar>
    <AdditionButton />
    <Tabs />
  </PluginSidebar>
);

export default Component;