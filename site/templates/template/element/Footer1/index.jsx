import React from 'react';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import './index.less';

class Footer extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
  };

  static defaultProps = {
    className: 'footer1',
  };

  getLiChildren = dataSource =>
    Object.keys(dataSource).filter(key => key.match('block'))
      .sort((a, b) => {
        const aa = Number(a.replace(/[^0-9]/ig, ''));
        const bb = Number(b.replace(/[^0-9]/ig, ''));
        return aa - bb;
      })
      .map((key, i) => {
        const data = dataSource[key];
        const links = data.children.contentLink.split(/\n/).filter(item => item);
        const content = data.children.content.split(/\n/).filter(item => item)
          .map((item, ii) => {
            const cItem = item.trim();
            const isImg = cItem.match(/\.(jpg|png|svg|bmp|jpeg)$/i);
            return (<li className={isImg ? 'icon' : ''} key={ii}>
              <a href={links[ii]} target="_blank">
                {isImg ? <img src={cItem} width="100%" /> : cItem}
              </a>
            </li>);
          });
        return (<li className={data.className} key={i} id={`${this.props.id}-${key.split('_')[1]}`}>
          <h2>{data.children.title}</h2>
          <ul>
            {content}
          </ul>
        </li>);
      });

  render() {
    const props = { ...this.props };
    const dataSource = props.dataSource;
    const names = props.id.split('_');
    const name = `${names[0]}${names[1]}`;
    const isMode = props.isMode;
    delete props.dataSource;
    delete props.isMode;
    const logoContent = dataSource[`${name}_logo`].children;
    const liChildrenToRender = this.getLiChildren(dataSource);
    return (<OverPack
      {...props}
      playScale={isMode ? 0.5 : 0.2}
    >
      <QueueAnim type="bottom" component="ul" key="ul" leaveReverse id={`${props.id}-ul`}>
        <li key="logo" id={`${props.id}-logo`}>
          <p className="logo">
            <img src={logoContent.img} width="100%" />
          </p>
          <p>{logoContent.content}</p>
        </li>
        {liChildrenToRender}
      </QueueAnim>
      <TweenOne
        animation={{ y: '+=30', opacity: 0, type: 'from' }}
        key="copyright"
        className="copyright"
        id={`${props.id}-content`}
      >
        <span
          dangerouslySetInnerHTML={{ __html: dataSource[`${name}_content`].children }}
        />
      </TweenOne>
    </OverPack>);
  }
}

export default Footer;
