import React from 'react';

import { Row, Col } from 'antd';

import './cases.less';

export default class Demo extends React.PureComponent {
  render() {
    return (
      <Row gutter={24}>
        {this.props.data.map((item) => (
          <Col xl={12} sm={24} xs={24} key={item.title}>
            <a href={item.url} target="_black" className="cases-content-wrapper">
              <div className="img-wrapper"><img src={item.img} width="100%" alt="img" /></div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            </a>
          </Col>
        ))}
      </Row>
    );
  }
}
