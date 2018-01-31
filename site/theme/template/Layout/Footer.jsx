import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Row, Col, Button } from 'antd';
import * as utils from '../utils';

class Footer extends React.Component {
  handleLangChange = () => {
    const { pathname } = this.props.location;
    const currentProtocol = `${window.location.protocol}//`;
    const currentHref = window.location.href.substr(currentProtocol.length);

    if (utils.isLocalStorageNameSupported()) {
      localStorage.setItem('locale', utils.isZhCN(pathname) ? 'en-US' : 'zh-CN');
    }

    window.location.href = currentProtocol + currentHref.replace(
      window.location.pathname,
      utils.getLocalizedPathname(pathname, !utils.isZhCN(pathname)),
    );
  }

  render() {
    const { pathname } = this.props.location;
    const isZhCN = utils.isZhCN(pathname);
    return (
      <footer id="footer" className="dark">
        <div className="footer-wrap">
          <Row>
            <Col lg={6} sm={24} xs={24}>
              <div className="footer-center">
                <h2>Landings</h2>
                <div>
                  <a target="_blank " href="https://github.com/ant-design/landings">
                    Landings GitHub
                  </a>
                </div>
              </div>
            </Col>
            <Col lg={6} sm={24} xs={24}>
              <div className="footer-center">
                <h2><FormattedMessage id="app.footer.links" /></h2>
                <div>
                  <a target="_blank " href="http://ant.design">
                    Ant Design
                  </a>
                </div>
                <div>
                  <a target="_blank " href="https://github.com/ant-design/ant-design-pro">
                    Ant Design Pro GitHub
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
              </div>
            </Col>
            <Col lg={6} sm={24} xs={24}>
              <div className="footer-center">
                <h2><FormattedMessage id="app.footer.community" /></h2>
                <div>
                  <a target="_blank" rel="noopener" href="https://github.com/ant-design/landings/issues">
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
            <Col lg={6} sm={24} xs={24}>
              <div className="footer-center">
                <h2>
                  <FormattedMessage id="app.footer.more-product" />
                </h2>
                <div>
                  <a target="_blank" rel="noopener" href="https://antv.alipay.com/">AntV</a>
                  <span> - </span>
                  <FormattedMessage id="app.footer.data-vis" />
                </div>
                <div>
                  <a target="_blank" rel="noopener" href="https://eggjs.org/">Egg</a>
                  <span> - </span>
                  <FormattedMessage id="app.footer.eggjs" />
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Row className="bottom-bar">
          <Col lg={6} sm={24}>
            <div className="translate-button">
              <Button ghost size="small" onClick={this.handleLangChange}>
                <FormattedMessage id="app.footer.lang" />
              </Button>
            </div>
          </Col>
          <Col lg={18} sm={24}>
            <span
              style={{ lineHeight: '16px', paddingRight: 12, marginRight: 11, borderRight: '1px solid rgba(255, 255, 255, 0.55)' }}
            >
              <a
                href="https://docs.alipay.com/policies/privacy/antfin"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FormattedMessage id="app.footer.privacy" />
              </a>
            </span>
            <span style={{ marginRight: 24 }}>
              <a
                href="https://render.alipay.com/p/f/fd-izto3cem/index.html"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FormattedMessage id="app.footer.commitment" />
              </a>
            </span>
            <span style={{ marginRight: 12 }}>ICP 证浙 B2-2-100257</span>
            <span style={{ marginRight: 12 }}>Copyright © <FormattedMessage id="app.footer.company" /></span>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default injectIntl(Footer);
