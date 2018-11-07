import React from 'react';
import { Row, Col } from 'antd';

import './download.less';

export default function Download({ data }) {
  return (
    <Row gutter={24}>
      {data.map(item => (
        <Col sm={24} md={12} xxl={8} className="resource-wrapper">
          <a className="resource-cards"
            href={item.url}
            target="_blank"
            onClick={() => {
              if (!location.port && window.gtag) {
                window.gtag('event', `saveSKetch_${item.name}`);
              }
            }}
          >
            <div className="img-wrapper">
              <img src={item.img} width="100%" alt="img" />
            </div>
            <div className="text-wrapper">
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </div>
          </a>
        </Col>
      ))}
    </Row>
  );
}
