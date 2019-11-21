import React from 'react';
import { Row, Col } from 'antd';
import ImageLoadComp from '../Home/component/ImageLoadComp';

import './download.less';

export default function Download({ data }) {
  return (
    <Row gutter={24}>
      {data.map((item) => (
        <Col key={item.title} sm={24} md={12} xxl={8} className="resource-wrapper">
          <a className="resource-cards"
            href={item.url}
            target="_blank"
            onClick={() => {
              if (!location.port && window.gtag) {
                window.gtag('event', `saveSKetch_${item.name}`);
              }
            }}
          >
            <ImageLoadComp className="img-wrapper" src={item.img} />
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
