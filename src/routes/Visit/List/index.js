/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 11:46:28
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-10 16:39:49
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import { BaseComponent } from '../../Base';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { queryAllPagesUrlByAppId, queryAllPagesUrlCountByAppId } from '../../../services/pages';
import List from './List';
import { getSeletedAppId } from '../../../utils/selectedAppId';

class Index extends PureComponent {
  componentWillMount() {
    this.init(this.props.getRouteQuery());
  }

  getList = apiParams => {
    this.props.dispatchGetList({
      apiParams: Object.assign(apiParams, { appId: getSeletedAppId() }),
      api: queryAllPagesUrlByAppId,
    });
  };

  init = params => {
    const apiParams = Object.assign(params, { appId: getSeletedAppId() });
    this.props.dispatchFetchInit({
      totalResConfig: {
        apiParams,
        api: queryAllPagesUrlCountByAppId,
      },
      lisResConfig: {
        apiParams,
        api: queryAllPagesUrlByAppId,
      },
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
