/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 15:09:59
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-14 09:16:39
 */

import React, { PureComponent } from 'react';
import { Link } from 'dva/router';
import { Table } from 'antd';
import { BaseListComponents } from '../../../Base';
import { toFixed } from '../../../../utils/utils';
import style from './styles.less';

class List extends PureComponent {
  render() {
    const { loading, dataSource, pagination } = this.props;
    const columns = [
      {
        title: 'URL',
        dataIndex: 'url',
        key: 'url',
        render: text => {
          return <Link to={`test?url=${encodeURIComponent(text)}`}>{text}</Link>;
        },
      },
      {
        title: '页面总耗时',
        dataIndex: 'loadTime',
        key: 'loadTime',
        render(text, record) {
          return toFixed(record.loadTime + record.resourceTime, true);
        },
        className: style.mainColor,
      },
      {
        title: '页面加载时间',
        dataIndex: 'loadTime',
        key: 'loadTime',
        render(text) {
          return toFixed(text, true);
        },
      },
      {
        title: '白屏时间',
        dataIndex: 'whiteTime',
        key: 'whiteTime',
        render(text) {
          return toFixed(text);
        },
      },
      {
        title: '资源加载耗时',
        dataIndex: 'resourceTime',
        key: 'resourceTime',
        render(text) {
          return toFixed(text, true);
        },
        className: style.blueColor,
      },
      {
        title: 'DOM构建时间',
        dataIndex: 'domTime',
        key: 'domTime',
        render(text) {
          return toFixed(text, true);
        },
      },
      {
        title: '解析DOM耗时',
        dataIndex: 'analysisDomTime',
        key: 'analysisDomTime',
        render(text) {
          return toFixed(text, true);
        },
      },
      {
        title: '页面准备时间',
        dataIndex: 'readyTime',
        key: 'readyTime',
        render(text) {
          return toFixed(text);
        },
      },
      {
        title: '创建时间',
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
        size="small"
        rowKey={record => record.id}
      />
    );
  }
}

export default BaseListComponents(List);
