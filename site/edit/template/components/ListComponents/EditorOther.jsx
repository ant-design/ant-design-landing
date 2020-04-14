import React from 'react';
import { Collapse, Col, Radio, Switch, Row, Tooltip } from 'antd';
import {
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { deepCopy } from '../../../../utils';
import * as actions from '../../../../shared/redux/actions';

const Panel = Collapse.Panel;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const otherData = [
  {
    name: <FormattedMessage id="app.other.point" />,
    type: 'radio',
    key: 'point',
    children: {
      switch: {
        name: <FormattedMessage id="app.other.switch" />,
        value: false,
        type: 'switch',
      },
      position: {
        isChild: true,
        name: <FormattedMessage id="app.other.point.position" />,
        value: ['left', 'right'],
      },
      stroke: {
        name: <FormattedMessage id="app.other.point.style" />,
        value: ['solid', 'point-stroke'],
      },
      type: {
        name: <FormattedMessage id="app.other.point.type" />,
        value: ['circ', 'point-rect', 'point-prismatic'],
      },
      size: {
        name: <FormattedMessage id="app.other.point.size" />,
        value: [
          'point-large', 'default', 'point-small',
        ],
      },
    },
  },
  {
    name: <FormattedMessage id="app.other.full" />,
    type: 'switch',
    key: 'full',
    demo: 'https://os.alipayobjects.com/rmsportal/pwggipnVeoQkgGwmWilN.mp4',
    children: {
      full: {
        name: <FormattedMessage id="app.other.switch" />,
        value: false,
        remark: <FormattedMessage id="app.other.full.remark" />,
      },
    },
  },
];

class EditorOther extends React.PureComponent {
  onChange = (type, key, value) => {
    const { templateData, dispatch } = this.props;
    const newTemplateData = deepCopy(templateData);
    const { other } = newTemplateData.data;
    let data = other[type] || {};
    switch (type) {
      case 'point':
      {
        switch (value) {
          case 'left':
            data[key] = 'point-left';
            break;
          case true:
            break;
          case false:
            data = value;
            break;
          default:
            if (value.indexOf('point') >= 0) {
              data[key] = value;
            } else {
              delete data[key];
            }
            break;
        }
        break;
      }
      case 'full':
        data = value;
        break;
      default:
        break;
    }
    if (!data) {
      delete newTemplateData.data.other[type];
    } else {
      newTemplateData.data.other[type] = data;
    }
    dispatch(actions.setTemplateData(newTemplateData));
  }

  getChildrenToRender = () => {
    const { templateData } = this.props;
    const { other } = templateData.data;
    const getDataChildren = (children, type, name) => {
      return Object.keys(children).map((key) => {
        const item = children[key];
        let compChild;
        const t = item.type || type;

        switch (t) {
          case 'radio':
          {
            let value = (other[name] && other[name][key])
                || item.value.filter((c) => {
                  return key === 'position' ? c === 'right' : c.indexOf('point') === -1;
                })[0];
            value = value === 'point-left' ? 'left' : value;
            compChild = (
              <RadioGroup key={key}
                size="small"
                value={value}
                onChange={(e) => {
                  this.onChange(name, key, e.target.value);
                }}
              >
                {item.value.map((c) => {
                  return (
                    <RadioButton key={c} value={c}>
                      <div className="point-radio-wrapper">
                        <span className={!item.isChild ? `point ${c}` : ''}>
                          {item.isChild ? c : ''}
                        </span>
                      </div>
                    </RadioButton>
                  );
                })}
              </RadioGroup>
            );
            break;
          }
          case 'switch':
            compChild = (
              <Switch
                size="small"
                onChange={(b) => {
                  this.onChange(name, key, b);
                }}
                checked={!!other[name]}
              />
            );
            break;
          default:
            break;
        }
        const tip = item.remark && (
          <Tooltip
            placement="topRight"
            arrowPointAtCenter
            title={(
              <span>
                {item.remark}
              </span>
            )}
          >
            <QuestionCircleOutlined style={{ marginLeft: 8 }} />
          </Tooltip>
        );
        return [
          <Row gutter={8} key={`${item.name}-1`}>
            <Col span={24}>
              {item.name}
              {' '}
              {tip}
            </Col>
          </Row>,
          <Row gutter={8} key={`${item.name}-2`}>
            <Col span={24}>
              {compChild}
            </Col>
          </Row>,
        ];
      });
    };
    return otherData.map((item, i) => {
      return (
        <Panel header={item.name} key={i.toString()}>
          {getDataChildren(item.children, item.type, item.key)}
          {item.demo && (
            <Row gutter={8} key={`${item.name}-3`}>
              <Col span={24}>
                <div className="other-demo">
                  {
                    item.demo.match(/\.(mp4|webm|ogg)$/)
                      ? (
                        <video src={item.demo} width="100%" height="100%" autoPlay loop>
                          <track kind="captions" />
                        </video>
                      )
                      : <img src={item.demo} width="100%" alt="img" draggable="false" />
                  }
                </div>
              </Col>
            </Row>
          )}
        </Panel>
      );
    });
  }

  render() {
    const children = this.getChildrenToRender();
    return (
      <Collapse bordered={false} defaultActiveKey={['0', '1']} className="other">
        {children}
      </Collapse>
    );
  }
}

export default EditorOther;
