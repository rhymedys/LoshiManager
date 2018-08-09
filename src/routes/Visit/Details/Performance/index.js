/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-08 10:37:52
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-09 16:32:49
 */
import React, { PureComponent, Fragment } from 'react';
import { Card, Icon } from 'antd';
import { connect } from 'dva';
import { queryPagesByUrl } from '../../../../services/pages';
import { BaseComponent } from '../../../Base';
import List from './List';
import SimpleInfo from './SimpleInfo';
import EnvironmentInfo from './EnvironmentInfo';

const nullInfo = (
  <div>
    <Icon type="frown" style={{ marginRight: 10 }} />
    暂无信息
  </div>
);

class Index extends PureComponent {
  componentWillMount() {
    Promise.all([
      this.getList(this.props.getRouteQuery(), true),
      this.getSimpleInfo(),
      this.getEnvironmentInfo(),
    ]);
  }

  getList = (apiParams, resetState) => {
    this.props.dispatch({
      type: 'pagnationList/getList',
      apiParams,
      api: queryPagesByUrl,
      resetState,
    });
  };

  getSimpleInfo = async body => {
    this.props.dispatch({
      type: 'performance/fetchSimpleInfo',
      body,
    });
  };

  getEnvironmentInfo = async body => {
    this.props.dispatch({
      type: 'performance/fetchEnvironmentInfo',
      body,
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
      <Fragment>
        <Card
          title="概况"
          loading={this.props.fetchingSimpleInfo}
          style={{ marginBottom: 20 }}
          bordered={false}
        >
          <SimpleInfo simpleInfo={this.props.simpleInfo} nullDiv={nullInfo} />
        </Card>
        <Card
          loading={this.props.fecthingEnvironmentInfo}
          style={{ marginBottom: 20 }}
          bordered={false}
        >
          <EnvironmentInfo environmentInfo={this.props.environmentInfo} nullDiv={nullInfo} />
        </Card>
        <Card title="详情" bordered={false}>
          <List {...listProps} />
        </Card>
      </Fragment>
    );
  }
}

export default connect(({ pagnationList, performance, loading, routing }) => ({
  simpleInfo: performance.simpleInfo,
  environmentInfo: performance.environment,
  pagnationList,
  loading: loading.models.pagnationList,
  $route: routing.location,
  fetchingSimpleInfo: loading.effects['performance/fetchSimpleInfo'],
  fecthingEnvironmentInfo: loading.effects['performance/fetchEnvironmentInfo'],
}))(BaseComponent(Index));
