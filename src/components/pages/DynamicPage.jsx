import React from 'react';
import { Header } from 'semantic-ui-react';

import Layout from '../shared/Layout';

const DynamicPage = () => (
  <Layout>
    <Header as="h2">Dynamic Page</Header>
    <p>This page was loaded asynchronously!!!</p>
  </Layout>
);

export default DynamicPage;
