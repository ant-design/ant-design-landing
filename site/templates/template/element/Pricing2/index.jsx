import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Table } from 'antd';
/* replace-start-value = import { getChildrenToRender, isImg } from './utils'; */
import { getChildrenToRender, isImg } from '../../utils';
/* replace-end-value */
/* replace-start */
import './index.less';
/* replace-end */

class Pricing2 extends React.PureComponent {
  getColumns = (columns) => {
    return columns.map((item) => {
      const { childAll, ...$item } = item;
      return {
        ...$item,
        title: (
          <div
            {...childAll}
            /* replace-start */
            data-edit="childAll"
          /* replace-end */
          >
            {childAll.children.map(getChildrenToRender)}
          </div>
        ),
      };
    });
  }

  getDataSource = (dataSource, columns) => (
    dataSource.map((item, i) => {
      const obj = { key: i.toString() };
      item.children.forEach(($item, ii) => {
        if (columns[ii]) {
          obj[columns[ii].key] = (
            <div
              {...$item}
              /* replace-start */
              data-edit="text,image"
            /* replace-end */
            >
              {
                typeof $item.children === 'string' && $item.children.match(isImg) ? (
                  <img src={$item.children} alt="img" />
                ) : /* replace-start-value = $item.children */React.createElement('span', { dangerouslySetInnerHTML: { __html: $item.children } })
                /* replace-end-value */
              }
            </div>
          );
        }
      });
      return obj;
    })
  );

  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    const { Table: table, wrapper, page, titleWrapper } = dataSource;
    const { columns, ...$table } = table;
    const tableProps = {
      ...$table,
      columns: this.getColumns(columns.children),
      dataSource: this.getDataSource(table.dataSource.children, columns.children),
    };
    return (
      <div
        {...props}
        {...wrapper}
      >
        <div {...page}>
          <div
            key="title"
            {...titleWrapper}
            /* replace-start */
            data-edit="titleWrapper"
          /* replace-end */
          >
            {
              titleWrapper.children.map(getChildrenToRender)
            }
          </div>
          <OverPack {...dataSource.OverPack}>
            <QueueAnim
              type="bottom"
              leaveReverse
              ease={['easeOutQuad', 'easeInOutQuad']}
              key="content"
              /* replace-start */
              data-edit="Row"
            /* replace-end */
            >
              <Table key="table" {...tableProps} pagination={false} bordered />
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}

export default Pricing2;
