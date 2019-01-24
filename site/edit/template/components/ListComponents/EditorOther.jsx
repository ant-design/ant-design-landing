import React from 'react';
import { Collapse, Col, Radio, Switch, Row, Tooltip, Icon } from 'antd';

import { isImg, deepCopy } from '../../../../utils';
import { setTemplateData } from '../../../../edit-module/actions';

const Panel = Collapse.Panel;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const otherData = [
  {
    name: '侧边按钮点',
    type: 'radio',
    key: 'point',
    children: {
      switch: {
        name: '是否开启侧边小点',
        value: false,
        type: 'switch',
      },
      position: {
        isChild: true,
        name: '位置',
        value: ['left', 'right'],
      },
      stroke: {
        name: '样式',
        value: ['solid', 'point-stroke'],
      },
      type: {
        name: '形状',
        value: ['circ', 'point-rect', 'point-prismatic'],
      },
      size: {
        name: '大小',
        value: [
          'point-large', 'default', 'point-small',
        ],
      },
    },
  },
  {
    name: '全屏滚动',
    type: 'switch',
    key: 'full',
    demo: 'https://os.alipayobjects.com/rmsportal/pwggipnVeoQkgGwmWilN.mp4',
    children: {
      full: {
        name: '开关全屏滚动',
        value: false,
        remark: '此功能需要保存生成预览查看。',
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
    dispatch(setTemplateData(newTemplateData));
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
            <Icon type="question-circle" style={{ marginLeft: 8 }} />
          </Tooltip>
        );
        return [
          <Row gutter={8} key={`${item.name}-1`}>
            <Col>
              {item.name}
              {' '}
              -
              {' '}
              {key}
              {tip}
            </Col>
          </Row>,
          <Row gutter={8} key={`${item.name}-2`}>
            <Col>
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
              <Col>
                <div className="other-demo">
                  {
                    item.demo.match(isImg)
                      ? <img src={item.demo} width="100%" alt="img" draggable="false" />
                      : (
                        <video src={item.demo} width="100%" height="100%" autoPlay loop>
                          <track kind="captions" />
                        </video>
                      )
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
