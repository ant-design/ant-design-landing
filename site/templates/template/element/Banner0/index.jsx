import React from 'react';
import { Button, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
/* replace-start */
import './index.less';
/* replace-end */
function Content(props) {
  const { ...currentProps } = props;/* replace-start */
  const dataId = currentProps['data-id'];
  /* replace-end */
  const { dataSource } = currentProps;
  delete currentProps.dataSource;
  delete currentProps.isMobile;
  return (
    <OverPack
      {...currentProps}
      {...dataSource.wrapper}
      /* replace-start */
      data-id={`${dataId}-wrapper`}
      data-edit={['OverPack']}
    /* replace-end */
    >
      <QueueAnim
        key="text"
        type={['bottom', 'top']}
        delay={200}
        {...dataSource.textWrapper}
        /* replace-start */
        data-id={`${dataId}-textWrapper`}
      /* replace-end */
      >
        <div
          key="title"
          {...dataSource.title}
          /* replace-start */
          data-id={`${dataId}-title`}
          data-edit="text,image"
        /* replace-end */
        >
          {
            /* replace-start */
            dataSource.title.children.match(/\.(gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/) ? (
              <img src={dataSource.title.children} width="100%" alt="img" />
            ) :
              /* replace-end */
              /* replace-start-value = dataSource.title.children */
              React.createElement('span', { dangerouslySetInnerHTML: { __html: dataSource.title.children } })
            /* replace-end-value */
          }
        </div>
        <div
          key="content"
          {...dataSource.content}
          /* replace-start */
          data-id={`${dataId}-content`}
          data-edit="text"
        /* replace-end */
        >
          {/* replace-start-value = dataSource.content.children */
            React.createElement('span', { dangerouslySetInnerHTML: { __html: dataSource.content.children } })
           /* replace-end-value */}
        </div>
        <Button
          type="ghost"
          key="button"
          {...dataSource.button}
          /* replace-start */
          data-id={`${dataId}-button`}
          data-edit="text"
        /* replace-end */
        >
          {/* replace-start-value = dataSource.button.children */
            React.createElement('span', { dangerouslySetInnerHTML: { __html: dataSource.button.children } })
           /* replace-end-value */}
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
