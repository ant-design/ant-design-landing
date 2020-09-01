import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Row, Col } from 'antd';
import * as utils from '../utils';

class Footer extends React.PureComponent {
  render() {
    const { pathname } = this.props.location;
    const isZhCN = utils.isZhCN(pathname);
    return (
      <footer id="footer" className="dark">
        <div className="footer-wrap">
          <Row>
            <Col md={6} sm={24} xs={24}>
              <div className="footer-center">
                <h2>Ant Design Landing</h2>
                <div>
                  <a target="_blank " href="https://github.com/ant-design/ant-design-landing">
                    <FormattedMessage id="app.footer.repo" />
                  </a>
                </div>
                <div>
                  <a target="_blank " href="https://github.com/ant-motion">
                    <FormattedMessage id="app.footer.template" />
                  </a>
                </div>
                <div>
                  <a href="http://ant-design-landing.gitee.io/" target="_blank ">
                    <FormattedMessage id="app.footer.chinamirror" />
                  </a>
                </div>
              </div>
            </Col>
            <Col md={6} sm={24} xs={24}>
              <div className="footer-center">
                <h2><FormattedMessage id="app.footer.links" /></h2>
                <div>
                  <a target="_blank " href="http://ant.design">
                    Ant Design
                  </a>
                </div>
                <div>
                  <a target="_blank " href="https://pro.ant.design/">
                    Ant Design Pro
                  </a>
                </div>
                <div>
                  <a href="http://mobile.ant.design">Ant Design Mobile</a>
                </div>
                <div>
                  <a target="_blank" rel="noopener" href="http://motion.ant.design">Ant Motion</a>
                  <span> - </span>
                  <FormattedMessage id="app.footer.motion" />
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="http://kitchen.alipay.com">Kitchen</a>
                  <span> - </span>
                  <FormattedMessage id="app.footer.kitchen" />
                </div>
                <div>
                  <a href="http://scaffold.ant.design">Scaffolds</a>
                  <span> - </span>
                  <FormattedMessage id="app.footer.scaffolds" />
                </div>
                <div>
                  <a target="_blank" rel="noopener" href="http://library.ant.design/">Axure Library</a>
                  <span> - </span>
                  <FormattedMessage id="app.footer.antd-library" />
                </div>
                <div>
                  <a target="_blank" rel="noopener" href="http://ux.ant.design">Ant UX</a>
                  <span> - </span>
                  <FormattedMessage id="app.footer.antux" />
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="http://umijs.org/">Umi</a>
                  <span> - </span>
                  <FormattedMessage id="app.footer.umi" />
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="http://d.umijs.org/">Dumi</a>
                  <span> - </span>
                  <FormattedMessage id="app.footer.dumi" />
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="https://github.com/dvajs/dva">dva</a>
                  <span> - </span>
                  <FormattedMessage id="app.footer.dva" />
                </div>
              </div>
            </Col>
            <Col md={6} sm={24} xs={24}>
              <div className="footer-center">
                <h2><FormattedMessage id="app.footer.community" /></h2>
                <div>
                  <a target="_blank" rel="noopener" href="https://github.com/ant-design/ant-design-landing/issues">
                    <FormattedMessage id="app.footer.issues" />
                  </a>
                </div>
                <div>
                  <a
                    target="_blank"
                    rel="noopener"
                    href={`http://ant.design/docs/spec/work-with-us${isZhCN ? '-cn' : ''}`}
                  >
                    <FormattedMessage id="app.footer.work-with-us" />
                  </a>
                </div>
              </div>
            </Col>
            <Col md={6} sm={24} xs={24}>
              <div className="footer-center">
                <h2>
                  <img
                    className="title-icon"
                    src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg"
                    alt="AFX Cloud"
                  />
                  <FormattedMessage id="app.footer.more-product" />
                </h2>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="https://yuque.com/">
                    <FormattedMessage id="app.footer.yuque" />
                  </a>
                  <span> - </span>
                  <FormattedMessage id="app.footer.yuque.slogan" />
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="https://yunfengdie.com/">
                    <FormattedMessage id="app.footer.fengdie" />
                  </a>
                  <span> - </span>
                  <FormattedMessage id="app.footer.fengdie.slogan" />
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="https://antv.alipay.com/">
                    AntV
                  </a>
                  <span> - </span>
                  <FormattedMessage id="app.footer.data-vis" />
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="https://eggjs.org/">
                    Egg
                  </a>
                  <span> - </span>
                  <FormattedMessage id="app.footer.eggjs" />
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="http://xcloud.alipay.com/">
                    <FormattedMessage id="app.footer.xcloud" />
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="bottom-bar">
          Made with
          {' '}
          <span className="heart">❤</span>
          {' '}
          by
          <a target="_blank" rel="noopener noreferrer" href="https://yuque.com/afx/blog">
            AFX
          </a>
        </div>
      </footer>
    );
  }
}

export default injectIntl(Footer);
