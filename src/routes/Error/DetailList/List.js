/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 15:09:59
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-15 14:30:13
 */

import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { Link } from 'dva/router';
import { BaseListComponents } from '../../Base';
import styles from './styles.less';

class List extends PureComponent {
  render() {
    const { loading, dataSource, pagination } = this.props;

    const columns = [
      {
        title: '错误请求URL',
        dataIndex: 'resourceUrl',
        key: 'resourceUrl',
        width: 200,
        fixed: 'left',
        render: (text, record) => <Link to={`detail?id=${record.id}`}>{text}</Link>,
      },
      {
        title: '错误信息',
        dataIndex: 'msg',
        key: 'msg',
        className: styles.mainColor,
        width: 500,
      },
      {
        title: '错误类型',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: '所属URL',
        dataIndex: 'pageUrl',
        key: 'pageUrl',
        width: 200,
      },
    ];

    switch (this.props.routeQuery.category) {
      case 'resource':
        columns.push(
          {
            title: '错误资源',
            dataIndex: 'target',
            key: 'target',
          },
          {
            title: '资源类型',
            dataIndex: 'type',
            key: 'type',
          }
        );
        break;
      case 'js':
        columns.push(
          {
            title: '错误行',
            dataIndex: 'line',
            key: 'line',
          },
          {
            title: '错误列',
            dataIndex: 'col',
            key: 'col',
          }
        );
        break;
      case 'ajax':
        columns.push(
          {
            title: '状态码',
            dataIndex: 'status',
            key: 'status',
          },
          {
            title: '类型详情',
            dataIndex: 'text',
            key: 'text',
          }
        );
        break;
      default:
        break;
    }

    columns.push(
      {
        title: '请求方式',
        dataIndex: 'method',
        key: 'method',
      },
      {
        title: '请求参数',
        dataIndex: 'querydata',
        key: 'querydata',
      },
      {
        title: '报错时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (text, record) => <Link to={`detail?id=${record.id}`}>查看详情</Link>,
      }
    );

    return (
      <Table
        showHeader={!!(dataSource && dataSource.length)}
        columns={columns}
        dataSource={dataSource.map((val, i) => Object.assign({ rowId: i }, val))}
        loading={loading}
        onChange={this.props.onTableChange.bind(this)}
        pagination={pagination}
        simple
        scroll={{ x: 2200 }}
        size="small"
        rowKey={record => record.rowId}
      />
    );
  }
}

export default BaseListComponents(List);
