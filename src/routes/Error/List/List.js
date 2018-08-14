/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 15:09:59
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-14 17:52:44
 */

import React, { PureComponent } from 'react';
import { Link } from 'dva/router';
import { Table } from 'antd';
import { BaseListComponents } from '../../Base';
import styles from './styles.less';

const ToDetailLink = ({ url, text }) => (
  <Link to={`detailList?url=${encodeURIComponent(url)}`}>{text}</Link>
);

class List extends PureComponent {
  render() {
    const { loading, dataSource, pagination } = this.props;

    const columns = [
      {
        title: '错误请求URL',
        dataIndex: 'resourceUrl',
        key: 'resourceUrl',
        render: text => {
          return <ToDetailLink url={text} text={text} />;
        },
      },
      {
        title: '错误类型',
        dataIndex: 'category',
        key: 'category',
        width: 100,
      },
      {
        title: '错误数量',
        dataIndex: 'count',
        key: 'count',
        width: 80,
        className: styles.mainColor,
      },
      {
        title: '操作',
        key: 'operation',
        width: 100,
        fixed: 'right',
        render: (text, record) => {
          return <ToDetailLink url={record.resourceUrl} text="查看详情" />;
        },
      },
    ];

    return (
      <Table
        showHeader={!!(dataSource && dataSource.length)}
        columns={columns}
        dataSource={dataSource.map((val, i) => Object.assign({ rowId: i }, val))}
        loading={loading}
        onChange={this.props.onTableChange.bind(this)}
        pagination={pagination}
        simple
        bordered
        size="middle"
        rowKey={record => record.rowId}
      />
    );
  }
}

export default BaseListComponents(List);
