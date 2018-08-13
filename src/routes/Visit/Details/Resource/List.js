/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 15:09:59
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-13 13:56:02
 */

import React, { PureComponent } from 'react';
import { Link } from 'dva/router';
import { Table } from 'antd';
import { BaseListComponents } from '../../../Base';
import { toFixed, toSize } from '../../../../utils/utils';
import style from './styles.less';

class List extends PureComponent {
  render() {
    const { loading, dataSource, pagination } = this.props;

    const columns = [
      {
        title: 'URL',
        dataIndex: 'name',
        key: 'name',
        width: 250,
        fixed: 'left',
        render: text => {
          return <Link to={`detail?url=${encodeURIComponent(text)}`}>{text}</Link>;
        },
      },
      {
        title: '资源加载耗时',
        dataIndex: 'duration',
        key: 'duration',
        render: text => {
          return toFixed(text, true);
        },
        className: style.mainColor,
      },
      {
        title: '资源返回大小',
        dataIndex: 'decodedBodySize',
        key: 'decodedBodySize',
        render: text => {
          return toSize(text);
        },
      },
      {
        title: '请求URL',
        dataIndex: 'callUrl',
        key: 'callUrl',
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
        dataSource={dataSource.map((val, i) =>
          Object.assign({}, val, { id: `${i}${new Date().getTime()}` })
        )}
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
