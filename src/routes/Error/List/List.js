/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 15:09:59
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-14 15:29:29
 */

import React, { PureComponent } from 'react';
import { Link } from 'dva/router';
import { Table } from 'antd';
import { BaseListComponents } from '../../Base';
import styles from './styles.less';

class List extends PureComponent {
  render() {
    const { loading, dataSource, pagination } = this.props;

    const columns = [
      {
        title: '错误资源',
        dataIndex: 'resourceUrl',
        key: 'resourceUrl',
        width: 250,
        fixed: 'left',
        render: text => {
          return <Link to={`detail?url=${encodeURIComponent(text)}`}>{text}</Link>;
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
        title: '错误信息',
        dataIndex: 'msg',
        key: 'msg',
        className: styles.mainColor,
      },
      {
        title: '操作',
        key: 'operation',
        width: 100,
        fixed: 'right',
        render: () => {
          return <Link to="detail">查看详情</Link>;
        },
      },
    ];

    return (
      <Table
        showHeader={!!(dataSource && dataSource.length)}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={this.props.onTableChange.bind(this)}
        pagination={pagination}
        simple
        bordered
        size="middle"
        rowKey={record => `${record.resourceUrl}${record.msg}${record.category}`}
      />
    );
  }
}

export default BaseListComponents(List);
