import React from 'react';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import { Row, Col, Spin, Pagination } from 'antd';
import QueueAnim from 'rc-queue-anim';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { fetchListData, postType } from '../../module/actions';
import { getURLData, setURLData } from '../../utils';

class Templates extends React.PureComponent {
  constructor(props) {
    super(props);
    const paging = parseFloat(getURLData('paging')) || 1;
    this.state = {
      paging,
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchListData());
  }
  onPagingChange = (v) => {
    this.setState({
      paging: v,
    }, () => {
      setURLData('paging', v);
    });
  }
  render() {
    const { listData, isMobile } = this.props;
    const { type, data } = listData;
    const { paging } = this.state;
    const prePaging = (paging - 1) * 9;
    const children = data.map((item, ii) => {
      if (ii < paging * 9 && ii >= prePaging) {
        const i = ii - prePaging;
        const delay = isMobile ? i * 50 : (Math.floor(i / 3) * 50) + ((i % 3) * 50);
        const animation = { y: 30, opacity: 0, type: 'from', delay };
        return (
          <TweenOne
            component={Col}
            animation={animation}
            key={ii.toString()}
            componentProps={{ md: 8, xs: 24 }}
          >
            <div className="item-wrapper">
              <div className="img-wrapper">
                <a href={item.preview} target="_blank">
                  <img alt="img" src={item.image} />
                </a>
              </div>
              <p>{item.name}</p>
              <a href={item.git} target="_blank" className="download">
                <FormattedMessage id="app.home.download" />
              </a>
            </div>
          </TweenOne>);
      }
      return null;
    });
    const lineNum = Math.ceil((data.length - prePaging) / 3);
    return (
      <Spin spinning={type === postType.POST_DEFAULT}>
        <ScrollOverPack playScale="0.3" id="page1">
          <QueueAnim key="qeu" type="bottom" className="page1-content-wrapper">
            <div key="a">
              <TweenOneGroup
                enter={{ opacity: 0, type: 'from', ease: 'easeInOutQuad' }}
                leave={{ opacity: 0, y: 30, ease: 'easeInQuad' }}
                className="tween-group"
                style={{ height: (lineNum > 3 ? 3 : lineNum) * 458 }}
              >
                <Row key={paging.toString()} gutter={48} className="page1-content">
                  {children}
                </Row>
              </TweenOneGroup>
              {data.length > 9 && <Pagination
                current={paging}
                pageSize={9}
                total={data.length}
                className="pagination"
                onChange={this.onPagingChange}
              />}
            </div>
          </QueueAnim>
        </ScrollOverPack>

      </Spin>
    );
  }
}
const getListData = (state) => {
  const listData = state.listData;
  if (listData.type === postType.POST_SUCCESS) {
    const data = listData.data.map(item => ({
      id: item.id,
      ...item.attributes,
    }));
    return {
      listData: {
        type: listData.type,
        data,
      },
    };
  }
  return state;
};
export default connect(getListData)(Templates);
