import { KintoneRestAPIClient } from '@kintone/rest-api-client';

export const getAppFields = async (app: string) => {
  const client = new KintoneRestAPIClient();

  const { properties } = await client.app.getFormFields({ app });

  return properties;
};
