import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
/* replace-start */
import './index.less';
/* replace-end */

class Footer extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    return (
      <div {...props} {...dataSource.wrapper}>
        <OverPack
          {...dataSource.OverPack}
        >
          <TweenOne
            animation={{ y: '+=30', opacity: 0, type: 'from' }}
            key="footer"
            {...dataSource.copyright}
          >
            {
              /* replace-start-value = dataSource.copyright.children */
              React.createElement('span', { dangerouslySetInnerHTML: { __html: dataSource.copyright.children } })
              /* replace-end-value */
            }
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}

export default Footer;
