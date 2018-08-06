/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-03 11:32:57
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-06 13:52:17
 */

import React from 'react';
import { Link } from 'dva/router';
import { Table, Popconfirm } from 'antd';
import { BaseListComponents } from '../../Base';

const operationStyles = {
  marginRight: 10,
};

class List extends React.Component {
  static render2DomByStatus(num) {
    return <span>{num === 1 ? '是' : '否'}</span>;
  }

  render() {
    const { loading, dataSource, pagination } = this.props;

    const columns = [
      {
        title: '应用名称',
        dataIndex: 'systemName',
        key: 'systemName',
        fixed: 'left',
        width: 150,
      },
      {
        title: '应用链接',
        dataIndex: 'systemDomain',
        key: 'systemDomain',
        fixed: 'left',
        width: 200,
      },
      {
        title: 'appId',
        dataIndex: 'appId',
        key: 'appId',
        fixed: 'left',
        width: 200,
      },
      {
        title: '阀值（单位:s）',
        children: [
          {
            title: '页面加载',
            dataIndex: 'slowPageTime',
            key: 'slowPageTime',
          },
          {
            title: 'JS资源',
            dataIndex: 'slowJsTime',
            key: 'slowJsTime',
          },
          {
            title: 'CSS资源',
            dataIndex: 'slowCssTime',
            key: 'slowCssTime',
          },
          {
            title: 'IMG资源',
            dataIndex: 'slowImgTime',
            key: 'slowImgTime',
          },
          {
            title: 'AJAX加载',
            dataIndex: 'slowAajxTime',
            key: 'slowAajxTime',
          },
        ],
      },
      {
        title: '统计类别',
        children: [
          {
            title: '项目',
            dataIndex: 'isUse',
            key: 'isUse',
            render: List.render2DomByStatus,
          },
          {
            title: '页面',
            dataIndex: 'isStatisiPages',
            key: 'isStatisiPages',
            render: List.render2DomByStatus,
          },
          {
            title: 'AJAX',
            dataIndex: 'isStatisiAjax',
            key: 'isStatisiAjax',
            render: List.render2DomByStatus,
          },
          {
            title: '页面资源',
            dataIndex: 'isStatisiResource',
            key: 'isStatisiResource',
            render: List.render2DomByStatus,
          },
          {
            title: '用户系统信息',
            dataIndex: 'isStatisiSystem',
            key: 'isStatisiSystem',
            render: List.render2DomByStatus,
          },
          {
            title: '错误信息',
            dataIndex: 'isStatisiError',
            key: 'isStatisiError',
            render: List.render2DomByStatus,
          },
        ],
      },

      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        fixed: 'right',
        width: 150,
        render: (text, record) => {
          return [
            <Link key="change" to="change" style={operationStyles}>
              修改
            </Link>,
            <Popconfirm
              key="delete"
              title="是否确认删除该应用?"
              onConfirm={this.props.deleteApplication.bind(null, record)}
            >
              <a style={operationStyles}>删除</a>
            </Popconfirm>,
            <a key="details" style={operationStyles}>
              详情
            </a>,
          ];
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
        scroll={{ x: 1500 }}
        size="small"
        rowKey={record => record.appId}
      />
    );
  }
}

export default BaseListComponents(List);
