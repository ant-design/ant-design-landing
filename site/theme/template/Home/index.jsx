import React from 'react';
import { injectIntl } from 'react-intl';
import DocumentTitle from 'react-document-title';

import Banner from './Banner';
import Page1 from './Page1';
import Page2 from './Page2';

function Home(props) {
  return (
    <DocumentTitle title={`Ant Design Landings - ${props.intl.formatMessage({ id: 'app.home.slogan' })}`}>
      <div className="home-wrapper">
        <Banner isMobile={props.isMobile} />
        <Page1 isMobile={props.isMobile} />
        <Page2 isMobile={props.isMobile} />
      </div>
    </DocumentTitle>
  );
}

export default injectIntl(Home);
