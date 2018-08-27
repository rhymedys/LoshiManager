/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 11:46:28
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-27 14:22:51
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import { BaseComponent } from '../../Base';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { getItemList, getItemListCount } from '../../../services/error';
import { formatMomentObj2YYYYMMDDHHmmss } from '../../../utils/utils';
import List from './List';
import Header from './Header';

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
      apiParams,
      api: getItemList,
    });
  };

  handleSearchReset = () => {
    const newQueryParams = Object.assign({}, this.props.getRouteQuery(), {
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
      res.startDate = formatMomentObj2YYYYMMDDHHmmss(rangeDate[0]);
      res.endDate = formatMomentObj2YYYYMMDDHHmmss(rangeDate[1]);
    }

    delete res.rangeDate;

    const newQueryParams = Object.assign({}, this.props.getRouteQuery(), res, {
      page: 1,
      pageSize: this.props.getRouteQuery().pageSize,
    });

    this.props.replaceRouter(newQueryParams);
    this.getList(newQueryParams);
  };

  init = apiParams => {
    this.props.dispatchFetchInit({
      totalResConfig: {
        apiParams,
        api: getItemListCount,
      },
      lisResConfig: {
        apiParams,
        api: getItemList,
      },
    });
  };

  render() {
    const routeQuery = this.props.getRouteQuery();
    const listProps = {
      loading: this.props.loading,
      ...this.props.pagnationList,
      routeQuery,
      onPageChange: this.onPageChange,
      location: this.props.$route,
    };

    const headerProps = {
      routeQuery,
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
