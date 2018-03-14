import React from 'react';

import NavController from './components/NavController';
import SideMenu from './components/SideMenu';
import Iframe from './components/Iframe';
import EditStageController from './components/EditStageController';
import EditListController from './components/EditListController';
import { format } from './utils';

console.log(format('.banner-anim-elem > .banner1-text-wrapper > .jepkfm9nmxi-editor_css {  text-align: right;}', 'css'));

export default class Layout extends React.PureComponent {
  render() {
    return (
      <div className="edit-wrapper">
        <div className="edit-left-view">
          <NavController />
          <div className="edit-content-wrapper">
            <SideMenu />
            <div className="edit-stage-wrapper">
              <div className="edit-influence" />
              <Iframe className="edit-preview" />
              <EditStageController />
            </div>
          </div>
        </div>
        <div className="edit-right-view" >
          <EditListController />
        </div>
      </div>
    );
  }
}
