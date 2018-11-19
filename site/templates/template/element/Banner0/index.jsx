import React from 'react';
import { Button, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
/* replace-start */
import './index.less';
/* replace-end */
class Banner extends React.PureComponent {
  render() {
    const { ...currentProps } = this.props;
    const { dataSource } = currentProps;
    delete currentProps.dataSource;
    delete currentProps.isMobile;
    return (
      <div
        {...currentProps}
        {...dataSource.wrapper}
      >
        <QueueAnim
          key="QueueAnim"
          type={['bottom', 'top']}
          delay={200}
          {...dataSource.textWrapper}
        >
          <div
            key="title"
            {...dataSource.title}
            /* replace-start */
            data-edit="text,image"
            /* replace-end */
          >
            {
            typeof dataSource.title.children === 'string' && dataSource.title.children.match(/\.(svg|gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/) ? (
              <img src={dataSource.title.children} width="100%" alt="img" />
            ) : /* replace-start-value = dataSource.title.children */React.createElement('span', { dangerouslySetInnerHTML: { __html: dataSource.title.children } })
            /* replace-end-value */
          }
          </div>
          <div
            key="content"
            {...dataSource.content}
          >
            {/* replace-start-value = dataSource.content.children */
            React.createElement('span', { dangerouslySetInnerHTML: { __html: dataSource.content.children } })
           /* replace-end-value */}
          </div>
          <Button
            ghost
            key="button"
            {...dataSource.button}
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
      </div>
    );
  }
}
export default Banner;
