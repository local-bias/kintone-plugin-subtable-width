import React from 'react';
import { SnackbarProvider } from 'notistack';

import { FieldsContainer, StorageContainer } from './contexts';
import { Footer, Form, SocialIcons } from './components';

const Component: React.FC<{ pluginId: string }> = ({ pluginId }) => (
  <>
    <FieldsContainer.Provider>
      <StorageContainer.Provider initialState={pluginId}>
        <SnackbarProvider maxSnack={3}>
          <Form />
          <Footer />
        </SnackbarProvider>
      </StorageContainer.Provider>
    </FieldsContainer.Provider>
    <SocialIcons />
  </>
);

export default Component;
