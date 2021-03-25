import React from 'react';
import { render } from 'react-dom';

import App from './app';

const main = async (pluginId: string) => render(<App pluginId={pluginId} />, document.getElementById('settings'));

export default main;
