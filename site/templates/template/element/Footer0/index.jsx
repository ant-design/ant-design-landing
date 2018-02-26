import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import './index.less';

class Footer extends React.Component {
  static defaultProps = {
    className: 'footer0',
  };

  render() {
    const props = { ...this.props };
    const dataSource = props.dataSource;
    const names = props.id.split('_');
    const name = `${names[0]}${names[1]}`;
    delete props.dataSource;
    delete props.isMode;
    return (<OverPack
      {...props}
      playScale={0.05}
    >
      <TweenOne
        animation={{ y: '+=30', opacity: 0, type: 'from' }}
        key="footer"
      >
        <span
          dangerouslySetInnerHTML={{ __html: dataSource[`${name}_content`].children }}
          id={`${props.id}-content`}
        />
      </TweenOne>
    </OverPack>);
  }
}

export default Footer;
