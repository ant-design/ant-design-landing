import React from 'react';
import { Icon, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import SwitchSlideView from './StateComponents/SwitchSlideView';
import iframeManager from '../../../shared/iframe';

function getFuncCompChild(comp, dataId) {
  const compArray = comp.split('=');
  const name = compArray[0];
  const data = JSON.parse(compArray[1] || '{}');
  switch (name) {
    case 'banner-switch':
    case 'tabs-switch':
    case 'carousel-switch':
      return (
        <SwitchSlideView
          data={data}
          name={name.split('-')[0]}
          dataId={dataId}
        />
      );
    default:
      return null;
  }
}

/**
 * id: `${templateId}_${#}`, e.g. Nav0_0, Nav0_1
 */
export default function EditStageOverlayElement({
  id,
  idx,
  siblingsCount,
  onClickToolbarItem,
}) {
  const [templateId] = id.split('_');
  const iframe = iframeManager.get();
  const ele = React.useMemo(() => iframe.document.getElementById(id), [id]);
  const eleComp = ele.getAttribute('data-comp');
  const eleStyle = window.getComputedStyle(ele);

  return (
    <div
      key={id}
      id={id}
      data-key={templateId}
      style={{
        width: '100%',
        height: eleStyle.height,
        position: 'absolute', // 设置 margin 后定位失效，用 absolute
        top: ele.offsetTop,
        zIndex: eleStyle.zIndex,
      }}
      className="overlay-elem"
    >
      <div className="drag-hints">
        <Icon type="bars" />
        {' '}
        <FormattedMessage id="app.state.drag" />
      </div>
      <div className="func-wrapper">
        <Button
          type="primary"
          disabled={idx === 0}
          key="up"
          onClick={(e) => { onClickToolbarItem('up', id, e); }}
        >
          <Icon type="up" />
        </Button>
        <Button
          type="primary"
          disabled={idx === siblingsCount - 1}
          key="down"
          onClick={(e) => { onClickToolbarItem('down', id, e); }}
        >
          <Icon type="down" />
        </Button>
        <Button
          type="primary"
          disabled={siblingsCount === 1}
          key="delete"
          onClick={(e) => { onClickToolbarItem('delete', id, e); }}
        >
          <Icon type="delete" />
        </Button>
      </div>
      {eleComp && getFuncCompChild(eleComp, id)}
    </div>
  );
}
