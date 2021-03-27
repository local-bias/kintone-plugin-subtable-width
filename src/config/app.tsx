import React from 'react';
import { SnackbarProvider } from 'notistack';

import { FieldsContainer, StorageContainer } from './contexts';
import { Footer, Form, SocialIcons } from './components';

const Component: React.FC<{ pluginId: string }> = ({ pluginId }) => (
  <>
    <StorageContainer.Provider initialState={pluginId}>
      <FieldsContainer.Provider>
        <Form />
      </FieldsContainer.Provider>
      <SnackbarProvider maxSnack={3}>
        <Footer />
      </SnackbarProvider>
    </StorageContainer.Provider>
    <SocialIcons />
  </>
);

export default Component;
