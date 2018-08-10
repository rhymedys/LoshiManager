/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 15:09:59
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-10 16:04:35
 */

import React, { PureComponent } from 'react';
import { Link } from 'dva/router';
import { Table } from 'antd';
import { BaseListComponents } from '../../../Base';
import { toFixed, toSize } from '../../../../utils/utils';

class List extends PureComponent {
  render() {
    const { loading, dataSource, pagination } = this.props;

    const columns = [
      {
        title: 'Api',
        dataIndex: 'name',
        key: 'name',
        render: text => {
          return <Link to={`test?url=${encodeURIComponent(text)}`}>{text}</Link>;
        },
      },
      {
        title: '耗时',
        dataIndex: 'duration',
        key: 'duration',
        render(text) {
          return toFixed(text, true);
        },
      },
      {
        title: '返回资源大小',
        dataIndex: 'decodedBodySize',
        key: 'decodedBodySize',
        render(text) {
          return toSize(text);
        },
      },
      {
        title: '请求Url',
        dataIndex: 'callUrl',
        key: 'callUrl',
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
        rowKey={record => record.name}
      />
    );
  }
}

export default BaseListComponents(List);
