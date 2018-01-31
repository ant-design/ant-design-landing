import React from 'react';
import QueueAnim from 'rc-queue-anim';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { FormattedMessage } from 'react-intl';

export default function Page2() {
  return (
    <ScrollOverPack className="page-wrapper page2" playScale="0.3">
      <QueueAnim className="page" type="bottom" key="queue">
        <p key="p"><FormattedMessage id="app.home.edit-slogen" /></p>
        <div key="a">
          <a className="button"><FormattedMessage id="app.home.enter-editor" /></a>
        </div>
      </QueueAnim>
    </ScrollOverPack>
  );
}
