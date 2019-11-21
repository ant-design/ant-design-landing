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
      const { childWrapper, ...$item } = item;
      return {
        align: 'center',
        ...$item,
        title: (
          <div
            {...childWrapper}
            /* replace-start */
            data-edit="childWrapper"
          /* replace-end */
          >
            {childWrapper.children.map(getChildrenToRender)}
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

  getMobileChild = (table) => {
    const { columns, dataSource, ...tableProps } = table;
    const names = columns.children.filter((item) => item.key.indexOf('name') >= 0);
    const newColumns = columns.children.filter((item) => item.key.indexOf('name') === -1);
    return newColumns.map((item, i) => {
      const items = [].concat(names[0], item).filter((c) => c);
      if (items.length > 1) {
        items[0].colSpan = 0;
        items[1].colSpan = 2;
      }
      const dataSources = dataSource.children.map(($item) => {
        const child = $item.children.filter((c) => c.name.indexOf('name') === -1);
        const n = $item.children.filter((c) => c.name.indexOf('name') >= 0);
        return {
          ...$item,
          children: [].concat(n[0], child[i]).filter((c) => c),
        };
      });
      const props = {
        ...tableProps,
        columns: this.getColumns(items),
        dataSource: this.getDataSource(dataSources, items),
      };
      return (
        <Table key={i.toString()} {...props} pagination={false} bordered />
      );
    });
  }

  render() {
    const { dataSource, isMobile, ...props } = this.props;
    const { Table: table, wrapper, page, titleWrapper } = dataSource;
    const { columns, dataSource: tableData, ...$table } = table;
    const tableProps = {
      ...$table,
      columns: this.getColumns(columns.children),
      dataSource: this.getDataSource(tableData.children, columns.children),
    };
    const childrenToRender = isMobile ? this.getMobileChild(table) : <Table key="table" {...tableProps} pagination={false} bordered />;
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
            >
              {childrenToRender}
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}

export default Pricing2;
