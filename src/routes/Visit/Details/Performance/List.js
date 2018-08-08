/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 15:09:59
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-08 11:01:11
 */

import React, { PureComponent } from 'react';
import { Link } from 'dva/router';
import { Table } from 'antd';
import { BaseListComponents } from '../../../Base';
import { toFixed } from '../../../../utils/utils';
import styles from './styles.less';

class List extends PureComponent {
  static renderTimeRecord = (text, type, classname) => {
    return <span className={classname}>{toFixed(text, type)}</span>;
  };

  render() {
    const { loading, dataSource, pagination } = this.props;

    const columns = [
      {
        title: 'URL',
        dataIndex: 'url',
        key: 'url',
        width: 250,
        fixed: 'left',
        render: text => {
          return <Link to={`detail?url=${encodeURIComponent(text)}`}>{text}</Link>;
        },
      },
      {
        title: '耗时',
        children: [
          {
            title: '页面加载',
            dataIndex: 'loadTime',
            key: 'loadTime',
            render: text => List.renderTimeRecord(text, true, styles.mainColor),
          },
          {
            title: '白屏',
            dataIndex: 'whiteTime',
            key: 'whiteTime',
            render: text => List.renderTimeRecord(text, false, styles.mainColor),
          },
          {
            title: '资源加载',
            dataIndex: 'resourceTime',
            key: 'resourceTime',
            render: text => List.renderTimeRecord(text, true),
          },
          {
            title: 'DOM构建',
            dataIndex: 'domTime',
            key: 'domTime',
            render: text => List.renderTimeRecord(text),
          },
          {
            title: '解析DOM',
            dataIndex: 'analysisDomTime',
            key: 'analysisDomTime',
            render: text => List.renderTimeRecord(text, true, styles.mainColor),
          },
          {
            title: 'DNS解析',
            dataIndex: 'dnsTime',
            key: 'dnsTime',
            render: text => List.renderTimeRecord(text),
          },
          {
            title: 'TCP连接',
            dataIndex: 'tcpTime',
            key: 'tcpTime',
            render: text => List.renderTimeRecord(text),
          },
          {
            title: '页面重定向',
            dataIndex: 'redirectTime',
            key: 'redirectTime',
            render: text => List.renderTimeRecord(text),
          },
          {
            title: 'unload',
            dataIndex: 'unloadTime',
            key: 'unloadTime',
            render: text => List.renderTimeRecord(text),
          },
          {
            title: 'request',
            dataIndex: 'requestTime',
            key: 'requestTime',
            render: text => List.renderTimeRecord(text),
          },
          {
            title: 'ready',
            dataIndex: 'readyTime',
            key: 'readyTime',
            render: text => List.renderTimeRecord(text),
          },
        ],
      },
      {
        title: '请求时间',
        dataIndex: 'createTime',
        key: 'createTime',
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
        rowKey={record => `${record.id}${record.url}`}
      />
    );
  }
}

export default BaseListComponents(List);
