/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-03 11:32:57
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-03 12:33:54
 */


import React from 'react';
import { Table } from 'antd';
import { Link } from 'dva/router';
import {generatePathName} from '@/utils/router'
import queryString from 'qs'
import {BaseListComponents} from '../../Base'

class List extends React.Component {




  render() {
    const { loading, dataSource, pagination} = this.props;
    const columns =[
      {
        title: '应用名称',
        dataIndex: 'systemName',
        key: 'systemName',
        fixed:'left',
        width:200,
      },
      {
        title: '应用链接',
        dataIndex: 'systemDomain',
        key: 'systemDomain',
        fixed:'left',
        width:200,
      },
      {
        title: 'appId',
        dataIndex: 'appId',
        key: 'appId',
        fixed:'left',
        width:200,
      },
      {
        title: '页面加载阀值',
        dataIndex: 'slowPageTime',
        key: 'slowPageTime',
      },
      {
        title: 'JS资源阀值',
        dataIndex: 'slowJsTime',
        key: 'slowJsTime',
      },
      {
        title: 'CSS资源阀值',
        dataIndex: 'slowCssTime',
        key: 'slowCssTime',

      },
      {
        title: 'IMG资源阀值',
        dataIndex: 'slowImgTime',
        key: 'slowImgTime',

      },
      {
        title: 'AJAX加载阀值',
        dataIndex: 'slowAajxTime',
        key: 'slowAajxTime',

      },
      {
        title: '是否统计项目',
        dataIndex: 'isUse',
        key: 'isUse',

      },
      {
        title: '是否统计页面',
        dataIndex: 'isStatisiPages',
        key: 'isStatisiPages',

      },
      {
        title: '是否统计AJAX',
        dataIndex: 'isStatisiAjax',
        key: 'isStatisiAjax',

      },
      {
        title: '是否统计页面资源',
        dataIndex: 'isStatisiResource',
        key: 'isStatisiResource',

      },
      {
        title: '是否统计用户系统信息',
        dataIndex: 'isStatisiSystem',
        key: 'isStatisiSystem',

      },
      {
        title: '是否统计错误信息',
        dataIndex: 'isStatisiError',
        key: 'isStatisiError',

      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        fixed:'right',
        width:100,
      },
    ]

    return (
      <Table
        showHeader={dataSource && dataSource.length}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={this.props.onTableChange.bind(this)}
        pagination={pagination}
        scroll={{x:2000}}
        simple
        size='middle'
        rowKey={record => record.appId}
      />
    );
  }

}

export default BaseListComponents(List) ;
