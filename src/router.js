import React from 'react';
import { routerRedux, Switch, Route } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import styles from './index.less';
import { appConfig } from './config';

const { ConnectedRouter } = routerRedux; // 状态管理器连接
const { AuthorizedRoute } = Authorized;

// 全局loading动画
dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
  const userLayoutPath = `${appConfig.appRootPath}user`;
  const systemLayoutPath = `${appConfig.appRootPath}system`;
  const loginPath = `${appConfig.appRootPath}user/login`;
  const routerData = getRouterData(app);
  const BasicLayout = routerData['/'].component;
  const UserLayout = routerData[userLayoutPath].component;
  const SystemLayout = routerData[systemLayoutPath].component;
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path={userLayoutPath} component={UserLayout} />
          <AuthorizedRoute
            path={systemLayoutPath}
            render={props => <SystemLayout {...props} />}
            authority={['admin', 'user']}
            redirectPath={loginPath}
          />
          <AuthorizedRoute
            path={appConfig.appRootPath}
            render={props => <BasicLayout {...props} />}
            authority={['admin', 'user']}
            redirectPath={loginPath}
          />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
