import React from 'react';
import { Button, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import './index.less';

function Content(props) {
  const { ...currentProps } = props;
  /* edit-dataSource start */
  const dataId = currentProps['data-id'];
  const dataSource = props.dataSource;
  delete currentProps.dataSource;
  /* edit-dataSource end */
  delete currentProps.isMode;
  return (
    <OverPack
      {...currentProps}
      /* edit-OverPack start */
      {...dataSource.wrapper}
      data-id={`${dataId}-wrapper`}
      data-edit={['OverPack']}
    /* edit-OverPack end */
    >
      <QueueAnim
        type={['bottom', 'top']}
        delay={200}
        key="text"
        /* edit-wrapper start */
        {...dataSource.textWrapper}
        data-id={`${dataId}-textWrapper`}
      /* edit-wrapper end */
      >
        <div
          key="title"
          /* edit-title start */
          {...dataSource.title}
          data-id={`${dataId}-title`}
          data-edit="text,image"
        /* edit-title end */
        >
          {
            /* edit-replace start */
            dataSource.title.children.match(/\.(gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/) ? (
              <img src={dataSource.title.children} width="100%" alt="img" />
            ) :
            /* eidt-replace end */
            React.createElement('span', { dangerouslySetInnerHTML: { __html: dataSource.title.children } })
          }
        </div>
        <p
          key="content"
          /* edit-content start */
          data-id={`${dataId}-content`}
          {...dataSource.content}
          data-edit="text"
        /* edit-content end */
        >
          {React.createElement('span', { dangerouslySetInnerHTML: { __html: dataSource.content.children } })}
        </p>
        <Button
          type="ghost"
          key="button"
          /* edit-button start */
          data-id={`${dataId}-button`}
          {...dataSource.button}
          data-edit="text"
          /* edit-button end */
        >
          {React.createElement('span', { dangerouslySetInnerHTML: { __html: dataSource.button.children } })}
        </Button>
      </QueueAnim>
      <TweenOne
        animation={{
          y: '-=20', yoyo: true, repeat: -1, duration: 1000,
        }}
        className="banner0-icon"
        key="icon"
      >
        <Icon type="down" />
      </TweenOne>
    </OverPack>
  );
}

export default Content;
