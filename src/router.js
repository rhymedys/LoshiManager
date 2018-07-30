import React from 'react';
import { routerRedux, Switch,Route } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import styles from './index.less';
import {appConfig} from './config'

const { ConnectedRouter } = routerRedux; // 状态管理器连接
const { AuthorizedRoute } = Authorized;

// 全局loading动画
dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const BasicLayout = routerData['/'].component;
  const UserLayout = routerData[`${appConfig.appRootPath}user`].component;

  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path={`${appConfig.appRootPath}user`} component={UserLayout} />
          <AuthorizedRoute
            path={appConfig.appRootPath}
            render={props => <BasicLayout {...props} />}
            authority={['admin', 'user']}
            redirectPath="/user/login"
          />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
