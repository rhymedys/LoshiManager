/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 11:46:28
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-14 13:44:54
 */
import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'dva/router';
import { connect } from 'dva';
import { BaseComponent } from '../../Base';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { getRoutes } from '../../../utils/utils';

const tabList = [
  {
    key: 'performance',
    tab: '性能详情',
  },
  {
    key: 'ajax',
    tab: 'ajax调用',
  },
  {
    key: 'page',
    tab: '页面加载',
  },
  {
    key: 'resource',
    tab: '资源加载',
  },
];

class Index extends PureComponent {
  handleTabChange = key => {
    const { match } = this.props;
    this.props.pushRouter({
      query: {
        url: this.props.getRouteQuery().url,
      },
      pathname: `${match.url}/${key}`,
    });
  };

  render() {
    const { match, routerData, location } = this.props;
    const routes = getRoutes(match.path, routerData);
    return (
      <PageHeaderLayout
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
        onTabChange={this.handleTabChange}
      >
        <Switch>
          {routes.map(item => (
            <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
          ))}

          <Redirect
            exact
            from={match.path}
            to={`${match.url}/${tabList[0].key}${location.search}`}
          />
        </Switch>
      </PageHeaderLayout>
    );
  }
}

export default connect(({ pagnationList, loading, routing }) => ({
  pagnationList,
  loading: loading.models.pagnationList,
  $route: routing.location,
}))(BaseComponent(Index));
