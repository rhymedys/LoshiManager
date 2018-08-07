/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 11:46:28
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-07 16:16:35
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import { BaseComponent } from '../../Base';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { queryAllPagesUrlByAppId } from '../../../services/pages';
import List from './List';
import { getSeletedAppId } from '../../../utils/selectedAppId';

class Index extends PureComponent {
  componentWillMount() {
    this.getList(this.props.getRouteQuery(), true);
  }

  getList = (apiParams, resetState) => {
    this.props.dispatch({
      type: 'pagnationList/getList',
      apiParams: Object.assign(apiParams, { appId: getSeletedAppId() }),
      api: queryAllPagesUrlByAppId,
      resetState,
    });
  };

  render() {
    const listProps = {
      loading: this.props.loading,
      ...this.props.pagnationList,
      location: this.props.$route,
      onPageChange: val => {
        const newQueryParams = Object.assign({}, this.props.getRouteQuery(), {
          page: val.current,
          pageSize: val.pageSize,
        });
        this.props.replaceRouter(newQueryParams);
        this.getList(newQueryParams);
      },
    };
    return (
      <PageHeaderLayout showBreadcrumb>
        <Card>
          <List {...listProps} />
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default connect(({ pagnationList, loading, routing }) => ({
  pagnationList,
  loading: loading.models.pagnationList,
  $route: routing.location,
}))(BaseComponent(Index));
