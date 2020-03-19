import React from 'react';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import { Row, Col, Pagination } from 'antd';
import { EyeOutlined, EditOutlined, DownloadOutlined } from '@ant-design/icons';
import QueueAnim from 'rc-queue-anim';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { FormattedMessage } from 'react-intl';
import ImageLoadComp from './ImageLoadComp';
import { getURLData, setURLData } from '../../utils';
import { getNewHref } from '../../../../utils';
import { scrollTo } from '../utils';
import data from './data.json';

class Templates extends React.PureComponent {
  constructor(props) {
    super(props);
    const paging = parseFloat(getURLData('paging')) || 1;
    this.state = {
      paging,
    };
  }

  componentDidMount() {
    this.pageDom = document.getElementById('page2');
  }

  onPagingChange = (v) => {
    this.setState({
      paging: v,
    }, () => {
      scrollTo(this.pageDom.offsetTop);
      setURLData('paging', v);
    });
  }

  render() {
    const { isMobile } = this.props;
    const { paging } = this.state;
    const num = isMobile ? 5 : 9;
    const prePaging = (paging - 1) * num;
    const children = data.map((item, ii) => {
      if (ii < paging * num && ii >= prePaging) {
        const i = ii - prePaging;
        const delay = isMobile ? i * 50 : (Math.floor(i / 3) * 50) + ((i % 3) * 50);
        const animation = { scale: 0.95, opacity: 0, type: 'from', delay, duration: 300 };
        const typeIsEdit = item.type === 'edit';
        return (
          <TweenOne
            component={Col}
            animation={animation}
            key={ii.toString()}
            componentProps={{ md: 8, xs: 24 }}
          >
            <div className="item-wrapper">
              <div className="img-wrapper">
                <a href={typeIsEdit ? getNewHref('7113', item.preview, false, '', false) : item.preview} target="_blank">
                  <ImageLoadComp src={item.image} />
                </a>
              </div>
              <p>
                {item.name}
              </p>
              <Row className="handle">
                <Col span={12}>
                  <a href={typeIsEdit ? getNewHref('7113', item.preview, false, '', false) : item.preview} target="_blank">
                    <EyeOutlined />
                    <FormattedMessage id="app.home.preview" />
                  </a>
                </Col>
                <Col span={12}>
                  <a href={typeIsEdit ? getNewHref('7112', `cloneId=${item.templateId}`) : item.git} target="_blank">
                    {item.type === 'edit' ? <EditOutlined /> : <DownloadOutlined />}
                    <FormattedMessage id={`app.home.${item.type}`} />
                  </a>
                </Col>
              </Row>
            </div>
          </TweenOne>
        );
      }
      return null;
    });
    const lineNum = Math.ceil((data.length - prePaging) / 3);
    return (
      <ScrollOverPack playScale="0.3">
        <QueueAnim key="qeu" type="bottom" className="page2-content-wrapper">
          <div key="a">
            <TweenOneGroup
              enter={{ opacity: 0, type: 'from', ease: 'easeInOutQuad' }}
              leave={{ opacity: 0, ease: 'easeInQuad' }}
              className="tween-group"
              style={{ height: (lineNum > 3 ? 3 : lineNum) * 458 }}
            >
              <Row key={paging.toString()} gutter={48} className="page1-content">
                {children}
              </Row>
            </TweenOneGroup>
            {data.length > num && (
              <Pagination
                current={paging}
                pageSize={num}
                total={data.length}
                className="pagination"
                onChange={this.onPagingChange}
              />
            )}
          </div>
        </QueueAnim>
      </ScrollOverPack>
    );
  }
}

export default Templates;
