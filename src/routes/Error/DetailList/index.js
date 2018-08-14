/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 11:46:28
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-14 17:55:29
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import { BaseComponent } from '../../Base';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { getList, getListCount } from '../../../services/error';
import List from './List';
import Header from './Header';
import { getSeletedAppId } from '../../../utils/selectedAppId';

class Index extends PureComponent {
  componentWillMount() {
    this.init(this.props.getRouteQuery());
  }

  onPageChange = val => {
    const newQueryParams = Object.assign({}, this.props.getRouteQuery(), {
      page: val.current,
      pageSize: val.pageSize,
    });
    this.props.replaceRouter(newQueryParams);
    this.getList(newQueryParams);
  };

  getList = apiParams => {
    this.props.dispatchGetList({
      apiParams: Object.assign(apiParams, { appId: getSeletedAppId() }),
      api: getList,
    });
  };

  handleSearchReset = () => {
    const newQueryParams = Object.assign({}, this.props.getRouteQuery(), {
      category: '',
      startDate: '',
      endDate: '',
    });
    this.props.replaceRouter(newQueryParams);
    this.getList(newQueryParams);
  };

  handleSearch = value => {
    const res = Object.assign({}, value);
    const { rangeDate } = res;
    if (rangeDate && rangeDate[0] && rangeDate[1]) {
      res.startDate = rangeDate[0].format('YYYY-MM-DD');
      res.endDate = rangeDate[1].format('YYYY-MM-DD');
    }

    delete res.rangeDate;

    const newQueryParams = Object.assign({}, res, {
      page: 1,
      pageSize: this.props.getRouteQuery().pageSize,
    });

    this.props.replaceRouter(newQueryParams);
    this.getList(newQueryParams);
  };

  init = params => {
    const apiParams = Object.assign(params, { appId: getSeletedAppId() });
    this.props.dispatchFetchInit({
      totalResConfig: {
        apiParams,
        api: getListCount,
      },
      lisResConfig: {
        apiParams,
        api: getList,
      },
    });
  };

  render() {
    const listProps = {
      loading: this.props.loading,
      ...this.props.pagnationList,
      location: this.props.$route,
      onPageChange: this.onPageChange,
    };

    const headerProps = {
      routeQuery: this.props.getRouteQuery(),
      handleSearchReset: this.handleSearchReset,
      handleSearch: this.handleSearch,
    };

    return (
      <PageHeaderLayout showBreadcrumb>
        <Card>
          <Header {...headerProps} />
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
