/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-08 10:37:52
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-14 13:48:01
 */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import { BaseComponent } from '../../../Base';
import List from './List';
import { queryListByCallUrl, queryListCountByCallUrl } from '../../../../services/slowResource';

class Index extends PureComponent {
  componentWillMount() {
    this.init({
      ...this.props.getRouteQuery(),
      callUrl: this.props.getRouteQuery().url,
    });
  }

  componentWillUnmount() {
    this.props.dispatchPagnationList2DefaultState();
  }

  getList = apiParams => {
    this.props.dispatchGetList({
      apiParams,
      api: queryListByCallUrl,
    });
  };

  init = apiParams => {
    this.props.dispatchFetchInit({
      totalResConfig: {
        apiParams,
        api: queryListCountByCallUrl,
      },
      lisResConfig: {
        apiParams,
        api: queryListByCallUrl,
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
        this.getList(
          Object.assign(
            {
              callUrl: this.props.getRouteQuery().url,
            },
            newQueryParams
          )
        );
      },
    };

    return (
      <Fragment>
        <Card>
          <List {...listProps} />
        </Card>
      </Fragment>
    );
  }
}

export default connect(({ pagnationList, loading, routing }) => ({
  pagnationList,
  loading: loading.models.pagnationList,
  $route: routing.location,
}))(BaseComponent(Index));
