import React from 'react';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Tabs } from 'antd';
import '../../../static/content.less';
import './index.less';

const TabPane = Tabs.TabPane;

class Content extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    dataSource: PropTypes.object,
    id: PropTypes.string,
  };

  static defaultProps = {
    className: 'content6',
    dataSource: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      show: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    const dataSource = nextProps.dataSource;
    const names = nextProps.id.split('_');
    const name = `${names[0]}${names[1]}`;
    const func = dataSource[`${name}_tabs`].func || {};
    this.setState({
      show: (func.page - 1) || 0,
    });
  }

  onChange = (key) => {
    this.setState({ show: parseFloat(key) });
  }

  getBlockChildren = (name, item, i) => {
    const tag = item[`${name}_tagBlock${i}`];
    const img = item[`${name}_imgBlock${i}`];
    const text = item[`${name}_textBlock${i}`];
    return (
      <TabPane
        key={i}
        tab={(<span
          className={`${this.props.className}-tag`}
          id={`${this.props.id}-tagBlock${i}`}
        >
          <i><img src={tag.children.icon} width="100%" /></i>
          {tag.children.tag}
        </span>)}
      >
        <TweenOne.TweenOneGroup
          enter={{
            y: 30, delay: 300, opacity: 0, type: 'from', ease: 'easeOutQuad',
          }}
          leave={null}
          component=""
        >
          {this.state.show === i && (
            <div key="content">
              <div
                className={`${this.props.className}-img`}
                id={`${this.props.id}-imgBlock${i}`}
              >
                <img src={img.children} width="100%" />
              </div>
              <div
                className={`${this.props.className}-text`}
                id={`${this.props.id}-textBlock${i}`}
                dangerouslySetInnerHTML={{ __html: text.children }}
              />
            </div>)}
        </TweenOne.TweenOneGroup>
      </TabPane>
    );
  };

  render() {
    const props = { ...this.props };
    const dataSource = this.props.dataSource;
    const names = props.id.split('_');
    const name = `${names[0]}${names[1]}`;
    delete props.dataSource;
    delete props.isMode;
    const childrenData = [];
    Object.keys(dataSource).filter(key => key.match('Block')).forEach((key) => {
      const keys = key.split('Block');
      const i = keys[1];
      childrenData[i] = childrenData[i] || {};
      const t = childrenData[i];
      t[key] = dataSource[key];
    });
    const tabsChildren = childrenData.map((item, i) => this.getBlockChildren(name, item, i));
    return (
      <div
        {...props}
        className={`content-template-wrapper ${props.className}-wrapper`}
      >
        <OverPack
          className={`content-template ${props.className}`}
          location={props.id}
        >
          <TweenOne
            animation={{ y: '+=30', opacity: 0, type: 'from' }}
            component="h1"
            key="h1"
            reverseDelay={200}
            id={`${props.id}-title`}
          >
            {dataSource[`${name}_title`].children}
          </TweenOne>
          <TweenOne
            animation={{
              y: '+=30', opacity: 0, type: 'from', delay: 100,
            }}
            component="p"
            key="p"
            reverseDelay={100}
            id={`${props.id}-content`}
          >
            {dataSource[`${name}_content`].children}
          </TweenOne>
          <TweenOne.TweenOneGroup
            key="tabs"
            enter={{
              y: 30, opacity: 0, delay: 200, type: 'from',
            }}
            leave={{ y: 30, opacity: 0 }}
            className={`${props.className}-tabs`}
            id={`${props.id}-tabs`}
          >
            <Tabs key="tabs" onChange={this.onChange} activeKey={`${this.state.show}`}>
              {tabsChildren}
            </Tabs>
          </TweenOne.TweenOneGroup>
        </OverPack>
      </div>
    );
  }
}


export default Content;
